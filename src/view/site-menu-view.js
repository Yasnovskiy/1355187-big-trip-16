import AbstractView from './abstract-view';
import { MenuItem } from '../utils/const';

const createSiteMenuTemplate = (currentDataType) => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  ${currentDataType === MenuItem.TABLE ? 'trip-tabs__btn--active' : ''}" data-type="${MenuItem.TABLE}" href="#">Table</a>
    <a class="trip-tabs__btn ${currentDataType === MenuItem.STATS ? 'trip-tabs__btn--active' : ''}"  data-type="${MenuItem.STATS}" href="#">Stats</a>
  </nav>`
);

export default class SiteMenuView extends AbstractView {
  #currentDataType = null;

  get template() {
    return createSiteMenuTemplate(this.#currentDataType);
  }

  setMenuClickHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#menuClickHandler);
  }

  #menuClickHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.type);
    this.#currentDataType = evt.target.dataset.type;
  }
}
