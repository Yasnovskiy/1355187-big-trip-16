import {getRandomInteger, typeName, generateDate} from './mockData.js';
import {offersData} from './offers.js';

const generatePoint = (array) => {
  const arrayPoint = [];

  for (let i = 0; i < array.length; i++) {
    arrayPoint[i] = {
      basePrice: getRandomInteger(40, 250),
      dateFrom: generateDate('from'),
      dateTo: generateDate('to'),
      id: i + 1,
      isFavorite: getRandomInteger(),
      offers: offersData[i].offers,
      type: `${offersData[i].type}`,
    };
  }

  return arrayPoint;
};


export const arrayPoints = generatePoint(typeName);
