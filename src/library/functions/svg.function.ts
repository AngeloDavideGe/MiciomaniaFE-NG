import {
  DatiSvg,
  PathSvgCustom,
  SvgBar,
  SvgCircle,
} from '../interfaces/svg.interface';

export function creaCirclePaths(
  dati: DatiSvg[],
  svgCircle?: SvgCircle,
): PathSvgCustom[] {
  const centroConfigurato: number = svgCircle?.centro ?? 150;
  const centro: number = Number.isFinite(centroConfigurato)
    ? centroConfigurato
    : 150;
  const raggioConfigurato: number = svgCircle?.raggio ?? 120;
  const raggio: number = Number.isFinite(raggioConfigurato)
    ? Math.max(0, raggioConfigurato)
    : 120;
  const raggioBucoConfigurato: number = svgCircle?.raggioBuco ?? 0;
  const raggioInterno: number = Number.isFinite(raggioBucoConfigurato)
    ? Math.min(Math.max(0, raggioBucoConfigurato), raggio)
    : 0;
  const simmetrico: boolean = svgCircle?.simmetrico ?? false;

  if (dati.length === 0 || raggio === 0) {
    return [];
  }

  const circlePath = (
    centro: number,
    raggio: number,
    raggioInterno: number,
  ): string => {
    const alto: number = centro - raggio;
    const basso: number = centro + raggio;

    if (raggioInterno <= 0) {
      return `M ${centro} ${alto} A ${raggio} ${raggio} 0 1 1 ${centro} ${basso} A ${raggio} ${raggio} 0 1 1 ${centro} ${alto} Z`;
    }

    const altoInterno: number = centro - raggioInterno;
    const bassoInterno: number = centro + raggioInterno;
    return `M ${centro} ${alto} A ${raggio} ${raggio} 0 1 1 ${centro} ${basso} A ${raggio} ${raggio} 0 1 1 ${centro} ${alto} L ${centro} ${altoInterno} A ${raggioInterno} ${raggioInterno} 0 1 0 ${centro} ${bassoInterno} A ${raggioInterno} ${raggioInterno} 0 1 0 ${centro} ${altoInterno} Z`;
  };

  const formatSvgValue = (valore: number): string => {
    return Number(valore.toPrecision(12)).toString();
  };

  const datiValidi: DatiSvg[] = simmetrico
    ? dati
    : dati.filter(
        (dato: DatiSvg) => Number.isFinite(dato.valore) && dato.valore > 0,
      );
  const totale: number = simmetrico
    ? datiValidi.length
    : datiValidi.reduce(
        (somma: number, elemento: DatiSvg) => somma + elemento.valore,
        0,
      );
  const totaleVisualizzato: number = simmetrico
    ? datiValidi.reduce(
        (somma: number, elemento: DatiSvg) =>
          somma + (Number.isFinite(elemento.valore) ? elemento.valore : 0),
        0,
      )
    : totale;

  if (totale <= 0) {
    return [];
  }

  const giroCompleto: number = Math.PI * 2;
  const spessoreSeparatore: number = Math.min(2.5, Math.max(1, raggio * 0.018));
  let angoloCorrente: number = -Math.PI / 2;

  const sezioni: PathSvgCustom[] = datiValidi.map(
    (data: DatiSvg, indice: number) => {
      const valore: number = simmetrico ? 1 : data.valore;
      const percentuale: number = valore / totale;
      const ampiezza: number = percentuale * giroCompleto;
      const angoloFinale: number = angoloCorrente + ampiezza;
      const angoloMedio: number = angoloCorrente + ampiezza / 2;
      const spazioAngolare: number =
        datiValidi.length > 1 ? Math.min(0.035, ampiezza * 0.16) : 0;
      const angoloInizioFetta: number = angoloCorrente + spazioAngolare / 2;
      const angoloFineFetta: number = angoloFinale - spazioAngolare / 2;
      const ampiezzaFetta: number = angoloFineFetta - angoloInizioFetta;
      const pienoGiro: boolean = datiValidi.length === 1;
      const grandeArco: number = ampiezzaFetta > Math.PI ? 1 : 0;
      const xInizio: number = centro + raggio * Math.cos(angoloInizioFetta);
      const yInizio: number = centro + raggio * Math.sin(angoloInizioFetta);
      const xFine: number = centro + raggio * Math.cos(angoloFineFetta);
      const yFine: number = centro + raggio * Math.sin(angoloFineFetta);

      const d: string = pienoGiro
        ? circlePath(centro, raggio, raggioInterno)
        : [
            `M ${xInizio} ${yInizio}`,
            `A ${raggio} ${raggio} 0 ${grandeArco} 1 ${xFine} ${yFine}`,
            raggioInterno > 0
              ? `L ${centro + raggioInterno * Math.cos(angoloFineFetta)} ${centro + raggioInterno * Math.sin(angoloFineFetta)} A ${raggioInterno} ${raggioInterno} 0 ${grandeArco} 0 ${centro + raggioInterno * Math.cos(angoloInizioFetta)} ${centro + raggioInterno * Math.sin(angoloInizioFetta)}`
              : `L ${centro} ${centro}`,
            'Z',
          ].join(' ');

      const raggioTesto: number =
        raggioInterno + (raggio - raggioInterno) * 0.55;
      const mostraPercentuale: boolean =
        percentuale >= 0.045 && ampiezza * raggioTesto >= 24;
      angoloCorrente = angoloFinale;

      return {
        title: data.titolo,
        d,
        fill:
          data.colore ||
          (indice % 2 === 0 ? 'var(--primary)' : 'var(--primary-light)'),
        textX: centro + raggioTesto * Math.cos(angoloMedio),
        textY: centro + raggioTesto * Math.sin(angoloMedio),
        displayText: mostraPercentuale
          ? `${Math.round(percentuale * 100)}%`
          : '',
        textFill: 'var(--text)',
        textSize: Math.min(13, Math.max(10, raggio * 0.11)),
        textWeight: 600,
        stroke: 'var(--card)',
        strokeWidth: spessoreSeparatore,
        click: () => data.click?.(),
      };
    },
  );

  const elementiLegenda: PathSvgCustom[] = [];
  const xLegenda: number = centro + raggio + 24;
  const yLegendaIniziale: number = centro - raggio;
  const altezzaRigaLegenda: number =
    svgCircle?.legenda?.altezzaRigaLegenda || 26;
  const dimensionePallino: number = svgCircle?.legenda?.dimensionePallino || 14;
  const gapPallinoTesto: number = svgCircle?.legenda?.gapPallinoTesto || 10;
  const maxCaratteriLegenda: number =
    svgCircle?.legenda?.maxCaratteriLegenda || 24;
  const textSizeLegenda: number = svgCircle?.legenda?.textSizeLegenda || 13;
  const offsetPallinoY: number = svgCircle?.legenda?.offsetPallinoY || -7;

  datiValidi.forEach((data: DatiSvg, indice: number) => {
    const colore: string =
      data.colore ||
      (indice % 2 === 0 ? 'var(--primary)' : 'var(--primary-light)');

    const yCentroRiga: number =
      yLegendaIniziale + indice * altezzaRigaLegenda + altezzaRigaLegenda / 2;

    elementiLegenda.push({
      title: '',
      d: [
        `M ${xLegenda + dimensionePallino / 2} ${yCentroRiga + offsetPallinoY}`,
        `a ${dimensionePallino / 2} ${dimensionePallino / 2} 0 1 0 0.01 0`,
        'Z',
      ].join(' '),
      fill: colore,
      displayText: '',
    });

    const titoloTroncato: string =
      data.titolo.length > maxCaratteriLegenda
        ? `${data.titolo.slice(0, maxCaratteriLegenda - 1)}…`
        : data.titolo;

    const percentuale: number =
      totaleVisualizzato > 0
        ? (Number.isFinite(data.valore) ? data.valore : 0) / totaleVisualizzato
        : 0;

    const etichetta: string = `${titoloTroncato}  (${Math.round(percentuale * 100)}%)`;

    elementiLegenda.push({
      title: data.titolo,
      d: '',
      displayText: etichetta,
      textX: xLegenda + dimensionePallino + gapPallinoTesto,
      textY: yCentroRiga,
      textAnchor: 'start',
      textFill: 'var(--text-secondary)',
      textSize: textSizeLegenda,
      textWeight: 500,
    });
  });

  const risultato: PathSvgCustom[] = [...sezioni, ...elementiLegenda];

  if (raggioInterno < 28) {
    return risultato;
  }

  return [
    ...risultato,
    {
      title: 'Totale',
      d: '',
      displayText: formatSvgValue(totaleVisualizzato),
      textX: centro,
      textY: centro,
      textFill: 'var(--text)',
      textSize: Math.min(18, Math.max(11, raggioInterno * 0.42)),
      textWeight: 700,
    },
  ];
}

export function creaBarPaths(
  dati: DatiSvg[],
  svgBar?: SvgBar,
): PathSvgCustom[] {
  const larghezzaMassima: number = svgBar?.larghezzaMassima || 280;
  const altezzaBarra: number = svgBar?.altezzaBarra || 32;
  const spazio: number = svgBar?.spazio || 12;
  const margine: number = svgBar?.margine || 10;

  if (dati.length === 0) {
    return [];
  }

  const paddingEtichette: number = Math.min(
    132,
    Math.max(48, larghezzaMassima * 0.2),
  );
  const x0: number = margine + paddingEtichette;
  const larghezzaUtile: number = Math.max(
    0,
    larghezzaMassima - paddingEtichette - margine,
  );
  const massimo: number = Math.max(0, ...dati.map((dato) => dato.valore));

  const niceStep = (max: number, targetTicks: number = 5): number => {
    if (max <= 0) {
      return 1;
    }
    const raw: number = max / targetTicks;
    const mag: number = Math.pow(10, Math.floor(Math.log10(raw)));
    const norm: number = raw / mag;
    const nice: number = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 5 ? 5 : 10;
    return nice * mag;
  };

  const formatTick = (valore: number): string => {
    return Number(valore.toPrecision(12)).toString();
  };

  const truncateLabel = (label: string, maxLength: number): string => {
    if (label.length <= maxLength) {
      return label;
    }
    return `${label.slice(0, maxLength - 1)}…`;
  };

  const passo: number = niceStep(massimo);
  const massimoAsse: number =
    massimo > 0 ? Math.ceil(massimo / passo) * passo : 1;
  const primoY: number = margine;
  const baseY: number =
    margine + (dati.length - 1) * (altezzaBarra + spazio) + altezzaBarra;

  const coloreAsse: string = 'var(--text-secondary)';
  const coloreGriglia: string = 'var(--border)';
  const coloreAccento: string = 'var(--primary)';
  const spessoreAsse: number = 1.5;
  const elementiGrafici: PathSvgCustom[] = [];
  const numeroIntervalli: number = Math.ceil(massimoAsse / passo);

  for (
    let indiceTick: number = 0;
    indiceTick <= numeroIntervalli;
    indiceTick++
  ) {
    const valore: number = indiceTick * passo;
    const x: number = x0 + (valore / massimoAsse) * larghezzaUtile;
    const isZero: boolean = valore === 0;

    elementiGrafici.push({
      title: '',
      d: `M ${x} ${primoY} v ${baseY - primoY} h 1 v -${baseY - primoY} Z`,
      fill: isZero ? coloreAccento : coloreGriglia,
      displayText: '',
    });

    elementiGrafici.push({
      title: '',
      d: `M ${x} ${baseY} v 5 h 1 v -5 Z`,
      fill: coloreAsse,
      displayText: '',
    });

    elementiGrafici.push({
      title: formatTick(valore),
      d: '',
      textX: x,
      textY: baseY + 17,
      textFill: coloreAsse,
      textSize: 11,
      textWeight: 500,
    });
  }

  elementiGrafici.push(
    {
      title: '',
      d: `M ${x0} ${primoY} h ${spessoreAsse} v ${baseY - primoY} h -${spessoreAsse} Z`,
      fill: coloreAsse,
      displayText: '',
    },
    {
      title: '',
      d: `M ${x0} ${baseY} h ${larghezzaUtile} v ${spessoreAsse} h -${larghezzaUtile} Z`,
      fill: coloreAsse,
      displayText: '',
    },
  );

  const barre: PathSvgCustom[] = dati.flatMap(
    (dato: DatiSvg, indice: number) => {
      const y: number = margine + indice * (altezzaBarra + spazio);
      const valore: number = Math.max(0, dato.valore);
      const larghezza: number =
        massimoAsse > 0 ? (valore / massimoAsse) * larghezzaUtile : 0;
      const raggio: number = Math.min(6, altezzaBarra / 2, larghezza / 2);

      const d: string = [
        `M ${x0 + raggio} ${y}`,
        `H ${x0 + larghezza - raggio}`,
        `Q ${x0 + larghezza} ${y} ${x0 + larghezza} ${y + raggio}`,
        `V ${y + altezzaBarra - raggio}`,
        `Q ${x0 + larghezza} ${y + altezzaBarra} ${x0 + larghezza - raggio} ${y + altezzaBarra}`,
        `H ${x0 + raggio}`,
        `Q ${x0} ${y + altezzaBarra} ${x0} ${y + altezzaBarra - raggio}`,
        `V ${y + raggio}`,
        `Q ${x0} ${y} ${x0 + raggio} ${y}`,
        'Z',
      ].join(' ');

      const etichettaVisibile: string = truncateLabel(
        dato.titolo,
        Math.max(8, Math.floor((paddingEtichette - 18) / 7)),
      );
      const valoreDentroBarra: boolean = larghezza >= 34;

      return [
        {
          title: dato.titolo,
          d: '',
          displayText: etichettaVisibile,
          textX: x0 - 10,
          textY: y + altezzaBarra / 2,
          textAnchor: 'end',
          textFill: 'var(--text-secondary)',
          textSize: 11,
          textWeight: 500,
        },
        {
          title: dato.titolo,
          d,
          fill: dato.colore || 'var(--primary-light)',
          displayText: '',
          textX: 0,
          textY: 0,
          click: () => dato.click?.(),
        },
        {
          title: formatTick(dato.valore),
          d: '',
          textX: valoreDentroBarra ? x0 + larghezza - 8 : x0 + larghezza + 8,
          textY: y + altezzaBarra / 2,
          textAnchor: valoreDentroBarra ? 'end' : 'start',
          textFill: 'var(--text)',
          textSize: 11,
          textWeight: 600,
        },
      ];
    },
  );

  return [...elementiGrafici, ...barre];
}
