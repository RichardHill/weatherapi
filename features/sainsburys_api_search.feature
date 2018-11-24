Feature: Users need to be able to search for weather for a city

    Scenario: Search for weather for a valid city
        Given I want to search for the weather for a particular city
         When I provide a valid city
         Then I receive a response with the weather details for the requested city

    Scenario: Search for weather for an invalid city
        Given I want to search for the weather for a particular city
         When I provide an invalid city
         Then I receive a 404 response with the message "No matching city found"