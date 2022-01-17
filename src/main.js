import SiteAddNewTripView from './view/site-add-new-view.js';
import SiteEventsListView from './view/site-events-list-view.js';

import {render, RenderPosition} from './utils/render.js';
// import {generateMockData} from './mock/trip.js';
import {arrayPoints} from './mock/point.js';
// const newDestination = Array.from({length: arrayPoints.length}, generateMockData);

import TripPresenter from './presenter/trip-presenter';

const siteTripMain = document.querySelector('.trip-main');
const siteNavigationElement = siteTripMain.querySelector('.trip-controls__navigation');
const siteFilterElement = siteTripMain.querySelector('.trip-controls__filters');

const siteMainTripEvents = document.querySelector('.trip-events');

const boardPresenter = new TripPresenter(siteTripMain, siteNavigationElement, siteFilterElement, siteMainTripEvents);
boardPresenter.init(arrayPoints);

const eventsListComponent = new SiteEventsListView();

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
