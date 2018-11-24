"use strict";

const Request = require("request");
const rp = require('request-promise');
const endpoints = require("../configuration/endpoints");

const MAX_DURATION = 7;
const CONVERSION_KPH = 1.609344;

exports.get = (name, number_of_days, type, metrics, temperature_format, wind_speed_format) => {

  return rp(endpoints.cityid + name).then((response) => {

        //Pull out the woeid.
        if (!response || response === '[]') {
          throw('');
        }

        const woeid = JSON.parse(response)[0].woeid;

        return rp(endpoints.day_weather + woeid).then((response) => {
            
            let resp_obj = JSON.parse(response);
            let results= [];

            //Early out - TODO - handle error states better.
            if (number_of_days === 0  || number_of_days > MAX_DURATION) throw('');
            if (typeof(number_of_days) == 'undefined') { number_of_days = 1; }

            //Loop over consolidated weather and take out what we need.
            for (let i = 0; i < number_of_days; i++) {
                if (type === 'short') {
                    let aSet = {
                        'weather_state_name' : resp_obj.consolidated_weather[i].weather_state_name,
                        'min_temp' : resp_obj.consolidated_weather[i].max_temp,
                        'max_temp' : resp_obj.consolidated_weather[i].min_temp,
                        'the_temp' : resp_obj.consolidated_weather[i].the_temp,
                    } 
                    results.push(aSet);
                } else if (typeof(metrics) !== 'undefined') {
                    let aSet = produce_results_set(resp_obj.consolidated_weather[i], metrics);
                    results.push(aSet);
                } else {
                    let aSet = resp_obj.consolidated_weather[i];
                    results.push(aSet); //Don't do anything and just return....
                }
            };

            results = processSpeedParameters(results, wind_speed_format);

            results = processTemperatureParameters(results, temperature_format);

            return results;
        })
        .catch((err) => {
          console.log('\n Failed when calling the day weather endpoint');
          return res.status(404).send("Error - city not found....");
        })
   })
   .catch((err) => {
    console.log('Failed when calling the shortform endpoint' + err);
    throw('No matching city found...');
   });
};


const produce_results_set = (results, metric) => {

    //Lets set up a dummy object - could cause problems in future.....
    //The better thing would be to create an empty object from results... TODO!!!
    let weather = {
        id: 0,
        weather_state_name:"",
        weather_state_abbr:"",
        wind_direction_compass:"",
        created:"",
        applicable_date:"",
        min_temp:0,
        max_temp:0,
        the_temp:0,
        wind_speed:0,
        wind_direction:0,
        air_pressure:0,
        humidity:0,
        visibility:0,
        predictability:0
    };

    if (typeof(metric) !== 'undefined')
    {
        //Match up properties we are specifically interested in.
        for (let property in weather) {
            for (let i=0; i < metric.length; i++) {
                const item = metric[i];
                if (item === property) {
                    let matched_value = results[property];
                    weather[property] = matched_value;
                }
            }
        }
    }

    return weather;
}

// Helper methods...
const processSpeedParameters = (results, speed) => {
    //Early out.
    if (typeof(speed) == 'undefined' || speed === 'M') return results;

    //Check to see if the need to convert the speed...
    for (let i=0; i < results.length; i++) {
        let item = results[i];
        item.wind_speed = convertMPHtoKPH(item.wind_speed);
    }
    return results;
}

const processTemperatureParameters = (results, temperature_format) => {
    //early out.
    if (typeof(temperature_format) === 'undefined' || temperature_format === 'C') return results;

    //Loop over and adjust the temperature.
    for (let i=0; i < results.length; i++) {
        let item = results[i];
        item.max_temp = convertCelciusToFarenheit(item.max_temp);
        item.min_temp = convertCelciusToFarenheit(item.min_temp);
        item.the_temp = convertCelciusToFarenheit(item.the_temp);
    }

    return results;
}

const convertMPHtoKPH = (speed) => {
    return speed * CONVERSION_KPH;
}

const convertCelciusToFarenheit = (temperature) => {
    return (temperature * 9 / 5 + 32);
}