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
