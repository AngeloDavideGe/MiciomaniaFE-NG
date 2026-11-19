import { CanActivateFn, Params } from '@angular/router';

type RequiredParamSource = 'param' | 'queryParam';

export function requiredParamsGuard(
  keys: readonly string[],
  source: RequiredParamSource = 'param',
): CanActivateFn {
  return (route) => {
    if (keys.length === 0) return true;

    const values: Params =
      source === 'queryParam' ? route.queryParams : route.params;

    return keys.every((key) => {
      const value = values[key];
      return (
        value !== null && value !== undefined && String(value).trim() !== ''
      );
    });
  };
}

export const requiredRouteParamsGuard: CanActivateFn = (route, state) => {
  const configuredKeys = route.data['requiredParams'];
  const keys = Array.isArray(configuredKeys)
    ? configuredKeys.filter((key): key is string => typeof key === 'string')
    : [];

  return requiredParamsGuard(keys)(route, state);
};

export const requiredQueryParamsGuard: CanActivateFn = (route, state) => {
  const configuredKeys = route.data['requiredQueryParams'];
  const keys = Array.isArray(configuredKeys)
    ? configuredKeys.filter((key): key is string => typeof key === 'string')
    : [];

  return requiredParamsGuard(keys, 'queryParam')(route, state);
};
