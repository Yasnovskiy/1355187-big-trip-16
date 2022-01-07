import {createElement} from '../render.js';

const createSiteEventsListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class SiteEventsListView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createSiteEventsListTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
