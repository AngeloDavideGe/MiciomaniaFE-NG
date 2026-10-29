import { Observable } from 'rxjs';

/**
 * 1. Incapsula una connessione WebSocket in un Observable.
 * Emette i MessageEvent ricevuti; chiude la connessione al teardown.
 */
export function createWebSocketObservable(
  url: string,
): Observable<MessageEvent> {
  return new Observable<MessageEvent>((observer) => {
    const socket = new WebSocket(url);

    socket.onmessage = (event: MessageEvent) => observer.next(event);
    socket.onerror = (error: Event) => observer.error(error);
    socket.onclose = () => observer.complete();

    // Teardown: chiude la connessione quando si annulla la sottoscrizione
    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  });
}

/**
 * 2. Incapsula navigator.geolocation.watchPosition.
 * Emette le posizioni aggiornate; chiama clearWatch al teardown.
 */
export function watchPosition(
  options?: PositionOptions,
): Observable<GeolocationPosition> {
  return new Observable<GeolocationPosition>((observer) => {
    const watchId = navigator.geolocation.watchPosition(
      (pos: GeolocationPosition) => observer.next(pos),
      (err: GeolocationPositionError) => observer.error(err),
      options,
    );

    return () => navigator.geolocation.clearWatch(watchId);
  });
}

/**
 * 3. Incapsula IntersectionObserver.
 * Emette gli array di IntersectionObserverEntry; chiama disconnect al teardown.
 */
export function fromIntersectionObserver(
  element: Element,
  options?: IntersectionObserverInit,
): Observable<IntersectionObserverEntry[]> {
  return new Observable<IntersectionObserverEntry[]>((observer) => {
    const io = new IntersectionObserver(
      (entries) => observer.next(entries),
      options,
    );
    io.observe(element);

    return () => io.disconnect();
  });
}

/**
 * 4. Polling personalizzato con setInterval + async callback.
 * Emette il risultato della funzione a ogni tick; pulisce l'intervallo al teardown.
 * In caso di errore della callback, propaga l'errore e interrompe il polling.
 */
export function pollWithCleanup<T>(
  fn: () => Promise<T>,
  intervalMs: number,
): Observable<T> {
  return new Observable<T>((observer) => {
    const id = setInterval(async () => {
      try {
        const result = await fn();
        observer.next(result);
      } catch (e) {
        observer.error(e);
      }
    }, intervalMs);

    return () => clearInterval(id);
  });
}

/**
 * 5. Converte una API di terze parti basata su callback in Observable.
 * La factory riceve il soggetto (observer) e deve restituire una funzione
 * di teardown che annulla la sottoscrizione alla callback.
 *
 * Esempio d'uso:
 *   fromCallbackApi<Payload>(handler => {
 *     const token = thirdParty.on('data', handler);
 *     return () => thirdParty.off(token);
 *   });
 */
export function fromCallbackApi<T>(
  factory: (emit: (value: T) => void) => () => void,
): Observable<T> {
  return new Observable<T>((observer) => {
    const emit = (value: T) => observer.next(value);
    const teardown = factory(emit);
    return teardown;
  });
}
