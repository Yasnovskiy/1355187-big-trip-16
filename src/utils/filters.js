import { FilterType } from './const';
import { isTaskExpired } from '../mock/mockData';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
  [FilterType.FUTURE]: (points) => points.filter((point) => !point.isFavorite),
  [FilterType.PAST]: (points) => points.filter((point) => point.isFavorite),
};
