import AbstractView from './abstract-view';

const createSiteEventsListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class SiteEventsListView extends AbstractView {
  get template() {
    return createSiteEventsListTemplate();
  }
}

