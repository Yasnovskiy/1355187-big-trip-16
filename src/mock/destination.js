import {generateDescription, getRandomInteger, getRandomElements} from './mockData.js';

const generatePictures = (num) => {
  const arrayValue = [];

  for (let i = 0; i < num; i++) {
    arrayValue[i] = {
      src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 50)}`,
      description: generateDescription(),
    };
  }

  return arrayValue;
};

export const distanationData = (array) => {
  const generatePhotoId = getRandomElements(array);

  const arrayValue = [];

  for (let i = 0; i < array.length; i++) {
    arrayValue[i] = {
      city: generatePhotoId(),
      distanation: {
        description: generateDescription(),
        pictures: generatePictures(getRandomInteger(0, 5)),
      }
    };
  }

  return arrayValue;
};
