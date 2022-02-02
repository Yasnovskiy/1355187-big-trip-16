import SiteAddNewTripView from '../view/site-add-new-view';
import SiteMenuView from '../view/site-menu-view.js';
import SiteTripInfoView from '../view/site-trip-info-view.js';
import { remove, render,  RenderPosition} from '../utils/render';

export default class MenuPresenter  {
  #siteTripMain = null;

  #tripInfoMenuComponent = null;

  #pointsModel = null;

  #points = [];

  constructor (siteTripMain, pointsModel) {
    this.#siteTripMain = siteTripMain;

    this.#pointsModel = pointsModel;
  }

  get points () {
    return this.#points;
  }

  init = () => {
    this.#points = this.#pointsModel.points;

    this.#tripInfoMenuComponent = new SiteTripInfoView(this.#points);

    this.#pointsModel.addObserver((type, points) => {
      this.#tripInfoMenuComponent.apdatePrice(points);
      console.log(points);
    });

    // this.#tripInfoMenuComponent.apdatePrice(this.#points);

    this.#renderInfo();

  }

  #renderInfo = () => {
    render(this.#siteTripMain, this.#tripInfoMenuComponent, RenderPosition.AFTERBEGIN);
  }
}

