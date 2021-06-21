# Minneapolis Metro Transit Application

This is a Replica of Next Trip Application for Minneapolis Metro Transit @ https://www.metrotransit.org/nextrip . The UI is built with ReactJS and the Project also includes a small NodeJS application to access the API's locally.
The API documentation is available @ https://svc.metrotransit.org/nextrip

Note: The actual website now uses a newer version of the API starting with https://svc.metrotransit.org/nextripv2/{parameters} and I have used the same in my Application.

## Steps to run locally

1. Install NodeJS from the [Official Website](https://nodejs.org/en/download/)

2. Clone the git repository - `git clone https://github.com/vijayvmenon/next-trip-case-study.git`

3. Go to the Project directory and install the project dependencies - `npm install`

4. Start the application - `npm start`

The Application should now be running at http://localhost:3000/next-trip-case-study

## Run tests

`npm test`

## Steps to run server ( if required )

The project includes a small nodeJS application in the **next-trip-server** directory. This server code is setup to avoid making frequent calls to the public next-trip API. In order to access the API endpoints from the local server , change as shown below in the UI Code:

In _src/utils.js_ :

```javascript
  try {
    const fetchResponse = await fetch(
      //`${constants.http.BASE_URL}/${url}`, //actual next-trip API's
      `${constants.http.BASE_URL_LOCAL}/${url}`, //local nodeJS API's
```

After making above changes, do below steps:

1.  Go to the server directory _next-trip-server_

2.  Run `node index.js`

Now the server should be running at port 3002 and you should be able to access the local API's.

## Some notes regarding the Project

1. The Application is setup in a base path of **"/next-trip-server-case-study"** , so that it works seamlessly in Github Pages and local.
2. Unit Tests have been written for most of the components to the best of my ability , as time permitted.
3. The actual Metro transit website calls the backend API to refresh the Departure times every 30 seconds. I have set this to 45 seconds , so as to reduce backend calls. This is configurable in the codebase.
4. Routing is setup using the [Wouter](https://github.com/molefrog/wouter) package. This is a minimal Routing Package for ReactJS and doesnt have the bundle size of other libraries like "react-router". This library sufficed for the requirements in this case study.
5. When the browser is refreshed and the URL is a valid URL with either the STOP_ID or a combination of Route/Direction/Stop_ID, the actual Metro Transit websote makes a backend call to load the departures. I have replicated the same logic here as well. I have written a custom function in **utils.js** which has the rules used for validating the URL.
6. I have used Snackbars/Toast messages for any network errors or if the URL parameters or search criteria are not valid.
7. Translations are implemented in Spanish and the value is stored in Local Storage to persist across sessions.
8. I did not feel a need to use a state management library and it is handled using a combination of useReducer and Context.
9. The application is hosted @ https://vijayvmenon.github.io/next-trip-case-study . It uses Github actions to trigger a build whenever a push is done to the repo.
