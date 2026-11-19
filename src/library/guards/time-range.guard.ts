import { CanActivateFn } from '@angular/router';

export interface TimeRange {
  from?: Date | string | number;
  to?: Date | string | number;
}

function toTime(value: Date | string | number): number {
  return value instanceof Date ? value.getTime() : new Date(value).getTime();
}

export function timeRangeGuard(
  range: TimeRange,
  now: () => Date = () => new Date(),
): CanActivateFn {
  return () => {
    const currentTime = now().getTime();

    if (range.from !== undefined) {
      const fromTime = toTime(range.from);
      if (!Number.isFinite(fromTime) || currentTime < fromTime) return false;
    }

    if (range.to !== undefined) {
      const toTimeValue = toTime(range.to);
      if (!Number.isFinite(toTimeValue) || currentTime > toTimeValue) {
        return false;
      }
    }

    return true;
  };
}

export const routeTimeRangeGuard: CanActivateFn = (route, state) => {
  const range = route.data['timeRange'];

  if (!range || typeof range !== 'object') return false;

  return timeRangeGuard(range as TimeRange)(route, state);
};
