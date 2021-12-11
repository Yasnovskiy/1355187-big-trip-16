import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'hasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
  ];

  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

const generateName = () => {
  const descriptions = [
    'Италия',
    'Франция',
    'Испания',
    'Бельгия',
    'Германия',
  ];

  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

const typeName = [
  'flight',
  'bus',
  'train',
  'ship',
  'drive',
  'check-in',
  'sightseeing',
  'restaurant',
];

const getRandomArrayElement = (elements) => {
  const newElement = elements[getRandomInteger(0, elements.length - 1)];

  return newElement;
};

const getRandomElements = (array) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomArrayElement(array);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomArrayElement(array);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const generateOffers = (num) => {
  const arrayValue = [];

  for (let i = 0; i < num; i++) {
    arrayValue[i] = {
      id: i + 1,
      title: generateDescription(),
      price: getRandomInteger(40, 250),
    };
  }

  return arrayValue;
};

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

const generateDate = (date) => {
  const maxDaysGap = 7;
  let daysGap = 0;

  if (date === 'to') {
    daysGap = getRandomInteger(1, maxDaysGap);
  } else if (date === 'from') {
    daysGap = getRandomInteger(1, -maxDaysGap);
  }

  return dayjs().add(daysGap, 'hour').toDate();
};


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
      offers: generateOffers(getRandomInteger(0, 5)),
      type: `${generatePhotoId()}`,
    };
  }

  return arrayValue;
};

const generateOffer = (array) => {
  const generatePhotoId = getRandomElements(array);

  const arrayValue = [];

  for (let i = 0; i < array.length; i++) {
    arrayValue[i] = {
      type: `${generatePhotoId()}`,
      offers: generateOffers(getRandomInteger(0, 5)),
    };
  }

  return arrayValue;
};

const generateNewDestination = () => ({
  description: generateDescription(),
  name: generateName(),
  pictures: generatePictures(getRandomInteger(0, 5)),
});

export const generateMockData = () => ({
  destination: generateNewDestination(),
  offer: generateOffer(typeName),
});


export const arrayPoints = generatePoint(typeName);
