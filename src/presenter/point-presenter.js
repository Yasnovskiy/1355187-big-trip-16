import SiteEventView from '../view/site-event-view.js';
import SiteAddNewTripView from '../view/site-add-new-view.js';
import {render, RenderPosition, replace, remove} from '../utils/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointerPresenter {
  #pointListContainer = null;
  #changeData = null;
  #changerMode = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;
  #mode = Mode.DEFAULT

  constructor(pointListContainer, changeData, changeMode) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
    this.#changerMode = changeMode;
  }

  init = (point) => {
    this.#point = point;

    const prevTaskComponent = this.#pointComponent;
    const prevTaskEditComponent = this.#pointEditComponent;

    this.#pointComponent = new SiteEventView(point);
    this.#pointEditComponent = new SiteAddNewTripView(point);

    this.#pointComponent.setFormOpenClickHandler(this.#handleEditClick);
    this.#pointEditComponent.setFormCloseClickHandler(this.#handleFormSubmit);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    if (prevTaskComponent === null || prevTaskEditComponent === null) {
      render(this.#pointListContainer, this.#pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevTaskComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevTaskEditComponent);
    }

    remove(prevTaskComponent);
    remove(prevTaskEditComponent);
  }

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToTrip();
    }
  }

  #replaceTripToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changerMode();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToTrip = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToTrip();
    }
  }

  #handleEditClick = () => {
    this.#replaceTripToForm();
  }

  #handleFormSubmit = () => {
    this.#replaceFormToTrip();
  }

  #handleFavoriteClick = () => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
  }
}
