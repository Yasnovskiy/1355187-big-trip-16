import SmartView from './smart-view';
import {dataFormater} from '../mock/mockData';
import {typeName} from '../mock/mockData';
import flatpickr from 'flatpickr';
import { Russian } from 'flatpickr/dist/l10n/ru.js';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const createImgTemplate = (obj) => (
  `${obj ? `
  <div class="event__photos-container">
    <div class="event__photos-tape">
      ${obj.map(({src, description}) => `
        <img class="event__photo" src=${src} alt=${description}>
      `).join('')}
    </div>` : ''}`
);

const createTypeItemTemplate = (array, type) => (
  ` ${array.length > 0 ? `
        ${array.map((item) => `
        <div class="event__type-item">
          <input id="event-type-${item}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item}" ${item === type ? 'checked': ''}>
          <label class="event__type-label  event__type-label--${item}" for="event-type-${item}-1">${item}</label>
        </div>`).join('')}` : ''}`
);


const createOffersemplate = (obj) => (
  ` ${obj.length > 0 ? `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${obj.map(({id, description, price}) => `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${id}" type="checkbox" name="event-offer-luggage" checked>
        <label class="event__offer-label" for="event-offer-luggage-${id}">
          <span class="event__offer-title">${description}</span>
            &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
      </div>`).join('')}
    </section>`: ''}`
);

const createOptionTemplate = (obj) => (
  ` ${obj? `
        ${obj.map((item) => `
        <option value=${item.city}></option>
        `).join('')}` : ''}`
);

const createSiteAddNewTripTemplate = (obj) => {
  const { basePrice, dateFrom, dateTo, destinationDatas, offersArray, city, type} = obj;

  const selectedType = offersArray.find((item) => item.type === type);

  const selectedCity = destinationDatas.find((item) => item.city === city) || { distanation: {} };

  return `<li class="trip-events__item trip-events__item--new">
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
            ${createTypeItemTemplate(typeName, type)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${selectedCity.city} list="destination-list-1">
       <datalist id="destination-list-1">
       ${createOptionTemplate(destinationDatas)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value=${dataFormater(dateFrom, 'YMDH')}>
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value=${dataFormater(dateTo, 'YMDH')}>
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${basePrice}>
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
    ${createOffersemplate(selectedType.offers)}
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${selectedCity.distanation.description}</p>
        ${createImgTemplate(selectedCity.distanation.pictures)}
        </div>
      </section>
    </section>
  </form>
</li>`;
};

export default class SiteAddNewTripView extends SmartView {
  #dateStartPicker = null;
  #dataEndPicker = null;

  constructor (point) {
    super();
    this._data = SiteAddNewTripView.parseDataToTask(point);

    this.#setInnerHandlers();
    this.#setDatepicker();
  }

  get template() {
    return createSiteAddNewTripTemplate(this._data);
  }

  // Перегружаем метод родителя removeElement,
  // чтобы при удалении удалялся более не нужный календарь
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
      SiteAddNewTripView.parseDataToTask(point),
    );
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDatepicker();
    this.setFormCloseClickHandler(this._callback.openClick);
  }

  setFormCloseClickHandler = (callback) => {
    this._callback.openClick = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formCloseClickHandler);
  }

  #setDatepicker = () => {
    // flatpickr есть смысл инициализировать только в случае,
    // если поле выбора даты доступно для заполнения
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
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formCloseClickHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#cityChangeHandler);
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

  #cityChangeHandler = (evt) => {
    this.updateData({
      city: evt.target.value,
    });
  }

  #formCloseClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.openClick(SiteAddNewTripView.parseDataToTask(this._data));
  }

  static parseDataToTask = (data) => {
    const point = {...data};

    return point;
  }

}
