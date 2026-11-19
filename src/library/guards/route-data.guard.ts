import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';

export function routeDataGuard(predicate: RouteDataPredicate): CanActivateFn {
  return (route, state) => predicate(route.data, route, state);
}

export function allowedDataGuard(
  key: string,
  allowedValues: readonly unknown[],
): CanActivateFn {
  return routeDataGuard((data) =>
    allowedValues.some((allowed) => Object.is(data[key], allowed)),
  );
}

export type RouteDataPredicate = (
  data: Readonly<Record<string, unknown>>,
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => boolean | Promise<boolean>;
