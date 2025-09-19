import { ViewBox } from './ViewBox';

export interface Letra {
  nombre: string;
  svg: any; // Componente SVG importado
  viewBox: ViewBox;
  path: string;
}
