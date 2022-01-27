import AbstractView from './abstract-view';
import { sortIdFormEvent } from '../utils/const';

const createSiteSortTemplate = (currentSoryType) => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">

    <div class="trip-sort__item  trip-sort__item--day ${currentSoryType === sortIdFormEvent.DEFAULT ? 'trip-sort__item--active' : ''}">
      <input id="${sortIdFormEvent.DEFAULT}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${sortIdFormEvent.DEFAULT}" ${currentSoryType === sortIdFormEvent.DEFAULT ? 'checked' : ''}>
      <label class="trip-sort__btn" for="${sortIdFormEvent.DEFAULT}">Day</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--event">
      <input id="${sortIdFormEvent.DATE_EVENT}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${sortIdFormEvent.DATE_EVENT}" disabled>
      <label class="trip-sort__btn" for="${sortIdFormEvent.DATE_EVENT}">Event</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--time ${currentSoryType === sortIdFormEvent.DATE_TIME ? 'trip-sort__item--active' : ''}">
      <input id="${sortIdFormEvent.DATE_TIME}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${sortIdFormEvent.DATE_TIME}" ${currentSoryType === sortIdFormEvent.DATE_TIME ? 'checked' : ''}>
      <label class="trip-sort__btn" for="${sortIdFormEvent.DATE_TIME}">Time</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--price ${currentSoryType === sortIdFormEvent.DATE_PRICE ? 'trip-sort__item--active' : ''}">
      <input id="${sortIdFormEvent.DATE_PRICE}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${sortIdFormEvent.DATE_PRICE}" ${currentSoryType === sortIdFormEvent.DATE_PRICE ? 'checked' : ''}>
      <label class="trip-sort__btn" for="${sortIdFormEvent.DATE_PRICE}">Price</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--offer">
      <input id="${sortIdFormEvent.DATE_OFFER}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${sortIdFormEvent.DATE_OFFER}" disabled>
      <label class="trip-sort__btn" for="${sortIdFormEvent.DATE_OFFER}">Offers</label>
    </div>

  </form>`
);

export default class SiteSortView extends AbstractView {
  #currentSoryType = null;

  constructor(currentSoryType) {
    super();
    this.#currentSoryType = currentSoryType;
  }

  get template() {
    return createSiteSortTemplate(this.#currentSoryType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName === 'INPUT') {
      this._callback.sortTypeChange(evt.target.id);
    }
  }
}
