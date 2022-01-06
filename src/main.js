import SiteTripInfoView from './view/site-trip-info-view.js';
import SiteSortView from './view/site-sort-view.js';
import SiteMenuView from './view/site-menu-view.js';
import SiteFilterView from './view/site-filter-view.js';
import SiteAddNewTripView from './view/site-add-new-view.js';
import SiteEventView from './view/site-event-view.js';
import SiteEventsListView from './view/site-events-list-view.js';

import {render, replace, RenderPosition} from './utils/render.js';
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
    replace(taskEditComponent, taskComponent);
  };

  const replaceFormToTrip = () => {
    replace(taskComponent, taskEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToTrip();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  taskComponent.setFormOpenClickHandler(() => {
    replaceTripToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  taskEditComponent.setFormCloseClickHandler(() => {
    replaceFormToTrip();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(taskListElement, taskComponent, RenderPosition.BEFOREEND);
};

render(siteTripMainElement, new SiteTripInfoView(), RenderPosition.AFTERBEGIN);
render(siteNavigationElement, new SiteMenuView(), RenderPosition.BEFOREEND);
render(siteFilterElement, new SiteFilterView(), RenderPosition.BEFOREEND);

const eventsListComponent = new SiteEventsListView();

render(siteMain, eventsListComponent, RenderPosition.BEFOREEND);
render(eventsListComponent, new SiteSortView(), RenderPosition.BEFOREBEGIN);

for (let i = 0; i < arrayPoints.length; i++) {
  renderTrip(eventsListComponent, arrayPoints[i]);
}

const buttonNewEvent = document.querySelector('.trip-main__event-add-btn');

buttonNewEvent.addEventListener('click', () => {
  if (!buttonNewEvent.classList.contains('example')) {
    buttonNewEvent.classList.add('example');
    render(eventsListComponent, new SiteAddNewTripView(arrayPoints[0]), RenderPosition.AFTERBEGIN);
  } else {
    const newFormElement = document.querySelector('.trip-events__item--new');

    buttonNewEvent.classList.remove('example');
    newFormElement.remove();
  }
});
