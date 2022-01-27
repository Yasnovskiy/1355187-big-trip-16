// import {generateMockData} from './mock/trip.js';
// const newDestination = Array.from({length: arrayPoints.length}, generateMockData);

import {arrayPoints} from './mock/point.js';
import { MenuItem } from './utils/const.js';
import { RenderPosition, render, remove } from './utils/render.js';

import SiteMenuView from './view/site-menu-view.js';
import SiteTripInfoView from './view/site-trip-info-view.js';
import StatisticsView from './view/statistics-view.js';

import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';

import FilterPresenter from './presenter/filter-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';

const siteTripMain = document.querySelector('.trip-main');
const siteNavigationElement = siteTripMain.querySelector('.trip-controls__navigation');
const siteFilterElement = siteTripMain.querySelector('.trip-controls__filters');
const siteMainTripEvents = document.querySelector('.trip-events');

const filterModel = new FilterModel();
const pointsModel = new PointsModel();
pointsModel.points = arrayPoints;

const tripPresenter = new TripPresenter(siteTripMain, siteNavigationElement, siteMainTripEvents, pointsModel, filterModel);
const filterPresenter = new FilterPresenter( siteFilterElement, filterModel);

const tripInfoComponent = new SiteTripInfoView(arrayPoints);
const menuComponent = new SiteMenuView();

render(siteTripMain, tripInfoComponent, RenderPosition.AFTERBEGIN);
render(siteNavigationElement, menuComponent, RenderPosition.BEFOREEND);

let statisticsComponent = null;

// const handleTaskNewFormClose = () => {
//   // dfsd.element.querySelector(`[value=${MenuItem.TABLE}]`).disabled = false;
//   // dfsd.element.querySelector(`[value=${MenuItem.STATS}]`).disabled = false;
//   dfsd.setMenuItem(MenuItem.TABLE);
// };

const handleSiteMenuClick = (menuItem) => {

  switch (menuItem) {
    case MenuItem.ADD_POINT:
      console.log('ADAD');
      // Скрыть статистику
      // Показать фильтры
      // Показать доску
      // Показать форму добавления новой задачи
      // tripPresenter.createPoint(handleTaskNewFormClose);
      remove(statisticsComponent);

      filterPresenter.init();
      tripPresenter.init();
      break;
    case MenuItem.TABLE:
      remove(statisticsComponent);

      filterPresenter.init();
      tripPresenter.init();
      break;
    case MenuItem.STATS:
      filterPresenter.destroy();
      tripPresenter.destroy();

      statisticsComponent = new StatisticsView(pointsModel.points);
      render(siteMainTripEvents, statisticsComponent, RenderPosition.AFTEREND);
      break;
  }
};

menuComponent.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
tripPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});
