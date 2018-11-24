"use strict";

const Request = require("request");
const rp = require('request-promise');
const endpoints = require("../configuration/endpoints");

exports.search = (name) => {

  return rp(endpoints.cityid + name).then((response) => {

        //Pull out the woeid.
        if (!response || response === '[]') {
          throw('No matching city found');
        }

        const woeid = JSON.parse(response)[0].woeid;

        return rp(endpoints.day_weather + woeid).then((response) => {
          return response;
        })
        .catch((err) => {
          return res.status(404).send("No matching city found")
        })
   })
   .catch((err) => {
    throw('No matching city found');
   });
};