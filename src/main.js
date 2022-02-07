import { MenuItem } from './utils/const.js';
import { RenderPosition, render, remove } from './utils/render.js';

import SiteMenuView from './view/site-menu-view.js';
import SiteTripInfoView from './view/site-trip-info-view.js';
import StatisticsView from './view/statistics-view.js';

import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';

import FilterPresenter from './presenter/filter-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';

import ApiService from './api-service.js';

const AUTHORIZATION = 'Basic er803jyrzrqtw';
const END_POINT = 'https://16.ecmascript.pages.academy/big-trip';

const siteTripMain = document.querySelector('.trip-main');
const siteNavigationElement = siteTripMain.querySelector('.trip-controls__navigation');
const siteFilterElement = siteTripMain.querySelector('.trip-controls__filters');
const siteMainTripEvents = document.querySelector('.trip-events');

const filterModel = new FilterModel();
const pointsModel = new PointsModel(new ApiService(END_POINT, AUTHORIZATION));

const filterPresenter = new FilterPresenter(siteFilterElement, filterModel);
const tripPresenter = new TripPresenter(siteTripMain, siteMainTripEvents, pointsModel, filterModel, filterPresenter, filterPresenter);

const tripInfoComponent = new SiteTripInfoView(pointsModel.points);

const menuComponent = new SiteMenuView();

pointsModel.addObserver((type, points) => {
  tripInfoComponent.apdatePrice(points);
});

let statisticsComponent = null;

export const handleSiteMenuClick = (menuItem) => {

  switch (menuItem) {
    case MenuItem.TABLE:
      remove(statisticsComponent);

      filterPresenter.init();
      tripPresenter.init();
      tripPresenter.removeDisableBtn();

      break;
    case MenuItem.STATS:

      filterPresenter.destroy();
      tripPresenter.disableBtn();
      tripPresenter.destroy();

      statisticsComponent = new StatisticsView(pointsModel.points);

      render(siteMainTripEvents, statisticsComponent, RenderPosition.AFTEREND);
      break;
  }
};

tripPresenter.init();

pointsModel.init().finally(() => {
  render(siteTripMain, tripInfoComponent, RenderPosition.AFTERBEGIN);
  render(siteNavigationElement, menuComponent, RenderPosition.BEFOREEND);

  menuComponent.setMenuClickHandler(handleSiteMenuClick);

  filterPresenter.init();
});
