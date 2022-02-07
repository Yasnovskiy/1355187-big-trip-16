import SiteAddNewTripView from '../view/site-add-new-view';
import { remove, render,  RenderPosition} from '../utils/render';
import { UserAction, UpdateType} from '../utils/const';

export default class NewPointPresenter  {
  #pointListContainer = null;
  #changeData = null;
  #pointEditComponent = null;

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
    this.#pointEditComponent.setFormOpenClickHandler(this.#handleFormCancel);

    render(this.#pointListContainer, this.#pointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy = () => {
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

  }

  setAborting = () => {
    const resetFormState = () => {
      this.#pointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_TASK,
      UpdateType.MINOR,
      point,
    );
  }

  #handleFormCancel = () => {
    this.destroy();

    this.#changeData(
      UserAction.CANCEL_TASK,
    );
  }


  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }
}
