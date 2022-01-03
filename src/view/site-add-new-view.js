import {createElement} from '../render.js';
import {dataFormater} from '../mock/mockData';
import {typeName} from '../mock/mockData';

const createImgTemplate = (obj) => (
  ` ${obj.length > 0 ? `
  <div class="event__photos-container">
    <div class="event__photos-tape">
      ${obj.map(({src, description}) => `
        <img class="event__photo" src=${src} alt=${description}>
      `).join('')}
    </div>` : ''}`
);

const createTypeItemTemplate = (array, type) => (
  ` ${array.length > 0 ? `
    <div class="event__type-item">
      ${array.map((item) => `
        <input id="event-type-${item}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item}" ${item === type ? 'checked': ''}>
        <label class="event__type-label  event__type-label--${item}" for="event-type-${item}-1">${item}</label>
      `).join('')}
    </div>` : ''}`
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
          <span class="event__offer-price">${price} </span>
        </label>
      </div>`).join('')}
    </section>`: ''}`
);

const createSiteAddNewTripTemplate = (obj) => {
  const { basePrice, dateFrom, dateTo, destinationDatas, offers, type} = obj;
  const { distanation, city} = destinationDatas[0];

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
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="" list="destination-list-1">
        <datalist id="destination-list-1">
          <option value=${city}></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
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
          &euro; ${basePrice}
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
    ${createOffersemplate(offers)}
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${distanation.description}</p>
        ${createImgTemplate(distanation.pictures)}
        </div>
      </section>
    </section>
  </form>
</li>`;
};

export default class SiteAddNewTripView {
  #element = null;
  #data = null;

  constructor(task) {
    this.#data = task;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createSiteAddNewTripTemplate(this.#data);
  }

  removeElement() {
    this.#element = null;
  }
}
