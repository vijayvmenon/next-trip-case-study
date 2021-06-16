/* eslint-disable */
import constants from './constants';

export async function httpGet(url) {
  let response, error;
  try {
    const fetchResponse = await fetch(
      //`${constants.http.BASE_URL}/${url}`,   //actual
      `${constants.http.BASE_URL_LOCAL}/${url}`, //local
      {
        header: {
          Accept: 'application/json',
        },
      },
    );
    if (!fetchResponse.ok) {
      throw new Error('No Data Found');
    }
    const result = await fetchResponse.json();
    response = result;
  } catch (err) {
    console.log(err);
    error = err;
  }
  return [response, error];
}

export function urlBuilder(array) {
  return array.map((val) => val.param).join('/');
  // const routeParam = selectProperties.find((val) => val.id === ROUTE).param;
  // const directionParam = selectProperties.find(
  //   (val) => val.id === DIRECTION,
  // ).param;
  // const stopParam = selectProperties.find((val) => val.id === STOP).param;
}

export function checkIfUrlHasCorrectParams(url) {
  let result = false;
  const urlArray = url.split('/');
  if (url.indexOf('byRoute') !== -1) {
    if (urlArray.length === 5) {
      const route = Number(urlArray[2]);
      const validRoute = route !== NaN && route >= 0 && route < 1000; // route_id is Number and between 0 and 1000
      const direction = Number(urlArray[3]);
      const validDirection =
        direction !== NaN && direction >= 0 && direction < 10; //direction_id is number and between 0 and 10
      const re = /^[a-z0-9]{4}/i;
      const validStop = re.test(urlArray[4]); //stop is Alpha-Numeric and has 4 letters/numbers
      if (validRoute && validDirection && validStop) {
        result = true;
      }
    }
  }
  if (result) {
    console.log(urlArray);
    result = urlArray.slice(2).join('/'); //removing "byRoute" from url for API call
  }
  console.log(result);
  return result;
}
