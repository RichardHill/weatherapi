'use strict';

const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');
const assert = require('assert');
const rp = require('request-promise');

const correct_city   = 'http://localhost:3000/city/?name=london';
const incorrect_city = 'http://localhost:3000/city/?name=nowhere';
const specific_metrics = 'http://localhost:3000/short/?name=london&duration=6&metrics=weather_state_name&metrics=weather_state_abbr';
const weather_test_farenheit = 'http://localhost:3000/short/?name=london&duration=6&temperature_format=F';
const weather_test_celcius   = 'http://localhost:3000/short/?name=london&duration=6&temperature_format=C';
const speed_test_M = 'http://localhost:3000/short/?name=london&duration=6&wind_speed_format=M';
const speed_test_K = 'http://localhost:3000/short/?name=london&duration=6&wind_speed_format=K';
const short_call    = 'http://localhost:3000/short/?name=london&duration=1&type=short';
const length_test   = "http://localhost:3000/short/?name=london&duration=6";
const error_message  = 'No matching city found';

/* Generic Given for most feature files */ 
Given('I want to search for the weather for a particular city', function (callback) {
    this.city = null;
    callback();
  });
  
    When('I provide a valid city', function (callback) {
        this.city = 'london';
        callback();
    });

    Then('I receive a response with the weather details for the requested city', (callback) => {

        rp(correct_city).then((resp) => {
            const responseObject = JSON.parse(resp);
            assert(responseObject.title === 'London');
            callback();
        });

    });
    
    When('I provide an invalid city', (callback) => {
        this.city = 'nowhere';
        callback();
    });

    Then('I receive a {int} response with the message {string}', (int, string, callback) =>  {

        rp(incorrect_city).then((resp) => {
            //Not being called.
        })
        .catch((resp) => {
            assert(resp.toString().includes(error_message) === true);
            assert(resp.toString().includes('404'));
            callback();
        });
      });
      
Given('a request is made to the API',  (callback) => {
    // Write code here that turns the phrase above into concrete actions
    callback();
});

    When('specific forecast metrics are provided in the request and any combination of weather metrics is provided', (callback) =>  {
        this.theCall = specific_metrics;
        callback();
    });

    Then('only the provided weather metrics must be returned', (callback) => {
        rp(this.theCall).then((resp) => {
            const responseObject = JSON.parse(resp);
            assert(responseObject[0].weather_state_name.length > 0);
            assert(responseObject[0].weather_state_abbr.length > 0);
            callback();
        });
      });

      When('the {string} is provided in the request and it is {string} or it is {string}', (string, string2, string3, callback) => {
        this.theCall = null;

        switch(string){ 

            case 'temperature format': 
                this.theCall = weather_test_celcius;
                break;
            case 'wind speed format':
                this.theCall = speed_test_M;
                break;
        }
        if (string === 'temperature format')
        this.theCall = weather_test_celcius;
        callback();
      });

      Then('correct temperature format for all temperatures in the forecast must be returned', (callback) => {
        //How are we going to test a temperature is correct in celcius and farenheit! 
        
        rp(this.theCall).then((resp) => {
            const responseObject = JSON.parse(resp);

            //Calculate what we think the temperature will be when we ask for it in Celcuis.
            const expectedTemperature = ((responseObject[0].max_temp * 9) / 5 + 32);
            this.theCall = weather_test_farenheit;

            rp(this.theCall).then((resp2) => { 
                const responseObject2 = JSON.parse(resp2);
                assert(responseObject2[0].max_temp === expectedTemperature);
                callback();
            });
        });
      });

      Then('correct wind speed format kph or mph for all wind speeds in the forecast must be returned', (callback) => {
        rp(this.theCall).then((resp) => {
            const responseObject = JSON.parse(resp);

            //Calculate what we think the temperature will be when we ask for it in Celcuis.
            const expectedSpeed = ((responseObject[0].wind_speed * 1.609344));
            this.theCall = speed_test_K;

            rp(this.theCall).then((resp2) => { 
                const responseObject2 = JSON.parse(resp2);
                assert(responseObject2[0].wind_speed === expectedSpeed);
                callback();
            });
        });
      });
 
      When('{string} is provided in the request', (string,callback) => {
        this.theCall = short_call;
        callback();
      });

      Then('only the weather description, min, max and current temperatures are returned',  (callback) => {
        // Write code here that turns the phrase above into concrete actions
        rp(this.theCall).then((resp) => {
            const responseObject = JSON.parse(resp);

            assert(Object.keys(responseObject[0]).length === 4);
            assert(responseObject[0].hasOwnProperty('weather_state_name') === true);
            assert(responseObject[0].hasOwnProperty('min_temp') === true);
            assert(responseObject[0].hasOwnProperty('max_temp') === true);
            assert(responseObject[0].hasOwnProperty('the_temp') === true);

            callback();
        });
      });


      When('{string} is provided in the request and is less than {int} and greater than {int}', (string, int, int2,callback) => {
        
        this.theCall = length_test;
        callback();

      });

      Then('weather metrics for the specified number of days must be returned', (callback) => {
        
        rp(this.theCall).then((resp) => {
            const responseObject = JSON.parse(resp);
            assert(responseObject.length === 6);
            callback();
        });
      });