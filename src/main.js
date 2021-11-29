import {createSiteTripInfoTemplate} from './view/site-trip-info-view.js';
import {createSiteMenuTemplate} from './view/site-menu-view.js';
import {createSiteFilterTemplate} from './view/site-filter-view.js';
import {createSiteSortTemplate} from './view/site-sort-view.js';
import {createSiteAddNewTemplate} from './view/site-add-new-view.js';
import {createSiteEventTemplate} from './view/site-event-view.js';
import {createSiteEventsListTemplate} from './view/site-events-list-view.js';

import {renderTemplate, RenderPosition} from './render.js';

const siteMain = document.querySelector('main');
const siteTripMainElement = document.querySelector('.trip-main');
const siteNavigationElement = siteTripMainElement.querySelector('.trip-controls__navigation');
const siteFilterElement = siteTripMainElement.querySelector('.trip-controls__filters');

const TASK_COUNT = 3;

renderTemplate(siteTripMainElement, createSiteTripInfoTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(siteNavigationElement, createSiteMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteFilterElement, createSiteFilterTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMain, createSiteEventsListTemplate(), RenderPosition.BEFOREEND);

const siteEventsListElement = siteMain.querySelector('.trip-events__list');

renderTemplate(siteEventsListElement, createSiteSortTemplate(), RenderPosition.BEFOREBEGIN);
renderTemplate(siteEventsListElement, createSiteAddNewTemplate(), RenderPosition.AFTERBEGIN);

for (let i = 0; i < TASK_COUNT; i++) {
  renderTemplate(siteEventsListElement, createSiteEventTemplate(), RenderPosition.BEFOREEND);
}

