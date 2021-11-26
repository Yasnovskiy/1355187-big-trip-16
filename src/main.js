import {createSiteMenuTemplate} from './view/site-menu-view.js';
import {createSiteFilterTemplate} from './view/site-filter-view.js';
import {createSiteCortTemplate} from './view/site-cort-view.js';
import {createSiteAddNewTemplate} from './view/site-add-new-view.js';
import {createSiteItemTemplate} from './view/site-item-view.js';

import {renderTemplate, RenderPosition} from './render.js';

const siteMainElement = document.querySelector('.trip-main');
const siteMenuElement = siteMainElement.querySelector('.trip-controls__navigation');
const siteFilterElement = siteMainElement.querySelector('.trip-controls__filters');

const siteItemElement = document.querySelector('.trip-events__list');

const TASK_COUNT = 3;

renderTemplate(siteMenuElement, createSiteMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteFilterElement, createSiteFilterTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteItemElement, createSiteCortTemplate(), RenderPosition.BEFOREBEGIN);
renderTemplate(siteItemElement, createSiteAddNewTemplate(), RenderPosition.AFTERBEGIN);


for (let i = 0; i < TASK_COUNT; i++) {
  renderTemplate(siteItemElement, createSiteItemTemplate(), RenderPosition.BEFOREEND);
}

