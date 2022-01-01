import SiteTripInfoView from './view/site-trip-info-view.js';
import SiteSortView from './view/site-sort-view.js';
import SiteMenuView from './view/site-menu-view.js';
import SiteFilterView from './view/site-filter-view.js';
import SiteAddNewTripView from './view/site-add-new-view.js';
import SiteEventView from './view/site-event-view.js';
import SiteEventsListView from './view/site-events-list-view.js';

import {render, RenderPosition} from './render.js';
import {generateMockData} from './mock/trip.js';
import {arrayPoints} from './mock/point.js';

const TASK_COUNT = 3;

const newDestination = Array.from({length: TASK_COUNT}, generateMockData);

const siteMain = document.querySelector('main');
const siteTripMainElement = document.querySelector('.trip-main');
const siteNavigationElement = siteTripMainElement.querySelector('.trip-controls__navigation');
const siteFilterElement = siteTripMainElement.querySelector('.trip-controls__filters');

render(siteTripMainElement, new SiteTripInfoView().element, RenderPosition.AFTERBEGIN);
render(siteNavigationElement, new SiteMenuView().element, RenderPosition.BEFOREEND);
render(siteFilterElement, new SiteFilterView().element, RenderPosition.BEFOREEND);

const eventsListComponent = new SiteEventsListView();

render(siteMain, eventsListComponent.element, RenderPosition.BEFOREEND);
render(eventsListComponent.element, new SiteSortView().element, RenderPosition.BEFOREBEGIN);


for (let i = 0; i < arrayPoints.length; i++) {
  render(eventsListComponent.element, new SiteEventView(arrayPoints[i]).element, RenderPosition.BEFOREEND);
}

const buttonNewEvent = document.querySelector('.trip-main__event-add-btn');

buttonNewEvent.addEventListener('click', () => {
  if (!buttonNewEvent.classList.contains('example')) {
    buttonNewEvent.classList.add('example');
    render(eventsListComponent.element, new SiteAddNewTripView(newDestination).element, RenderPosition.AFTERBEGIN);
  } else {
    const newFormElement = document.querySelector('.trip-events__item--new');

    buttonNewEvent.classList.remove('example');
    newFormElement.remove();
  }
});
