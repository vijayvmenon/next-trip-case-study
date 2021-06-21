import React from 'react';
import constants from './constants';

export async function httpGet(url) {
  let response;
  let error;
  try {
    const fetchResponse = await fetch(
      // `${constants.http.BASE_URL}/${url}`, // actual next-trip API's
      `${constants.http.BASE_URL_LOCAL}/${url}`, // local nodeJS API's
      {
        header: {
          Accept: 'application/json',
        },
      },
    );
    if (!fetchResponse.ok) {
      const err = await fetchResponse.json();
      // eslint-disable-next-line no-console
      console.log(err); // keep this console.log to see the error in browser console
      throw err;
    }
    const result = await fetchResponse.json();
    response = result;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err); // keep this console.log to see the error in browser console
    /* The next trip API status code 400 with "title" and "type" properties
     means invalid parameters . Hence it is handled as a warning. */
    if (err?.status === 400 && err?.title && err?.type) {
      error = 'warning';
    }
    // All other error conditions are actual network errors and handled as actual errors
    else {
      error = err;
    }
  }
  return [response, error];
}

export function urlBuilder(array) {
  return array.map((val) => val.param).join('/');
}

export function checkIfUrlIsInByRouteFormat(url) {
  let result = false;
  const urlArray = url.split('/');
  if (url.indexOf('byRoute') !== -1) {
    if (urlArray.length === 5) {
      const route = Number(urlArray[2]);
      const validRoute = !Number.isNaN(route) && route >= 0 && route < 1000; // route_id is Number and between 0 and 1000
      const direction = Number(urlArray[3]);
      const validDirection =
        !Number.isNaN(direction) && direction >= 0 && direction < 10; // direction_id is number and between 0 and 10
      const re = /^[a-z0-9]/i;
      const validStop =
        re.test(urlArray[4]) &&
        urlArray[4].toString().length >= 1 &&
        urlArray[4].toString().length <= 4; // stop is Alpha-Numeric and has 1 to 4 letters/numbers
      if (validRoute && validDirection && validStop) {
        result = true;
      }
    }
  }
  if (result) {
    result = urlArray.slice(2).join('/'); // removing "byRoute" from url for API call
  }
  return result;
}

export function checkIfUrlIsInByStopFormat(url) {
  let result = false;
  const urlArray = url.split('/');
  if (url.indexOf('byStop') !== -1) {
    if (urlArray.length === 3) {
      const re = /^\d+$/;
      const validStop = re.test(urlArray[2]); // stop_id is any positive number - no decimal
      if (validStop) {
        result = true;
      }
    }
  }
  if (result) {
    result = urlArray.slice(2).join('/'); // removing "byRoute" from url for API call
  }
  return result;
}

export function snackbarType(type) {
  return {
    style: {
      backgroundColor: type === 'error' ? '#f44336' : '#ff9800',
      color: '#ffffff',
      fontSize: '1rem',
      textAlign: 'center',
    },
    closeStyle: {
      color: '#ffffff',
      fontSize: '1rem',
    },
  };
}

export function localStorageExists() {
  function lsTest() {
    const test = 'test';
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  if (lsTest() === true) {
    return true;
  }
  return false;
}

export function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
