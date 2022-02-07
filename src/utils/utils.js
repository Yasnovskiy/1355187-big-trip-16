import dayjs from 'dayjs';

import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const isTaskExpiringToday = (dueDate) => dayjs().isSameOrBefore(dueDate, 'D');

export const isTaskExpiringTodays = (dueDate) => dayjs().isSameOrAfter(dueDate, 'D');

export const arrValuePrice = (arr) => {
  const arrKey = [];
  const arrValue = [];

  const objectDesiredValue = {
    type: arrKey,
    price: arrValue,
  };

  arr.forEach((value, key) => {

    arrKey.push(key.toUpperCase());
    arrValue.push(value.price);

  });

  return objectDesiredValue;
};

export const arrValueCount = (arr) => {
  const arrKey = [];
  const arrValue = [];

  const objectDesiredValue = {
    type: arrKey,
    count: arrValue,
  };

  arr.forEach((value, key) => {

    arrKey.push(key.toUpperCase());
    arrValue.push(value.count);

  });

  return objectDesiredValue;
};


export const arrValueTime = (arr) => {
  const arrKey = [];
  const arrValue = [];

  const objectDesiredValue = {
    type: arrKey,
    time: arrValue,
  };

  arr.forEach((value, key) => {

    arrKey.push(key.toUpperCase());
    arrValue.push(value.time);

  });

  return objectDesiredValue;
};

export const formatDateTrip = (dateTo, dateFrom = 0) => {
  const dateToObjA = dayjs(dateTo);
  const dateFromObjA = dayjs(dateFrom);

  const diffDay = dateToObjA.diff(dateFromObjA, 'd');
  const diffHoures = dateToObjA.diff(dateFromObjA, 'h');
  const diffMinutes = dateToObjA.diff(dateFromObjA, 'm');

  let diffTime = '';

  if (diffDay > 0) {
    diffTime = `${Math.abs(diffDay)}D ${Math.abs(diffDay * 24 - diffHoures)}H ${Math.abs(diffHoures * 60 - diffMinutes)}M`;
  } else if (diffHoures > 0) {
    diffTime = `${Math.abs(diffHoures)}H ${Math.abs(diffHoures * 60 - diffMinutes)}M`;
  } else {
    diffTime = `${Math.abs(diffMinutes)}M`;
  }

  return diffTime;
};

export const timeSum = (dateTo, dateFrom) => {
  const dateToObjA = dayjs(dateTo);
  const dateFromObjA = dayjs(dateFrom);

  const diffDay = dateToObjA.diff(dateFromObjA);

  return diffDay;
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

export const newArrayValue = (points) => {
  const newData = new Map();

  points.forEach((point) => {
    if (!newData.has(point.type)) {
      newData.set(point.type, {
        count: 1,
        price: point.basePrice,
        time: timeSum(point.dateTo, point.dateFrom),
      });
      return;
    }

    const mapValue = newData.get(point.type);

    newData.set(point.type, {
      count: mapValue.count + 1,
      price: mapValue.price + point.basePrice,
      time: mapValue.time + timeSum(point.dateTo, point.dateFrom),
    });
  });

  return newData;
};
