Sainsburys Interview Test
======================

* Node JS
     
server api
-----------
To run the code in your development environment:

1. Download and unpack
2. Run `npm install`
3. Start the development server for seed project with `npm run start`
4. Point your browser to [http://localhost:3000](http://localhost:3000)
5. Some test urls -:
        correct_city  = [http://localhost:3000/city/?name=london](http://localhost:3000/city/?name=london)
        incorrect_city = [http://localhost:3000/city/?name=nowhere](http://localhost:3000/city/?name=nowhere)
        specific_metrics = [http://localhost:3000/short/?name=london&duration=6&metrics=weather_state_name&metrics=weather_state_abbr](http://localhost:3000/short/?name=london&duration=6&metrics=weather_state_name&metrics=weather_state_abbr)
        weather_test_farenheit = [http://localhost:3000/short/?name=london&duration=6&temperature_format=F](http://localhost:3000/short/?name=london&duration=6&temperature_format=F)
        weather_test_celcius   = [http://localhost:3000/short/?name=london&duration=6&temperature_format=C](http://localhost:3000/short/?name=london&duration=6&temperature_format=C)
        speed_test_M = [http://localhost:3000/short/?name=london&duration=6&wind_speed_format=M](http://localhost:3000/short/?name=london&duration=6&wind_speed_format=M)
        speed_test_K = [http://localhost:3000/short/?name=london&duration=6&wind_speed_format=K](http://localhost:3000/short/?name=london&duration=6&wind_speed_format=K)
        short_call    = [http://localhost:3000/short/?name=london&duration=1&type=short](http://localhost:3000/short/?name=london&duration=1&type=short)
        length_test   = [http://localhost:3000/short/?name=london&duration=6](http://localhost:3000/short/?name=london&duration=6)

***********************************************

test
-----

`npm run test`

This will run the cucumber tests and produce a reports json file in 'testing\reporting\'

***********************************************

test-report
-----------

'npm run testreport'

This will display the output from the tests.


Notes -:

1. I am not overly happy with the tests for the temperature and speed -I think that they could be improved by extending the API such that I get an historically known temperature and speed. Using that as a known value, then do the comparison. As it is the solution involves pulling in the conversion methods into the test which I wasn't overly happy with.

2. I enjoyed the test - however I think it could be improved by showing some concrete examples of the response that are expected for a given request as I felt there was some abiguity - especially around the metrics.

3. I couldn't remember how to configure Cucumber to look in to other directories for certain files so the top level directories are a little more polluted than I would like.

4. Timing wise, the test took me about 4 nights of post work development to complete. I was familiar with most of the work required but I was rusty on BDD Cucumber and also the reporting although the reporting came together faster than I expected once I understood the steps required to set it up.

5. To improve this test it would be good if there was some sort of pairing involved with someone from Sainsburys. In my experience a test tells you a small part about a developer and that a small pairing test with a developer reveals an awful lot more about them. For example at my first company - a Virtual Reality company in the 90's - we had a reverse array test that we did with the developer and we paired on it. It was incredibly enlightening as to whether or not the developer would be a good fit to the team but also it gave an insight into how they worked and their breadth and depth on knowlege. I could go on!!! :) 

6. I hope you like what you see and I'd welcome the chance to work at Sainsburys PLC



******************************************************************