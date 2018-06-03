export function request(data, type) {
  const fetchData = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'same-origin',
    body: `${type}=${JSON.stringify(data)}`,
  };

  return fetch('/ajax/calendar', fetchData)
    .then(response => response.json())
    .then((result) => {
      switch (type) {
        case 'create':
          data.id = result;
          break;
        case 'update':
          break;
        case 'delete':
          break;
        default:
          console.log('error');
          break;
      }
    })
    .catch((error) => {
      console.log('Fatal error', error);
    });
}
