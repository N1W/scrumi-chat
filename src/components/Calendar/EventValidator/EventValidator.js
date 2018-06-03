import moment from 'moment';
import _ from 'lodash';

const types = ['Событие', 'Стендап', 'Демо', 'Ретро', 'Дедлайн'];

function getEventsForPeriod(eventArray, start, end) {
  return _.filter(eventArray, o => (
    o.start.isBetween(
      moment(start).subtract(1, 'day'), moment(end).add(1, 'day'), 'day') ||
      o.end.isBetween(
        moment(start).subtract(1, 'day'), moment(end).add(1, 'day'), 'day')
));
}

function dateBetween(date, start, end) {
  return date.isBefore(end, 'minute') && date.isAfter(start, 'minute');
}

const EventValidator = function (event, eventArray) {
  const sprint = _.filter(eventArray, ['type', 4]);
  const startSprint = sprint.length > 0 ? sprint[0].start : null;
  const endSprint = sprint.length > 0 ? sprint[0].end : null;

  if (!event.title.match(/[\wа-я]+/ig)) {
    return {
      pass: false,
      error: 'Название события должно содержать хотя бы один символ',
      class: 'c-error-title',
    };
  }

  if (event.start.isBefore(moment(), 'minute') &&
    event.type !== 4) {
    return {
      pass: false,
      error: 'Дата начала события не может быть в прошлом',
      class: 'c-error-start',
    };
  }

  if (event.end.isBefore(moment(), 'minute')) {
    return {
      pass: false,
      error: 'Дата окончания события не может быть в прошлом',
      class: 'c-error-end',
    };
  }

  if (event.end.isBefore(event.start, 'minute')) {
    return {
      pass: false,
      error: 'Дата окончания события не может быть раньше даты начала события',
      class: 'c-error-end',
    };
  }
  if (event.type === 1 &&
    !event.start
      .isBetween(moment(startSprint).subtract(1, 'day'), moment(endSprint).add(1, 'day'), 'day')) {
    return {
      pass: false,
      error: 'Стендап может быть создан только в период спринта',
      class: 'c-error-start',
    };
  }
  if ([1, 2, 3].includes(event.type) && !event.start.isSame(event.end, 'day')) {
    return {
      pass: false,
      error: `${types[event.type]} не может быть больше одного дня`,
      class: 'c-error-end',
    };
  }
  if ([2, 3].includes(event.type) && !event.start.isSameOrAfter(endSprint, 'day')) {
    return {
      pass: false,
      error: `${types[event.type]} может быть только после окончания спринта`,
      class: 'c-error-start',
    };
  }

  // const closeEvents = getEventsForPeriod(eventArray, startSprint, endSprint);
  if (true) {
    let crossEvent = null;
    // объект для подсчета количества специальных событий на каждую дату
    const specialEventCount = {};

    // поочередное сравнение нового события со всеми событиями в календаре
    _.forEach(eventArray, (item) => {
      if (event.id === item.id) {
        return;
      }
      // начало существующего события из массива событий
      const start = (item.assign === 2) ?
        moment(item.start).startOf('day') : item.start;
      // окончание существующего события из массива событий
      const end = (item.assign === 2) ?
        moment(item.end).endOf('day') : item.end;
      // начало нового события
      const newStart = (event.assign === 2) ?
        moment(event.st7art).startOf('day') : event.start;
      // окончание нового события
      const newEnd = (event.assign === 2) ?
        moment(event.end).endOf('day') : event.assign === 1 ? event.start : event.end;
      // проверка, если существующее событие из массива - служебное
      if ([1, 2, 3].includes(item.type)) {
        // проверяем, есть ли служебные события в эту же дату, что и событие из массива.
        // если нет, то создаем ключ в объекте со значением массива из 3х элементов:
        // каждый элемент - количество служебных событий в текущей дате события из массива
        if (!(item.start.format('DD.MM.YYYY') in specialEventCount)) {
          specialEventCount[item.start.format('DD.MM.YYYY')] = [0, 0, 0];
        }
        // увеличиваем счетчик нужного служебного события на один в зависимости от типа
        specialEventCount[item.start.format('DD.MM.YYYY')][item.type - 1] =
          specialEventCount[item.start.format('DD.MM.YYYY')][item.type - 1] + 1;
        // console.log('item', item);
        // console.log('specialEventCount', specialEventCount);
      }
      // проверяем, если новое событие - служебное, и есть ли другие служебные события в эту дату
      if ([1, 2, 3].includes(item.type) &&
        event.start.format('DD.MM.YYYY') in specialEventCount) {
        // проверяем, есть ли служебные события в текущей дате события
        // console.log('specialEventCount[event.start.format]', specialEventCount[event.start.format('DD.MM.YYYY')]);
        _.forEach(specialEventCount[event.start.format('DD.MM.YYYY')],
          (specEvent, specIndex) => {
          // console.log('перебор служебных событий');
          // console.log('specEvent', specEvent);
          // console.log('specIndex', specIndex);
          // console.log('item', item);
          // console.log('event', event);
          // console.log('!event.id', !event.id);
          if (event.type === (specIndex + 1) &&
            specEvent > 0 &&
            (!event.id || !item.id ||
            event.id !== item.id)) {
            crossEvent = `Не может быть два события ${types[specIndex + 1]} в один день`;
          }
        });
      }


      // console.log('dates', start, end, newStart, newEnd);
      // console.log('dateBetween(newStart, start, end)', dateBetween(newStart, start, end));
      // console.log('dateBetween(newEnd, start, end)', dateBetween(newEnd, start, end));
      // console.log('start.isSame(newStart, "day")', start.isSame(newStart, 'day'));
      // console.log('end.isSame(newEnd, "day"")', end.isSame(newEnd, 'day'));
      let crossResult = true;
      // не сравниваем события спринта
      if (item.type !== 4 && event.type !==4 ) {
        // сравниваем событие с временем начала и окончания с событием, в котором указано время начала и время окончания
        if (event.assign === 0 &&
          item.assign === 0 &&
          ((event.start.isSameOrAfter(item.start, 'minute') &&
          event.start.isBefore(item.end, 'minute')) ||
          (event.end.isAfter(item.start, 'minute') &&
          event.end.isSameOrBefore(item.end, 'minute')))) {
          crossResult = false;
        }
        // сравниваем событие с временем начала, с событием, в котором есть время начала, но нет времени окончания
        if ([0, 1].includes(event.assign) &&
          item.assign === 1 &&
          event.start.isSame(item.start, 'minute')) {
          crossResult = false;
        }
        // сравниваем событие с временем начала с событием на весь день (или несколько дней)
        if ([0, 1].includes(event.assign) &&
          item.assign === 2 &&
          ((event.start.isSameOrAfter(item.start, 'day') &&
          event.start.isSameOrBefore(item.end, 'day')) ||
          (event.end.isSameOrAfter(item.start, 'day') &&
          event.end.isSameOrBefore(item.end, 'day')))) {
          crossResult = false;
        }
        // сравниваем событие только с временем начала с событием, у которого есть время начала и окончания
        if (event.assign === 1 &&
          item.assign === 0 &&
          event.start.isSameOrAfter(item.start, 'minute') &&
          event.start.isBefore(item.end, 'minute')) {
          crossResult = false;
        }

        // сравниваем событие на весь день с другими событиями
        if (event.assign === 2 &&
          ((event.start.isSameOrAfter(item.start, 'day') &&
          event.start.isSameOrBefore(item.end, 'day')) ||
          (event.end.isSameOrAfter(item.start, 'day') &&
          event.end.isSameOrBefore(item.end, 'day')))) {
          crossResult = false;
        }
      }

        if (!crossResult) {
        crossEvent = `В указанный промежуток времени уже существует событие ${item.title}`;
      }
      if (crossEvent) {
        return false;
      }
      return true;
    });
    if (crossEvent) {
      return {
        pass: false,
        error: crossEvent,
        class: 'c-error-start',
      };
    }
  }

  return {
    pass: true,
  };
};

export default EventValidator;
