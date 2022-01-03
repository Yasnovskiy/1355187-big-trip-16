import SiteTripInfoView from './view/site-trip-info-view.js';
import SiteSortView from './view/site-sort-view.js';
import SiteMenuView from './view/site-menu-view.js';
import SiteFilterView from './view/site-filter-view.js';
import SiteAddNewTripView from './view/site-add-new-view.js';
import SiteEventView from './view/site-event-view.js';
import SiteEventsListView from './view/site-events-list-view.js';

import {render, RenderPosition} from './render.js';
// import {generateMockData} from './mock/trip.js';
import {arrayPoints} from './mock/point.js';

// const newDestination = Array.from({length: arrayPoints.length}, generateMockData);

const siteMain = document.querySelector('main');
const siteTripMainElement = document.querySelector('.trip-main');
const siteNavigationElement = siteTripMainElement.querySelector('.trip-controls__navigation');
const siteFilterElement = siteTripMainElement.querySelector('.trip-controls__filters');

const renderTrip = (taskListElement, task) => {
  const taskComponent = new SiteEventView(task);
  const taskEditComponent = new SiteAddNewTripView(task);

  const replaceTripToForm = () => {
    taskListElement.replaceChild(taskEditComponent.element, taskComponent.element);
  };

  const replaceFormToTrip = () => {
    taskListElement.replaceChild(taskComponent.element, taskEditComponent.element);
  };

  taskComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceTripToForm();
  });

  taskEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToTrip();
  });

  taskEditComponent.element.querySelector('.event__reset-btn').addEventListener('click', () => {
    replaceFormToTrip();
  });

  render(taskListElement, taskComponent.element, RenderPosition.BEFOREEND);
};

render(siteTripMainElement, new SiteTripInfoView().element, RenderPosition.AFTERBEGIN);
render(siteNavigationElement, new SiteMenuView().element, RenderPosition.BEFOREEND);
render(siteFilterElement, new SiteFilterView().element, RenderPosition.BEFOREEND);

const eventsListComponent = new SiteEventsListView();

render(siteMain, eventsListComponent.element, RenderPosition.BEFOREEND);
render(eventsListComponent.element, new SiteSortView().element, RenderPosition.BEFOREBEGIN);


for (let i = 0; i < arrayPoints.length; i++) {
  renderTrip(eventsListComponent.element, arrayPoints[i]);
}

const buttonNewEvent = document.querySelector('.trip-main__event-add-btn');

buttonNewEvent.addEventListener('click', () => {
  if (!buttonNewEvent.classList.contains('example')) {
    buttonNewEvent.classList.add('example');
    render(eventsListComponent.element, new SiteAddNewTripView(arrayPoints[0]).element, RenderPosition.AFTERBEGIN);
  } else {
    const newFormElement = document.querySelector('.trip-events__item--new');

    buttonNewEvent.classList.remove('example');
    newFormElement.remove();
  }
});
