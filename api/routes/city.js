'use strict';

var express = require('express');
var router = express.Router();
var city_controller = require('../controllers/city');

  // Home page route.
router.get('/city', function (req, res) {

  let name = req.query.name;

  city_controller.search(name).then((response) => {
    res.status(200).send(response);
  })
  .catch((err) => {
    res.status(404).send("No matching city found");
  });
})

module.exports = router;

  