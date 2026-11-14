import { SafeHtml } from '@angular/platform-browser';

export interface PulsanteNavbar {
  id: string;
  icon: SafeHtml;
  text: string;
  azione: Function;
  condition: boolean;
}

export interface iTab {
  id: string;
  label?: string;
  color?: string;
  icona?: SafeHtml;
  azione?: (id?: string) => void;
}

export interface ISidebarItem {
  id: string;
  nome: string;
  icona: SafeHtml;
}
