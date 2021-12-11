import dayjs from 'dayjs';

const dataFormater = (value, type) => {
  let data = '';

  if (type === 'MD') {
    data = dayjs(value).format('MMM D');
  } else if (type === 'YMD') {
    data = dayjs(value).format('YYYY-MM-DD');
  } else if (type === 'YMDH') {
    data = dayjs(value).format('YYYY-MM-DD HH:mm');
  } else if (type === 'Hm') {
    data= dayjs(value).format('HH:mm');
  }

  return data;
};

const fsfs = (obj) => {
  console.log(obj);

  return ` ${obj.length > 0 ? `  <h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">
    ${obj.map(({id, title, price}) => `
      <li id=${id} class="event__offer">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </li>
   `).join('')}
   </ul>` : ''}`;

};

export const createSiteEventTemplate = (obj) => {
  const {basePrice, dateFrom, dateTo, id, isFavorite, offers, type} = obj;

  const classActive = isFavorite ? 'event__favorite-btn--active': '';

  return `<li id=${id} class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime=${dataFormater(dateFrom, 'YMD')}>${dataFormater(dateFrom, 'MD')}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} Amsterdam</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime=${dataFormater(dateFrom, 'YMDH')}>${dataFormater(dateFrom, 'Hm')}</time>
        &mdash;
        <time class="event__end-time" datetime=${dataFormater(dateTo, 'YMDH')}>${dataFormater(dateTo, 'Hm')}</time>
      </p>
      <p class="event__duration">30M</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
        ${fsfs(offers)}
    <button class="event__favorite-btn ${classActive}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
};
