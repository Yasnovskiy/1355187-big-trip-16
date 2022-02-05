import AbstractView from './abstract-view';
import { FilterType } from '../utils/const';

const NoTasksTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
};

const createSiteNoEventTemplate = (filterType) => {
  const noTaskTextValue = NoTasksTextType[filterType];

  return `<p class="trip-events__msg">${noTaskTextValue}</p>`;
};

export default class SiteNoEventView extends AbstractView {
  constructor (data) {
    super();
    this._data = data;
  }

  get template() {
    return createSiteNoEventTemplate(this._data);
  }
}
