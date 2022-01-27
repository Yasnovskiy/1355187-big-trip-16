import dayjs from 'dayjs';

export const countTasksByColor = (tasks, color) => tasks.filter((task) => task.color === color).length;

export const countCompletedTaskInDateRange = (tasks, dateFrom, dateTo) =>
  tasks.reduce((counter, task) => {
    if (task.dueDate === null) {
      return counter;
    }
    // С помощью day.js проверям, сколько задач с дедлайном
    // попадают в диапазон дат
    if (
      dayjs(task.dueDate).isSame(dateFrom) ||
      dayjs(task.dueDate).isBetween(dateFrom, dateTo) ||
      dayjs(task.dueDate).isSame(dateTo)
    ) {
      return counter + 1;
    }
    return counter;
  }, 0);

