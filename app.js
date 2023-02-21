const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { response } = require("express");

const app = express();

app.use(bodyParser());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  console.log("post request received");
  const city = req.body.cityName;
  const apikey = "4677a537552340c26e9d000bcfdfdf70";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apikey +
    "&units=metric";
  https.get(url, function (respo) {
    respo.on("data", function (data) {
      const wheatherData = JSON.parse(data);
      const temp = wheatherData.main.temp;
      res.write("the temperature in the " + city + " is " + temp);
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("server is running on the port 3000");
});
