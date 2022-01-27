import AbstractView from './abstract-view';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name} = filter;

  return (`<div class="trip-filters__filter">
        <input
        id="filter-${type}"
        class="trip-filters__filter-input visually-hidden"
        type="radio"
        name="trip-filter"
        value=${name}
        ${type === currentFilterType ? 'checked': ''}
        >
        <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
      </div>`);
};

const createSiteFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems.map((filter) => createFilterItemTemplate(filter, currentFilterType)).join('');

  return `<form class="trip-filters" action="#" method="get">

            ${filterItemsTemplate}

            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
};

export default class SiteFilterView extends AbstractView {
  #filters = null;
  #currentFilterType = null;

  constructor (filters, currentFilterType) {
    super();

    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
  }

  get template() {
    return createSiteFilterTemplate(this.#filters, this.#currentFilterType);
  }

  setFilterPointChangeHandler = (callback) => {
    this._callback.filterPointChange = callback;
    this.element.addEventListener('click', this.#filterPointChangeHandler);
  }

  #filterPointChangeHandler = (evt) => {
    if (evt.target.tagName === 'INPUT') {
      this._callback.filterPointChange(evt.target.value);
    }
  }

}

