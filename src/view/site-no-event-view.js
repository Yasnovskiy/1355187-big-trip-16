import AbstractView from './abstract-view';

const createSiteNoEventTemplate = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class SiteNoEventView extends AbstractView {
  get template() {
    return createSiteNoEventTemplate();
  }
}
