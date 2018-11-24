Feature: Users need to be able to request particular forecast metrics

    Scenario: Specify forecast metric
        Given a request is made to the API
        When specific forecast metrics are provided in the request and any combination of weather metrics is provided
        Then only the provided weather metrics must be returned

    Scenario: Specify temperature format
        Given a request is made to the API
        When the "temperature format" is provided in the request and it is "C" or it is "F"
        Then correct temperature format for all temperatures in the forecast must be returned

    Scenario: Specify wind speed format
        Given a request is made to the API 
        When the "wind speed format" is provided in the request and it is "K" or it is "M"
        Then correct wind speed format kph or mph for all wind speeds in the forecast must be returned