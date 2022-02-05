import dayjs from 'dayjs';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const generateDescription = () => {
  const descriptionsItem = [
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

  const randomIndex = getRandomInteger(0, descriptionsItem.length - 1);

  return descriptionsItem[randomIndex];
};

export const descriptions = [
  'Каир',
  'Афины',
  'Москва',
  'Мадрид',
  'Берлин',
  'Брест',
  'Челябинск',
  'Копейск',
  'Златоуст',
  'Кипр',
  'Тюмень',
  'Пермь',
];

export const typeName = [
  'flight',
  'bus',
  'train',
  'ship',
  'drive',
  'check-in',
  'sightseeing',
  'restaurant',
];

export const getRandomArrayElement = (elements) => {
  const newElement = elements[getRandomInteger(0, elements.length - 1)];

  return newElement;
};

export const getRandomElements = (array) => {
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

export const generateDate = (date) => {
  const maxDaysGap = 7;
  let daysGap = 0;

  if (date === 'to') {
    daysGap = getRandomInteger(1, maxDaysGap);
  } else if (date === 'from') {
    daysGap = getRandomInteger(1, -maxDaysGap);
  }

  return dayjs().add(daysGap, 'day').toDate();
};

export const dataFormater = (value, type) => {
  let data = '';

  if (type === 'MD') {
    data = dayjs(value).format('MMM D');
  } else if (type === 'D') {
    data = dayjs(value).format('D');
  } else if (type === 'YMD') {
    data = dayjs(value).format('YYYY-MM-DD');
  } else if (type === 'YMDH') {
    data = dayjs(value).format('YYYY-MM-DD HH:mm');
  } else if (type === 'Hm') {
    data= dayjs(value).format('HH:mm');
  }

  return data;
};

export const isTaskExpired = (dueDate) => {

  // const nowDataFormate = dataFormater(dayjs(), 'YMD');
  const dueDateFormate = dataFormater(dueDate, 'YMD');

  console.log(dueDateFormate);
  // console.log(dueDate);
  // console.log(dayjs(dueDate));
  // console.log(dayjs().isAfter(dueDate, 'D'));
  console.log(dayjs().isAfter('2022-01-16', 'D'));

  return dayjs().isBefore(dueDateFormate, 'D');
};
