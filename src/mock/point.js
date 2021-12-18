import {getRandomInteger, typeName, getRandomElements, generateDate} from './mockData.js';
import {offersData} from './offers.js';

const generatePoint = (array) => {
  const generatePhotoId = getRandomElements(array);

  const arrayValue = [];

  for (let i = 0; i < array.length; i++) {
    arrayValue[i] = {
      basePrice: getRandomInteger(40, 250),
      dateFrom: generateDate('from'),
      dateTo: generateDate('to'),
      id: i + 1,
      isFavorite: getRandomInteger(),
      offers: offersData[i].offers,
      type: `${offersData[i].type}`,
    };
  }

  return arrayValue;
};


export const arrayPoints = generatePoint(typeName);
