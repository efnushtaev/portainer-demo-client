import React, { useState, useEffect } from 'react';
import { formatDate } from './utils/format-date';

function App() {
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    const fetchTimestamp = () => {
      fetch('/api/getTimestamp')
        .then(response => response.json())
        .then(data => setTimestamp(data.timestamp))
        .catch(error => console.error('Error fetching timestamp:', error));
    };

    const fetchUsers = () => {
      fetch('/api/users')
        .then(response => response.json())
        .then(data => console.log('Users:', JSON.stringify(data)))
        .catch(error => console.error('Error fetching users:', error));
    };

    fetchTimestamp();
    fetchUsers()
    const interval = setInterval(fetchTimestamp, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Текущее время сервера:</h1>
      <p>{formatDate(timestamp) || 'Загрузка...'}</p>
    </div>
  );
}

export default App;