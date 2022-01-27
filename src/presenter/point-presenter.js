import SiteEventView from '../view/site-event-view';
import SiteAddNewTripView from '../view/site-add-new-view';
import {render, RenderPosition, replace, remove} from '../utils/render';
import {UserAction, UpdateType} from '../utils/const';

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
    this.#pointEditComponent = new SiteAddNewTripView(point, true);

    this.#pointComponent.setFormOpenClickHandler(this.#handleEditClick);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    this.#pointEditComponent.setFormCloseClickHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setFormOpenClickHandler(this.#handleCloseFormClick);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    if (prevTaskComponent === null || prevTaskEditComponent === null) {
      render(this.#pointListContainer, this.#pointComponent, RenderPosition.BEFOREEND);
      return;
    }

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
      this.#pointEditComponent.reset(this.#point);
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
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToTrip();
    }
  }

  #handleEditClick = () => {
    this.#replaceTripToForm();
  }

  #handleCloseFormClick = () => {
    this.#pointEditComponent.reset(this.#point);
    this.#replaceFormToTrip();
  }

  #handleFormSubmit = (newData) => {
    this.#changeData(
      UserAction.UPDATE_TASK,
      UpdateType.MINOR,
      {...this.#point, ...newData}
    );
    this.#replaceFormToTrip();

  }

  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_TASK,
      UpdateType.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite}
    );
  }

  #handleDeleteClick = (task) => {
    this.#changeData(
      UserAction.DELETE_TASK,
      UpdateType.MINOR,
      task,
    );
  }
}
