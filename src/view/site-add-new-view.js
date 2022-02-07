import SmartView from './smart-view';

import flatpickr from 'flatpickr';
import { Russian } from 'flatpickr/dist/l10n/ru.js';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';

import {dataFormater} from '../utils/utils';
import { typeName } from '../utils/const.js';

const createImgTemplate = (obj) => (
  `${obj ? `
  <div class="event__photos-container">
    <div class="event__photos-tape">
      ${obj.map(({src, description}) => `
        <img class="event__photo" src=${src} alt=${description}>
      `).join('')}
    </div>` : ''}`
);

const createDestinationTemplate = (obj) => {
  const {description, pictures} = obj;

  return `${obj.pictures !== undefined && obj.pictures.length > 0 ? `
            <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>
            ${createImgTemplate(pictures)}
            </div>
          </section>` : ''}`;
};

const createTypeItemTemplate = (array, type, isDisabled) => (
  ` ${array.length > 0 ? `
        ${array.map((item) => `
        <div class="event__type-item">
          <input id="event-type-${item}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" ${isDisabled ? 'disabled' : ''} value="${item}" ${item === type ? 'checked': ''}>
          <label class="event__type-label  event__type-label--${item}" for="event-type-${item}-1">${item}</label>
        </div>`).join('')}` : ''}`
);


const createOffersemplate = (typeOffer, offers) => {
  const idTextOffers = offers.map((offer) => offer.id);

  return `${typeOffer.length > 0 || undefined ? `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${typeOffer.map(({id, title, price}) => `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="${id}" type="checkbox" value='${price}' name="event-offer-luggage" ${idTextOffers.includes(id) ? 'checked' : '' }>
        <label class="event__offer-label" for="${id}">
          <span class="event__offer-title">${title}</span>
            &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
      </div>`).join('')}
    </section>`: ''}`;
};

const createOptionTemplate = (obj) => (
  ` ${obj? `
      ${obj.map((item) => `
        <option value=${item.name}></option>
      `).join('')}` : ''}`
);

const createSiteAddNewTripTemplate = (obj, currentFilter = false) => {
  const { id, basePrice, dateFrom, dateTo, offers, typeOffer, destination, destinations,  type, isDisabled, isSaving, isDeleting} = obj;

  const buttonOption = currentFilter ?
    `<button class="event__reset-btn" type="reset">${isDeleting ? 'Delete...' : 'Delete'}</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>`: '<button class="event__reset-btn" type="reset">Cancel</button>';

  const destinationName = destination.name === undefined ? '' : destination.name;

  return `<li id=${id} class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createTypeItemTemplate(typeName, type, isDisabled)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" required  value="${destinationName}" list="destination-list-1">
       <datalist id="destination-list-1">
       ${createOptionTemplate(destinations)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" ${isDisabled ? 'disabled' : ''} value=${dataFormater(dateFrom, 'YMDH')}>
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" ${isDisabled ? 'disabled' : ''} value=${dataFormater(dateTo, 'YMDH')}>
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="number" ${isDisabled ? 'disabled' : ''} name="event-price" value=${basePrice}>
      </div>
      <button class="event__save-btn  btn  btn--blue" type="submit">${isSaving ? 'Save...' : 'Save'}</button>
        ${buttonOption}
    </header>
    <section class="event__details">
      ${createOffersemplate(typeOffer, offers)}
      ${createDestinationTemplate(destination)}
    </section>
  </form>
</li>`;
};

export default class SiteAddNewTripView extends SmartView {
  #dateStartPicker = null;
  #dataEndPicker = null;

  #currentFilter = null;

  constructor (point, currentFilter) {
    super();

    this.#currentFilter = currentFilter;
    this._data = SiteAddNewTripView.parseTaskToData(point);
    this.#setInnerHandlers();
    this.#setDatepicker();
  }

  get template() {
    return createSiteAddNewTripTemplate(this._data, this.#currentFilter);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#dateStartPicker) {
      this.#dateStartPicker.destroy();
      this.#dateStartPicker = null;
    }

    if (this.#dataEndPicker) {
      this.#dataEndPicker.destroy();
      this.#dataEndPicker = null;
    }
  }

  reset = (point) => {
    this.updateData(
      SiteAddNewTripView.parseTaskToData(point),
    );
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDatepicker();
    this.setFormCloseClickHandler(this._callback.openClick);
    this.setFormOpenClickHandler(this._callback.closeClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  setFormCloseClickHandler = (callback) => {
    this._callback.openClick = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSendClickHandler);
  }

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;

    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  }

  setFormOpenClickHandler = (callback) => {
    this._callback.closeClick = callback;

    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formOpenClickHandler);

    if (this.element.querySelector('.event__rollup-btn')) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formOpenClickHandler);
    }
  }

  #formOpenClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeClick();
  }

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();

    this._callback.deleteClick(SiteAddNewTripView.parseDataToTask(this._data));
  }

  #setDatepicker = () => {
    this.#dateStartPicker = flatpickr(
      this.element.querySelector('input[name="event-start-time"]'),
      {
        locale: Russian,
        enableTime: true,
        dateFormat: 'Y-m-d H:i',
        defaultDate: this._data.dateFrom,
        onChange: this.#dueDateStartChangeHandler,
      },
    );


    this.#dataEndPicker = flatpickr(
      this.element.querySelector('input[name="event-end-time"]'),
      {
        locale: Russian,
        enableTime: true,
        dateFormat: 'Y-m-d H:i',
        defaultDate: this._data.dateTo,
        onChange: this.#dueDateEndChangeHandler,
      },
    );


  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeOfferChanger);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);

    if (this._data.typeOffer.length > 0) {
      this.element.querySelector('.event__available-offers').addEventListener('change', this.#offerItemChangeHandler);
    }
  }

  #dueDateStartChangeHandler = ([userDate]) => {
    this.updateData({
      dateFrom: userDate,
    });
  }

  #dueDateEndChangeHandler = ([userDate]) => {
    this.updateData({
      dateTo: userDate,
    });
  }


  #typeChangeHandler = (evt) => {
    if (evt.target.tagName === 'INPUT') {

      this.updateData({
        type: evt.target.value,
      });
    }
  }

  #offerItemChangeHandler = (evt) => {
    const typeOfferItem = this._data.typeOffer.find((item) => item.id === Number(evt.target.id));

    let arrOffers = [...this._data.offers];

    const offerItemIndex = arrOffers.findIndex((offer) => offer.id === typeOfferItem.id);

    if (offerItemIndex > -1) {

      arrOffers = [
        ...arrOffers.slice(0, offerItemIndex),
        ...arrOffers.slice(offerItemIndex + 1),
      ];

    }  else {

      arrOffers.push(typeOfferItem);
    }

    this.updateData({
      offers: [...arrOffers],
    });

  }

  #priceChangeHandler = (evt) => {
    this.updateData({
      basePrice: Number(evt.target.value),
    });
  }

  #destinationChangeHandler = (evt) => {
    const newDestination = this._data.destinations.find((item) => item.name === evt.target.value);

    this.updateData({
      destination : newDestination,
    });
  }

  #typeOfferChanger = () => {

    const newOffers = this._data.offerArray.find((item) => item.type === this._data.type);

    this.updateData({
      typeOffer: [...newOffers.offers],
    });
  }

  #formSendClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.openClick(SiteAddNewTripView.parseDataToTask(this._data));
  }

  static parseTaskToData = (data) => ({
    ...data,
    isDisabled: false,
    isSaving: false,
    isDeleting: false,
  })

  static parseDataToTask = (data) => {
    const point = {...data};

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  }

}
