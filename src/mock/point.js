import {getRandomInteger, typeName, generateDate, descriptions} from './mockData.js';
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
      offersArray: offersData,
      offers: offersData[i].offers,
      type: `${offersData[i].type}`,
      city: descriptions[getRandomInteger(0, descriptions.length - 1)],
      destinationDatas: newDestination[i].destinationData,
    };
  }

  return arrayPoint;
};


export const arrayPoints = generatePoint(typeName);
