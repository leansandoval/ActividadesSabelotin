import { ViewBox } from './ViewBox';

export interface Animal {
    nombre: string;
    svg: any; // Componente SVG importado
    path: string;
    emoji: string;
    viewBox: ViewBox;
}
