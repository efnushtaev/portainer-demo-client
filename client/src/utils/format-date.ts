export function formatDate(isoString?: string) {
  if(!isoString) {
    return 'timestamp пустой'
  }
  const date = new Date(isoString);
  
  // Проверка валидности даты
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date string');
  }

  // Форматирование времени
  const time = date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  // Форматирование даты
  const day = date.getDate();
  const month = date.toLocaleString('ru-RU', { month: 'long' });
  const year = date.getFullYear();

  // Склонение месяца в родительный падеж
  const monthGenitive = month.slice(-1) === 'й' 
    ? month.slice(0, -1) + 'я'
    : month.slice(-1) === 'ь'
    ? month.slice(0, -1) + 'я'
    : month + 'а';

  return `${time}   ${day} ${monthGenitive} ${year}`;
}

// Пример использования
// console.log(formatDate('2025-10-23T20:13:48.203Z'));
// Результат: "20:13:48   23 октября 2025"