import SiteSortView from '../view/site-sort-view';

import SiteEventsListView from '../view/site-events-list-view';
import PointerPresenter from './point-presenter';
import {render, updateItem, RenderPosition} from '../utils/render';
import {sortIdFormEvent} from '../utils/const';

export default class TripPresenter {
  #tripContainer = null;

  #tripSortComponent = new SiteSortView();
  #tripListComponent = new SiteEventsListView();

  #tripsArray = [];
  #pointPresenter = new Map();
  #currentSortType = sortIdFormEvent.DEFAULT;
  #sourcedTripsArray= [];

  constructor (tripContainer) {
    this.#tripContainer= tripContainer;
  }

  init = (tripArray) => {
    this.#tripsArray = [...tripArray];
    // В отличии от сортировки по любому параметру,
    // исходный порядок можно сохранить только одним способом -
    // сохранив исходный массив:
    this.#sourcedTripsArray = [...tripArray];

    this.#renderSort();

    render(this.#tripContainer, this.#tripListComponent, RenderPosition.BEFOREEND);

    this.#renderTrip();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenterItem) => presenterItem.resetView());
  }

  #handlePointChange = (updatedTask) => {
    this.#tripsArray = updateItem(this.#tripsArray, updatedTask);
    this.#sourcedTripsArray = updateItem(this.#sourcedTripsArray, updatedTask);
    this.#pointPresenter.get(updatedTask.id).init(updatedTask);
  }

  #sortIdPoints = (sortType) => {
    switch (sortType) {
      case (sortIdFormEvent.DATE_PRICE):
        this.#tripsArray.sort((first, second) => {
          if (first.basePrice > second.basePrice) {
            return -1;
          }
          if (first.basePrice < second.basePrice) {
            return 1;
          }

          return 0;
        });
        break;
      default:

        this.#tripsArray = [...this.#sourcedTripsArray];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortIdPoints(sortType);
    this.#clearPointList();
    this.#renderPointList();
  }

  #renderSort = () => {
    render(this.#tripContainer, this.#tripSortComponent, RenderPosition.BEFOREEND);
    this.#tripSortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderPoint = (trip) => {
    const pointPresenter = new PointerPresenter(this.#tripListComponent, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(trip);
    this.#pointPresenter.set(trip.id, pointPresenter);
  }

  #renderPoints = () => {
    this.#tripsArray.forEach((tripArray) => this.#renderPoint(tripArray));
  }

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #renderPointList = () => {
    this.#renderPoints();
  }

  #renderTrip = () => {
    this.#renderPointList();
  }
}
