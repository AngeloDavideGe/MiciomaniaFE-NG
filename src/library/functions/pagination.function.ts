import { computed, signal } from '@angular/core';
import {
  FiltriInterface,
  FiltriSelect,
  InputFiltri,
} from '../interfaces/pagination.interface';
import { GetOrderCustom } from './ordinamento.function';
import { ICheckBox } from '../interfaces/form.interface';

const maxElementForPage = 20;

export function GetFiltriCustom<T, F>(
  params: InputFiltri<T, F>,
): FiltriInterface<T> {
  const currentPage = signal<number>(1);
  const currentSlice = signal<number>(0);

  params.tipoSelect = params.tipoSelect ? params.tipoSelect : 'every';
  const RecordFiltri: Record<string, Function> = GetRecordFiltri<T, F>(params);

  const searchElems = computed<T[]>(() => {
    const elemTot: T[] = params.elemTable();
    const ordina = params.ordinaElem ? params.ordinaElem() : null;
    const totalPageHttp: number | null = params.totalElemHttp
      ? params.totalElemHttp()
      : null;

    if (totalPageHttp !== null) return elemTot;

    let filter: T[];

    if (params.tipoSelect == 'every') {
      filter = elemTot.filter(
        (x: T) =>
          RecordFiltri['select'](x) &&
          RecordFiltri['multiSelect'](x) &&
          RecordFiltri['tabs'](x),
      );
    } else {
      filter = elemTot.filter(
        (x: T) =>
          RecordFiltri['select'](x) ||
          RecordFiltri['multiSelect'](x) ||
          RecordFiltri['tabs'](x),
      );
    }

    if (ordina) {
      filter = GetOrderCustom(filter, ordina.key, ordina.order == 'desc');
    }

    return filter;
  });

  const totalPage = computed<number>(() => {
    const search: T[] = searchElems();

    const elemForPage: number = params.elemForPage
      ? params.elemForPage()
      : maxElementForPage;

    const numElems: number = params.totalElemHttp
      ? params.totalElemHttp()
      : search.length;

    return Math.ceil(numElems / elemForPage);
  });

  const elemFilter = computed<T[]>(() => {
    const totElem: T[] = searchElems();
    const currentPages: number = currentPage();
    const singleSlice: number = currentSlice();

    const elemForPage: number = params.elemForPage
      ? params.elemForPage()
      : maxElementForPage;

    const totalPageHttp: number | null = params.totalElemHttp
      ? params.totalElemHttp()
      : null;

    if (totalPageHttp !== null) return totElem;

    switch (params.slice) {
      case 'single': {
        return totElem.slice(singleSlice, singleSlice + elemForPage);
      }
      case 'page': {
        return totElem.slice(
          (currentPages - 1) * elemForPage,
          currentPages * elemForPage,
        );
      }
      case 'all': {
        return totElem;
      }
      default: {
        return totElem.slice(
          (currentPages - 1) * elemForPage,
          currentPages * elemForPage,
        );
      }
    }
  });

  const dettaglioPage = computed<string>(() => {
    const currentPages: number = currentPage();

    const totalElem: number = params.totalElemHttp
      ? params.totalElemHttp()
      : searchElems().length;

    const elemForPage: number = params.elemForPage
      ? params.elemForPage()
      : maxElementForPage;

    const start: number = Math.max(0, 1 + (currentPages - 1) * elemForPage);
    const end: number = Math.min(start + elemForPage - 1, totalElem);

    if (totalElem < 2) {
      return `${totalElem} elementi`;
    } else {
      return `${start} - ${end} elementi di ${totalElem}`;
    }
  });

  const previousPage: Function = () => {
    if (currentPage() > 1) {
      currentPage.update((x: number) => x - 1);
    }
  };

  const nextPage: Function = () => {
    if (currentPage() < totalPage()) {
      currentPage.update((x: number) => x + 1);
    }
  };

  const selectPage: Function = (page: number) => {
    if (page >= 1 && page <= totalPage()) {
      currentPage.set(page);
    }
  };

  const previousSlice: Function = () => {
    if (currentSlice() > 0) {
      currentSlice.update((x: number) => x - 1);
    }
  };

  const nextSlice: Function = () => {
    const elemForPage: number = params.elemForPage
      ? params.elemForPage()
      : maxElementForPage;

    if (currentSlice() < params.elemTable().length - elemForPage) {
      currentSlice.update((x: number) => x + 1);
    }
  };

  return {
    searchElems: searchElems,
    totalPage: totalPage,
    elemFilter: elemFilter,
    currentPage: currentPage,
    currentSlice: currentSlice,
    dettaglioPage: dettaglioPage,
    previousPage: previousPage,
    nextPage: nextPage,
    selectPage: selectPage,
    previousSlice: previousSlice,
    nextSlice: nextSlice,
  };
}

function GetRecordFiltri<T, F>(
  params: InputFiltri<T, F>,
): Record<string, Function> {
  let RecordFiltri: Record<string, Function>;

  if (params.tipoSelect == 'every') {
    RecordFiltri = {
      tabs: (x: T) => true,
      select: (x: T) => true,
      multiSelect: (x: T) => true,
    };
  } else {
    RecordFiltri = {
      tabs: (x: T) => false,
      select: (x: T) => false,
      multiSelect: (x: T) => false,
    };
  }

  if (params.select && params.select.length > 0) {
    if (params.tipoSelect == 'every') {
      RecordFiltri['select'] = (x: T) =>
        params.select!.every((w: FiltriSelect<T, string>) =>
          String(x[w.key]).toLowerCase().includes(w.query().toLowerCase()),
        );
    } else {
      RecordFiltri['select'] = (x: T) =>
        params.select!.some((w: FiltriSelect<T, string>) =>
          String(x[w.key]).toLowerCase().includes(w.query().toLowerCase()),
        );
    }
  }

  if (params.multiSelect && params.multiSelect.length > 0) {
    if (params.tipoSelect == 'every') {
      RecordFiltri['multiSelect'] = (x: T) =>
        params.multiSelect!.every(
          (w: FiltriSelect<T, ICheckBox[]>) =>
            w.query().length === 0 ||
            w.query().some((y: ICheckBox) => x[w.key] == y.id),
        );
    } else {
      RecordFiltri['multiSelect'] = (x: T) =>
        params.multiSelect!.some(
          (w: FiltriSelect<T, ICheckBox[]>) =>
            w.query().length === 0 ||
            w.query().some((y: ICheckBox) => x[w.key] == y.id),
        );
    }
  }

  if (params.tabs && params.tabs.length > 0) {
    if (params.tipoSelect == 'every') {
      RecordFiltri['tabs'] = (x: T) =>
        params.tabs!.every(
          (w: FiltriSelect<T, F | null>) =>
            w.query() == null || x[w.key] == w.query(),
        );
    } else {
      RecordFiltri['tabs'] = (x: T) =>
        params.tabs!.some(
          (w: FiltriSelect<T, F | null>) =>
            w.query() == null || x[w.key] == w.query(),
        );
    }
  }

  return RecordFiltri;
}
