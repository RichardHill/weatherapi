Feature: Users need to be able to request short-form weather or particular forecast metrics

    Scenario: Specify short-term weather request
        Given a request is made to the API
        When "short" is provided in the request 
        Then only the weather description, min, max and current temperatures are returned

    Scenario: Specify number of days
        Given a request is made to the API
        When "number of days" is provided in the request and is less than 7 and greater than 0
        Then weather metrics for the specified number of days must be returned