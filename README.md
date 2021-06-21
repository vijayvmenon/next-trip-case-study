# Minneapolis Metro Transit Application

This is a Replica of Next Trip Application for Minneapolis Metro Transit @ https://www.metrotransit.org/nextrip . The UI is built with ReactJS and the Project also includes a small NodeJS application to access the API's locally.
The API documentation is available @ https://svc.metrotransit.org/nextrip

Note: The actual website now uses a newer version of the API starting with https://svc.metrotransit.org/nextripv2/{parameters} and I have used the same in my Application.

## Steps to run locally

1. Install NodeJS from the [Official Website](https://nodejs.org/en/download/)

2. Clone the git repository - `git clone https://github.com/vijayvmenon/next-trip-case-study.git`

3. Go to the Project directory and install the project dependencies - `npm install`

4. Start the application - `npm start`

The Application should now be running at http://localhost:3000/

## Run tests

`npm run test`

## Steps to run server ( if required )

The project includes a small nodeJS application in the **next-trip-server** directory. This server code is setup to avoid making frequent calls to the public next-trip API. In order to access the API endpoints from the local server , change as shown below in the UI Code:

In _src/utils.js_ :

```javascript
  try {
    const fetchResponse = await fetch(
      //`${constants.http.BASE_URL}/${url}`, //actual next-trip API's
      `${constants.http.BASE_URL_LOCAL}/${url}`, //local nodeJS API's
```

After maing above changes, do below steps:

1.  Go to the server directory _next-trip-server_

2.  Run `node index.js`

Now the server should be running at port 3002 and you should be able to access the local API's.

## Some notes regarding the Project

1.
2.
3.
