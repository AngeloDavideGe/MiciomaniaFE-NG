import { SafeHtml } from '@angular/platform-browser';

export interface ToggleProps {
  titolo: string;
  icona?: SafeHtml;
  image?: string;
  menuElementi: MenuElements[];
}

export interface MenuElements {
  azione: Function;
  testo: string;
  sottotitolo?: string;
  icona?: SafeHtml;
  image?: string;
  condition: boolean;
}

export interface ToggleStyles {
  top?: string;
  height?: string;
  width?: string;
  transform?: string;
  left?: string | number;
  right?: string | number;
  position?: string;
}
