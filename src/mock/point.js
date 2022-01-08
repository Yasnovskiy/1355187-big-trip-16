import {getRandomInteger, typeName, generateDate} from './mockData.js';
import {nanoid} from 'nanoid';
import {offersData} from './offers.js';
import {generateMockData} from './trip.js';

const newDestination = Array.from({length: typeName.length}, generateMockData);

const generatePoint = (array) => {
  const arrayPoint = [];

  for (let i = 0; i < array.length; i++) {
    arrayPoint[i] = {
      basePrice: getRandomInteger(40, 250),
      dateFrom: generateDate('from'),
      dateTo: generateDate('to'),
      id: nanoid(),
      isFavorite: getRandomInteger(),
      offers: offersData[i].offers,
      type: `${offersData[i].type}`,
      destinationDatas: newDestination[i].destinationData,
    };
  }

  return arrayPoint;
};


export const arrayPoints = generatePoint(typeName);
