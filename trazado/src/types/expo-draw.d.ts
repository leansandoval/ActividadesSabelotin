// expo-draw.d.ts
declare module 'expo-draw' {
  import * as React from 'react';

  export interface ExpoDrawProps {
    strokes?: any[];
    containerStyle?: object;
    color?: string;
    strokeWidth?: number;
    rewind?: (undo: () => void) => void;
    clear?: (clear: () => void) => void;
    enabled?: boolean;
    onChangeStrokes?: (strokes: any[]) => void;
  }

  export default class ExpoDraw extends React.Component<ExpoDrawProps> {}
}
