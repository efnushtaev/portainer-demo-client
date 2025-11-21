import { useState, useEffect } from 'react';
import { formatDate, getZhamLabel } from './utils';

function App() {
  const [timestamp, setTimestamp] = useState('');
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const fetchTimestamp = () => {
      fetch('/api/getTimestamp')
        .then(response => response.json())
        .then(data => {
          setTimestamp(data.timestamp)
        })
        .catch(error => console.error('Error fetching timestamp:', error));
    };

    fetchTimestamp();
    const interval = setInterval(fetchTimestamp, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchClicks = () => {
      fetch('/api/getCount')
        .then(response => response.json())
        .then(data => {
          setClickCount(data[0].count_value)
        })
        .catch(error => {
          console.error('Error fetching clicks:', error)
        });
    };

    fetchClicks()
  }, [])

  const handleOnClick = () => {
    fetch('/api/count/1', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json' // Указываем тип данных
      },
      body: JSON.stringify({ count: clickCount }) // Преобразуем объект в JSON-строку
    })
      .then(response => response.json())
      .then(data => setClickCount(data.count))
      .catch(error => {
        console.error('Error sending click:', error)
      });
  }

  return (
    <div className='wrapper'>
      <div>
        <h1>Время сервера:</h1>
        <p>{formatDate(timestamp) || 'Загрузка...'}</p>
        <div className='rotate-scale-up' />
      </div>
      <div>
        <div className="click-me" onClick={handleOnClick}>
          <h1>{clickCount}</h1>
          <h2>{getZhamLabel(clickCount)}</h2>
        </div>
      </div>
    </div>
  );
}

export default App;