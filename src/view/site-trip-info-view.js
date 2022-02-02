import AbstractView from './abstract-view';

const createSiteTripInfoTemplate = (array) => {
  const sumPrice = array.reduce((sum, item) => sum + item.basePrice , 0);

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>
      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
    </div>
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${sumPrice}</span>
    </p>
  </section>`;
};

export default class SiteTripInfoView extends AbstractView {
  #data = null;

  constructor (data) {
    super();
    this.#data = data;
  }

  apdatePrice (points) {
    const sumPrice = points.reduce((sum, item) => sum + item.basePrice , 0);

    const sumElement = this.element.querySelector('.trip-info__cost-value');
    sumElement.textContent = sumPrice;
  }

  get template() {
    return createSiteTripInfoTemplate(this.#data);
  }
}
