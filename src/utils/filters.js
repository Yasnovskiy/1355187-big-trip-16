import { FilterType } from './const';
import { isTaskExpiringToday, isTaskExpiringTodays } from './utils';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
  [FilterType.FUTURE]: (points) => points.filter((point) => isTaskExpiringToday(point.dateFrom)),
  [FilterType.PAST]: (points) => points.filter((point) => isTaskExpiringTodays(point.dateTo)),
};
