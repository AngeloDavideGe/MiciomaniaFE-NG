export interface PathSvgCustom {
  title: string;
  d: string;
  fill?: string;
  textX?: number;
  textY?: number;
  displayText?: string;
  textFill?: string;
  textSize?: number;
  textWeight?: string | number;
  textAnchor?: 'start' | 'middle' | 'end';
  stroke?: string;
  strokeWidth?: number;
  click?: Function;
}

export interface DatiSvg {
  titolo: string;
  valore: number;
  colore?: string;
  click?: Function;
}

export interface Mappa {
  proprietario: string;
  descrizione: string;
}

export interface SvgBar {
  larghezzaMassima?: number;
  altezzaBarra?: number;
  spazio?: number;
  margine?: number;
  textSizeAsse?: number;
  maxCaratteriAsseY?: number;
}

export interface SvgCircle {
  centro?: number;
  raggio?: number;
  simmetrico?: boolean;
  raggioBuco?: number;
  legenda?: {
    altezzaRigaLegenda?: number;
    dimensionePallino?: number;
    gapPallinoTesto?: number;
    maxCaratteriLegenda?: number;
    textSizeLegenda?: number;
    offsetPallinoY?: number;
  };
}
