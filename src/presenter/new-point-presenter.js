import SiteAddNewTripView from '../view/site-add-new-view';
import { nanoid } from 'nanoid';
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

  init = () => {
    if (this.#pointEditComponent) {
      return;
    }

    this.#pointEditComponent = new SiteAddNewTripView();
    this.#pointEditComponent.setFormCloseClickHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setFormOpenClickHandler(this.#handleDeleteClick);

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

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_TASK,
      UpdateType.MINOR,
      {id: nanoid(), ...point},
    );

    this.destroy();
  }

  #handleDeleteClick = () => {
    this.destroy();
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }

}
