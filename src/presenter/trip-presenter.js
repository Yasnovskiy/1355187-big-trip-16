// import SiteTripInfoView from '../view/site-trip-info-view';
// import SiteMenuView from '../view/site-menu-view';
import SiteSortView from '../view/site-sort-view';
import SiteEventsListView from '../view/site-events-list-view';

import SiteBtnNewEventView from '../view/site-btn-new-event';
import SiteNoEventView from '../view/site-no-event-view';

import PointerPresenter from './point-presenter';
import NewPointPresenter from './new-point-presenter';
import { filter } from '../utils/filters';
import {render, remove, RenderPosition} from '../utils/render';
import { sortIdFormEvent, UpdateType, UserAction, FilterType } from '../utils/const';
import { dataFormater } from '../mock/mockData';

export default class TripPresenter {
  #tripMain = null;
  #tripNavigation = null;
  #tripContainer = null;

  #pointsModel = null;
  #filterModel = null;

  // #tripMenuComponent = new SiteMenuView();
  #tripBtnNewEvent = new SiteBtnNewEventView();
  #tripListComponent = new SiteEventsListView();
  #noPointComponents = null;

  #tripNewEventView = null;
  #tripSortComponent = null;

  #pointPresenter = new Map();
  #pointNewPresenter = null;

  #currentSortType = sortIdFormEvent.DEFAULT;
  #filterType = FilterType.EVERYTHING;

  constructor (tripMain, tripNavigation, tripContainer, pointsModel, filterModel) {
    this.#tripMain = tripMain;
    // this.#tripNavigation = tripNavigation;
    this.#tripContainer = tripContainer;

    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointNewPresenter = new NewPointPresenter(this.#tripListComponent ,this.#handleViewAction);

  }

  get points () {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filterPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case (sortIdFormEvent.DEFAULT):
        return filterPoints.sort((first, second) => {

          const dateFirst = Number(dataFormater(first.dateFrom, 'D'));
          const dateSecond = Number(dataFormater(second.dateFrom, 'D'));

          if (dateFirst < dateSecond) {
            return -1;
          }
          if (dateFirst > dateSecond) {
            return 1;
          }
          return 0;
        });
      case (sortIdFormEvent.DATE_PRICE):
        return filterPoints.sort((first, second) => {
          if (first.basePrice > second.basePrice) {
            return -1;
          }
          if (first.basePrice < second.basePrice) {
            return 1;
          }
          return 0;
        });
    }

    return filterPoints;
  }

  init = () => {
    // const tripInfoComponent = new SiteTripInfoView(this.#pointsModel.points);

    // render(this.#tripMain, tripInfoComponent, RenderPosition.AFTERBEGIN);
    // render(this.#tripNavigation, this.#tripMenuComponent, RenderPosition.BEFOREEND);

    this.#renderBtnNewEvent();
    this.#renderSort();

    render(this.#tripContainer, this.#tripListComponent, RenderPosition.BEFOREEND);

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#renderTrip();
  }

  destroy = () => {
    this.#clearPointList({resetSortType: true});

    remove(this.#tripListComponent);
    remove(this.#tripSortComponent);

    this.#pointsModel.removeObserver(this.#handleModelEvent);
    this.#filterModel.removeObserver(this.#handleModelEvent);
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenterItem) => presenterItem.resetView());
  }


  createPoint = () => {
    // this.#currentSortType = sortIdFormEvent.DEFAULT;
    // this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#pointNewPresenter.init();

    // this.#pointNewPresenter.setFormCloseClickHandler(this.#handleFormSubmit);
  }

  // #handlePointChange = (updatedTask) => {
  //   // this.#tripsArray = updateItem(this.#tripsArray, updatedTask);
  //   // this.#sourcedTripsArray = updateItem(this.#sourcedTripsArray, updatedTask);

  //   this.#pointPresenter.get(updatedTask.id).init(updatedTask);
  // }

  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);

    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this.#pointsModel.updateTrip(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this.#pointsModel.addTrip(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this.#pointsModel.deleteTrip(updateType, update);
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);

    // this.#currentSortType = sortIdFormEvent.DEFAULT;
    this.#handleSortTypeChange(sortIdFormEvent.DEFAULT);

    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // обновить список
        this.#clearPointList();
        this.#renderTrip();
        break;
      case UpdateType.MAJOR:
        // обновить всю страницу
        this.#clearPointList({resetSortType: true});
        this.#renderTrip();
        break;
    }
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    // this.#sortIdPoints(sortType);
    this.#currentSortType = sortType;
    this.#clearPointList();
    this.#renderTrip();
    this.#renderSort();
  }

  // #handlerFilterPointChange = (filterPoint) => {
  //   if (this.#currentFilterPoint === filterPoint) {
  //     return;
  //   }

  //   this.#clearPointList();
  //   this.#renderPointList();
  // }

  #handlerClickBtn = () => {
    // this.#tripNewEventView.setFormCloseClickHandler(this.#handleFormSubmit);
  }

  #handleFormSubmit = () => {
    remove(this.#pointNewPresenter);
    // console.log('Xt');
  }

  // #renderNoPoints = () => {
  //   this.#noPointComponents = new SiteNoEventView(this.#filterType);
  //   // render нужен
  // }

  #renderBtnNewEvent = () => {
    render(this.#tripMain, this.#tripBtnNewEvent, RenderPosition.BEFOREEND);

    this.#tripBtnNewEvent.setClickBtn();
  }

  #renderSort = () => {
    if (this.#tripSortComponent) {
      remove(this.#tripSortComponent);
    }

    this.#tripSortComponent = new SiteSortView(this.#currentSortType);

    this.#tripSortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#tripContainer, this.#tripSortComponent, RenderPosition.AFTERBEGIN);
  }

  #renderPoint = (trip) => {
    const pointPresenter = new PointerPresenter(this.#tripListComponent, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(trip);

    this.#pointPresenter.set(trip.id, pointPresenter);
  }

  #renderPoints = () => {
    this.points.forEach((point) => this.#renderPoint(point));
    console.log('RenderPoints',this.points);
  }

  #renderNoPoint = () => {
    this.#noPointComponents = new SiteNoEventView(this.#filterType);

    render(this.#tripListComponent, this.#noPointComponents, RenderPosition.AFTERBEGIN);
  }

  #clearPointList = ({resetSortType = false} = {}) => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    if (this.#noPointComponents) {
      remove(this.#noPointComponents);
    }

    if (resetSortType) {
      this.#currentSortType = sortIdFormEvent.DEFAULT;
    }
  }

  #renderPointList = () => {
    this.#renderPoints();
  }

  #renderTrip = () => {
    if  (this.points.length === 0) {
      this.#renderNoPoint();
      return;
    }

    this.#renderPointList();
  }
}
