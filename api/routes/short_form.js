'use strict';

var express = require('express');
var router = express.Router();
var short_form_controller = require('../controllers/short_form');

  // Home page route.
router.get('/short', function (req, res) {

  //Tempted to use URLSearchParams support not wonderful and browsers not defined for this...
  let name  = req.query.name;
  let duration  = req.query.duration;
  let type = req.query.type;
  let metrics   = req.query.metrics;
  let temperature_format = req.query.temperature_format;
  let wind_speed_format = req.query.wind_speed_format;
  
  short_form_controller.get(name,duration, type, metrics, temperature_format, wind_speed_format).then((response) => {
    res.status(200).send(response);
  })
  .catch((err) => {
    res.status(404).send("No matching city found");
  });
})

module.exports = router;