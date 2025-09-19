import { svgPathProperties } from 'svg-path-properties';
import { ViewBox, Letra, Animal } from '../types';

function verificarTrazadoConPath(
  strokes: any[],
  pathD: string,
  umbral = 20,
  porcentaje = 0.7,
  escalaX = 1,
  escalaY = 1,
  offsetX = 0,
  offsetY = 0,
  pasoContorno = 1 // por defecto más preciso
): string {
  const properties = new svgPathProperties(pathD);
  const totalLength = properties.getTotalLength();
  const puntosTrazados = strokes
    .flatMap((stroke) => stroke.points)
    .filter(p => p && typeof p.x === 'number' && typeof p.y === 'number')
    .map(p => ({
      x: p.x * escalaX + offsetX,
      y: p.y * escalaY + offsetY
    }));

  let puntosSobreContorno = 0;
  puntosTrazados.forEach((pTrazado) => {
    let minDist = Infinity;
    for (let l = 0; l < totalLength; l += pasoContorno) {
      const pContorno = properties.getPointAtLength(l);
      const dist = Math.sqrt((pContorno.x - pTrazado.x) ** 2 + (pContorno.y - pTrazado.y) ** 2);
      if (dist < minDist) minDist = dist;
    }
    if (minDist < umbral) puntosSobreContorno++;
  });

  if (puntosSobreContorno >= puntosTrazados.length * porcentaje) {
    return '¡Correcto!';
  }
  return 'Intenta de nuevo';
}

function calcularParametrosVerificacion(
  viewBox: ViewBox | undefined,
  areaDibujoSize: number
) {
  if (!viewBox) {
    return { escalaX: 1, escalaY: 1, offsetX: 0, offsetY: 0 };
  }

  return {
    escalaX: viewBox.width / areaDibujoSize,
    escalaY: viewBox.height / areaDibujoSize,
    offsetX: (viewBox.width - areaDibujoSize) / 2,
    offsetY: (viewBox.height - areaDibujoSize) / 2
  };
}

export function manejarVerificacionTrazado(
  strokes: any[],
  cadena: Letra | Animal,
  areaDibujoSize: number = 400,
  umbralVerificacion: number = 65,
  porcentajeAcierto: number = 0.7,
  pasoContorno: number = 1
): string {
  if (!strokes || strokes.length === 0 || strokes.every(arr => arr.length === 0)) {
    return 'Por favor realiza el trazado antes de verificar.';
  }

  const strokesAdaptados = strokes.map(pointsArr => ({ points: pointsArr }));
  const { escalaX, escalaY, offsetX, offsetY } = calcularParametrosVerificacion(
    cadena.viewBox,
    areaDibujoSize
  );
  const resultado = verificarTrazadoConPath(
    strokesAdaptados,
    cadena.path,
    umbralVerificacion,
    porcentajeAcierto,
    escalaX,
    escalaY,
    offsetX,
    offsetY,
    pasoContorno
  );
  return resultado;
}
