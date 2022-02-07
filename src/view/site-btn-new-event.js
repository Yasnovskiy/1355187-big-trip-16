import AbstractView from './abstract-view';

import { MenuItem } from '../utils/const';

const createSiteBtnNewEventTemplate = () => `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow"  type="button" name="${MenuItem.ADD_POINT}">New event</button>`;

export default class SiteBtnNewEventView extends AbstractView {
  get template() {
    return createSiteBtnNewEventTemplate();
  }

  setClickBtn = (callback) => {
    this._callback.sort = callback;
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickBtnOpenNewEvent);
  }

  #clickBtnOpenNewEvent = (evt) => {
    evt.preventDefault();
    this._callback.click();
    this._callback.sort(evt.target.name);
  }

  disabledButton() {
    this.element.setAttribute('disabled', 'disabled');
  }

  removeDisabled() {
    this.element.removeAttribute('disabled');
  }
}
