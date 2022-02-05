import AbstractObservable from '../utils/abstract-observable';
import { UpdateType } from '../utils/const';

export default class PointsModel extends AbstractObservable {
  #apiService = null;
  #points = [];

  #destinations = [];
  #offers = [];

  constructor (apiService) {
    super();
    this.#apiService = apiService;
  }

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  init = async () => {
    try {
      const points = await this.#apiService.points;
      const destinations = await this.#apiService.destinations;
      const offers = await this.#apiService.offers;

      this.#destinations = destinations;
      this.#offers = offers;

      this.#points = points.map((point) => this.#adaptToClient(point, destinations, offers));


    } catch(err) {

      this.#points = [];

    }

    this._notify(UpdateType.INIT, this.#points);
  }

  updateTrip = async (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    try {
      const response = await this.#apiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response, this.#destinations, this.#offers);

      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType, this.#points);

    } catch(err) {

      throw new Error('Can\'t update task');

    }
  }

  addTrip = async (updateType, update) => {
    try {
      const respons = await this.#apiService.addPoint(update);
      const newPoint = this.#adaptToClient(respons, this.#destinations, this.#offers);

      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, this.#points);

    } catch(err) {

      throw new Error('Can\'t add task');

    }
  }

  deleteTrip = async (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    try {
      await this.#apiService.deletePoint(update);

      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType, this.#points);

    } catch(err) {

      throw new Error('Can\'t delete task');

    }
  }

  #adaptToClient = (point, destinations, offers) => {
    const adaptedTask = {...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'], // На клиенте дата хранится как экземпляр Date
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'], // На клиенте дата хранится как экземпляр Date
      isFavorite: point['is_favorite'],
      destinations: [...destinations],
      offerArray: [...offers],
    };

    delete adaptedTask['base_price'];
    delete adaptedTask['date_from'];
    delete adaptedTask['date_to'];
    delete adaptedTask['is_favorite'];

    return adaptedTask;
  }
}

