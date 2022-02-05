import SiteAddNewTripView from '../view/site-add-new-view';
// import SiteBtnNewEventView from '../view/site-btn-new-event';
import { remove, render,  RenderPosition} from '../utils/render';
import { UserAction, UpdateType} from '../utils/const';

export default class NewPointPresenter  {
  #pointListContainer = null;
  #changeData = null;
  #pointEditComponent = null;

  #pointNewDisabled = null;

  constructor (pointListContainer, changeData) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
  }

  init = (metaData) => {
    if (this.#pointEditComponent) {
      return;
    }

    this.#pointEditComponent = new SiteAddNewTripView(metaData);
    this.#pointEditComponent.setFormCloseClickHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setFormOpenClickHandler(this.#handleDeleteClick);

    render(this.#pointListContainer, this.#pointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy = () => {
    // this.#pointNewDisabled.removeDisabled();

    if (this.#pointEditComponent === null) {
      return;
    }

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving = () => {
    this.#pointEditComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });

    // this.#pointNewDisabled.removeDisabled();
  }

  setAborting = () => {
    const resetFormState = () => {
      this.#pointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    // this.#pointNewDisabled.removeDisabled();
    this.#pointEditComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    // this.#pointNewDisabled.removeDisabled();
    this.#changeData(
      UserAction.ADD_TASK,
      UpdateType.MINOR,
      point,
    );
  }

  #handleDeleteClick = () => {
    this.destroy();
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      // this.#pointNewDisabled.removeDisabled();
      this.destroy();
    }
  }
}
