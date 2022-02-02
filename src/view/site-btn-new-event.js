import AbstractView from './abstract-view';

const createSiteBtnNewEventTemplate = () => '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class SiteBtnNewEventView extends AbstractView {
  get template() {
    return createSiteBtnNewEventTemplate();
  }

  setClickBtn = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickBtnOpenNewEvent);
  }

  // setClickNoDisabledBtn = (callback) => {
  //   this._callback.click = callback;
  //   this.element.addEventListener('click', this.#clickRemoveEvent);
  // }

  #clickBtnOpenNewEvent = (evt) => {
    evt.preventDefault();
    this._callback.click();
    this.element.setAttribute('disabled', 'disabled');
  }

  #clickRemoveEvent = (evt) => {
    evt.preventDefault();
    this.element.removeAttribute('disabled');
  }
}
