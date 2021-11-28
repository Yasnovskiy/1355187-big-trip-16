import {createSiteMenuTemplate} from './view/site-menu-view.js';
import {createSiteFilterTemplate} from './view/site-filter-view.js';
import {createSiteSortTemplate} from './view/site-sort-view.js';
import {createSiteAddNewTemplate} from './view/site-add-new-view.js';
import {createSiteEventTemplate} from './view/site-event-view.js';
import {createSiteEventsListTemplate} from './view/site-events-list-view.js';

import {renderTemplate, RenderPosition} from './render.js';

const main = document.querySelector('main');
const siteMainElement = document.querySelector('.trip-main');
const siteMenuElement = siteMainElement.querySelector('.trip-controls__navigation');
const siteFilterElement = siteMainElement.querySelector('.trip-controls__filters');

const TASK_COUNT = 3;

renderTemplate(siteMenuElement, createSiteMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteFilterElement, createSiteFilterTemplate(), RenderPosition.BEFOREEND);
renderTemplate(main, createSiteEventsListTemplate(), RenderPosition.BEFOREEND);

const siteItemElement = main.querySelector('.trip-events__list');

renderTemplate(siteItemElement, createSiteSortTemplate(), RenderPosition.BEFOREBEGIN);
renderTemplate(siteItemElement, createSiteAddNewTemplate(), RenderPosition.AFTERBEGIN);

for (let i = 0; i < TASK_COUNT; i++) {
  renderTemplate(siteItemElement, createSiteEventTemplate(), RenderPosition.BEFOREEND);
}

