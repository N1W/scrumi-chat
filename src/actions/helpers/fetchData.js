export const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    // console.log(response);
    // console.log(response.status);
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

export const toJSON = response => response.json();

export const toConsole = (result) => {
  console.log(result);
};

export const handleError = (error) => {
  console.log(error);
};
