import {distanationData} from './destination.js';
import {offersData} from './offers.js';
import {descriptions} from './mockData.js';

export const generateMockData = () => ({
  destinationData: distanationData(descriptions),
  offer: offersData,
});

