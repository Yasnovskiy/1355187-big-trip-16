import AbstractView from './abstract-view';

const createSiteLoadingTemplate = () => '<p class="trip-events__msg">Loading...</p>';

export default class SiteLoadingView extends AbstractView {
  get template() {
    return createSiteLoadingTemplate();
  }
}
