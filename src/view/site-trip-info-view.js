import AbstractView from './abstract-view';

const createSiteTripInfoTemplate = () => (
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>
      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
    </div>
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">0</span>
    </p>
  </section>`
);

export default class SiteTripInfoView extends AbstractView {
  #data = null;

  constructor (data) {
    super();
    this.#data = data;
  }

  apdatePrice (points) {
    const sumBasePrice = points.reduce((sum, item) => sum + item.basePrice , 0);
    const sumPrices = points.map((item) =>  item.offers.reduce((sum, itemPrice) => sum + itemPrice.price, 0)).reduce((sum, index) => sum + index, 0);

    const sumElement = this.element.querySelector('.trip-info__cost-value');
    sumElement.textContent = sumBasePrice + sumPrices;
  }

  get template() {
    return createSiteTripInfoTemplate(this.#data);
  }
}
