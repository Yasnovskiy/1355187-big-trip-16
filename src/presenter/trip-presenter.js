import SiteTripInfoView from '../view/site-trip-info-view.js';
import SiteMenuView from '../view/site-menu-view.js';
import SiteFilterView from '../view/site-filter-view.js';
import SiteSortView from '../view/site-sort-view';
import SiteEventsListView from '../view/site-events-list-view';

import PointerPresenter from './point-presenter';
import {render, updateItem, RenderPosition} from '../utils/render';
import {sortIdFormEvent, filterPointEvent} from '../utils/const';

export default class TripPresenter {
  #tripMain = null;
  #tripNavigation = null;
  #tripFilter = null;
  #tripContainer = null;

  #tripMenuComponent = new SiteMenuView();
  #tripFilterComponent = new SiteFilterView();
  #tripSortComponent = new SiteSortView();
  #tripListComponent = new SiteEventsListView();

  #tripsArray = [];
  #pointPresenter = new Map();

  #currentSortType = sortIdFormEvent.DEFAULT;
  #currentFilterPoint = filterPointEvent.FILTER_DEFAULT;

  #sourcedTripsArray= [];

  constructor (tripMain, tripNavigation, tripFilter, tripContainer) {
    this.#tripMain = tripMain;
    this.#tripNavigation = tripNavigation;
    this.#tripFilter = tripFilter;
    this.#tripContainer = tripContainer;
  }

  init = (tripArray) => {
    this.#tripsArray = [...tripArray];

    this.#sourcedTripsArray = [...tripArray];

    const tripInfoComponent = new SiteTripInfoView(this.#tripsArray);

    render(this.#tripMain, tripInfoComponent, RenderPosition.AFTERBEGIN);
    render(this.#tripNavigation, this.#tripMenuComponent, RenderPosition.BEFOREEND);

    this.#renderFilter();
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

  #sortIdFilter = (filterPoint) => {
    switch (filterPoint) {
      case (filterPointEvent.FILTER_FUTURE):
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

    this.#currentFilterPoint = filterPoint;
  }


  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortIdPoints(sortType);
    this.#clearPointList();
    this.#renderPointList();
  }

  #handlerFilterPointChange = (filterPoint) => {
    if (this.#currentFilterPoint === filterPoint) {
      return;
    }

    this.#sortIdFilter(filterPoint);
    this.#clearPointList();
    this.#renderPointList();
  }

  #renderFilter = () => {
    render(this.#tripFilter, this.#tripFilterComponent, RenderPosition.BEFOREEND);
    this.#tripFilterComponent.setFilterPointChangeHandler(this.#handlerFilterPointChange);
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
