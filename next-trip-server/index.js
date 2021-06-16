var express = require("express");
const cors = require("cors");
var routes = require("./routes.json");

var directions901 = require("./directions/directions901.json");
var directions902 = require("./directions/directions902.json");
var directions906 = require("./directions/directions906.json");
var directions903 = require("./directions/directions903.json");

var stops9010 = require("./stops/stops9010.json");
var stops9011 = require("./stops/stops9011.json");
var stops9020 = require("./stops/stops9020.json");
var stops9021 = require("./stops/stops9021.json");
var stops9060 = require("./stops/stops9060.json");
var stops9061 = require("./stops/stops9061.json");
var stops9030 = require("./stops/stops9030.json");
var stops9031 = require("./stops/stops9031.json");

var am349010 = require("./byRouteDepartures/9010AM34.json");
var blct9010 = require("./byRouteDepartures/9010BLCT.json");
var maam9010 = require("./byRouteDepartures/9010MAAM.json");
var tf19011 = require("./byRouteDepartures/9011TF1.json");
var tf29011 = require("./byRouteDepartures/9011TF2.json");
var ware9011 = require("./byRouteDepartures/9011WARE.json");
var tf19020 = require("./byRouteDepartures/9020TF1.json");
var tf29020 = require("./byRouteDepartures/9020TF2.json");
var ware9020 = require("./byRouteDepartures/9020WARE.json");
var cnst9021 = require("./byRouteDepartures/9021CNST.json");
var rost9021 = require("./byRouteDepartures/9021ROST.json");
var undp9021 = require("./byRouteDepartures/9021UNDP.json");
var apnb9030 = require("./byRouteDepartures/9030APNB.json");
var ce149030 = require("./byRouteDepartures/9030CE14.json");
var ce479030 = require("./byRouteDepartures/9030CE47.json");
var cgtr9030 = require("./byRouteDepartures/9030CGTR.json");
var maam9030 = require("./byRouteDepartures/9030MAAM.json");
var apsb9031 = require("./byRouteDepartures/9031APSB.json");
var ce149031 = require("./byRouteDepartures/9031CE14.json");
var ce479031 = require("./byRouteDepartures/9031CE47.json");
var cgtr9031 = require("./byRouteDepartures/9031CGTR.json");
var maam9031 = require("./byRouteDepartures/9031MAAM.json");
var hhte9060 = require("./byRouteDepartures/9060HHTE.json");
var lind9060 = require("./byRouteDepartures/9060LIND.json");
var hhte9061 = require("./byRouteDepartures/9061HHTE.json");
var lind9061 = require("./byRouteDepartures/9061LIND.json");
var sni59011 = require("./byRouteDepartures/90115SNI.json");
var sni59020 = require("./byRouteDepartures/90205SNI.json");
var av289010 = require("./byRouteDepartures/901028AV.json");
var ce109021 = require("./byRouteDepartures/902110CE.json");

var stop56334 = require("./byStopDepartures/56334.json");
var stop51434 = require("./byStopDepartures/51434.json");
var stop53494 = require("./byStopDepartures/53494.json");
var stop51435 = require("./byStopDepartures/51435.json");
var stop53280 = require("./byStopDepartures/53280.json");

var app = express();
app.get("/routes", cors(), (req, res, next) => {
  res.json(routes);
});

//directions
app.get("/directions/901", cors(), (req, res, next) => {
  res.json(directions901);
});
app.get("/directions/902", cors(), (req, res, next) => {
  res.json(directions902);
});
app.get("/directions/906", cors(), (req, res, next) => {
  res.json(directions906);
});
app.get("/directions/906", cors(), (req, res, next) => {
  res.json(directions906);
});
app.get("/directions/903", cors(), (req, res, next) => {
  res.json(directions903);
});

//Stops
app.get("/stops/901/0", cors(), (req, res, next) => {
  res.json(stops9010);
});
app.get("/stops/901/1", cors(), (req, res, next) => {
  res.json(stops9011);
});
app.get("/stops/902/0", cors(), (req, res, next) => {
  res.json(stops9020);
});
app.get("/stops/902/1", cors(), (req, res, next) => {
  res.json(stops9021);
});
app.get("/stops/906/0", cors(), (req, res, next) => {
  res.json(stops9060);
});
app.get("/stops/906/1", cors(), (req, res, next) => {
  res.json(stops9061);
});
app.get("/stops/903/0", cors(), (req, res, next) => {
  res.json(stops9030);
});
app.get("/stops/903/1", cors(), (req, res, next) => {
  res.json(stops9031);
});

//table for by Route Tab

app.get("/901/0/AM34", cors(), (req, res, next) => {
  res.json(am349010);
});
app.get("/901/0/BLCT", cors(), (req, res, next) => {
  res.json(blct9010);
});
app.get("/901/0/MAAM", cors(), (req, res, next) => {
  res.json(maam9010);
});
app.get("/901/1/TF1", cors(), (req, res, next) => {
  res.json(tf19011);
});
app.get("/901/1/TF2", cors(), (req, res, next) => {
  res.json(tf29011);
});
app.get("/901/1/WARE", cors(), (req, res, next) => {
  res.json(ware9011);
});
app.get("/902/0/TF1", cors(), (req, res, next) => {
  res.json(tf19020);
});
app.get("/902/0/TF2", cors(), (req, res, next) => {
  res.json(tf29020);
});
app.get("/902/0/WARE", cors(), (req, res, next) => {
  res.json(ware9020);
});
app.get("/902/1/CNST", cors(), (req, res, next) => {
  res.json(cnst9021);
});
app.get("/902/1/ROST", cors(), (req, res, next) => {
  res.json(rost9021);
});
app.get("/902/1/UNDP", cors(), (req, res, next) => {
  res.json(undp9021);
});
app.get("/903/0/APNB", cors(), (req, res, next) => {
  res.json(apnb9030);
});
app.get("/903/0/CE14", cors(), (req, res, next) => {
  res.json(ce149030);
});
app.get("/903/0/CE47", cors(), (req, res, next) => {
  res.json(ce479030);
});
app.get("/903/0/CGTR", cors(), (req, res, next) => {
  res.json(cgtr9030);
});
app.get("/903/0/MAAM", cors(), (req, res, next) => {
  res.json(maam9030);
});
app.get("/903/1/APSB", cors(), (req, res, next) => {
  res.json(apsb9031);
});
app.get("/903/1/CE14", cors(), (req, res, next) => {
  res.json(ce149031);
});
app.get("/903/1/CE47", cors(), (req, res, next) => {
  res.json(ce479031);
});
app.get("/903/1/CGTR", cors(), (req, res, next) => {
  res.json(cgtr9031);
});
app.get("/903/1/MAAM", cors(), (req, res, next) => {
  res.json(maam9031);
});
app.get("/906/0/HHTE", cors(), (req, res, next) => {
  res.json(hhte9060);
});
app.get("/906/0/LIND", cors(), (req, res, next) => {
  res.json(lind9060);
});
app.get("/906/1/HHTE", cors(), (req, res, next) => {
  res.json(hhte9061);
});
app.get("/906/1/LIND", cors(), (req, res, next) => {
  res.json(lind9061);
});
app.get("/901/1/5SNI", cors(), (req, res, next) => {
  res.json(sni59011);
});
app.get("/902/0/5SNI", cors(), (req, res, next) => {
  res.json(sni59020);
});
app.get("/901/0/28AV", cors(), (req, res, next) => {
  res.json(av289010);
});
app.get("/902/1/10CE", cors(), (req, res, next) => {
  res.json(ce109021);
});

//table for by stop tab
app.get("/56334", cors(), (req, res, next) => {
  res.json(stop56334);
});
app.get("/51434", cors(), (req, res, next) => {
  res.json(stop51434);
});
app.get("/53494", cors(), (req, res, next) => {
  res.json(stop53494);
});
app.get("/51435", cors(), (req, res, next) => {
  res.json(stop51435);
});
app.get("/53280", cors(), (req, res, next) => {
  res.json(stop53280);
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
