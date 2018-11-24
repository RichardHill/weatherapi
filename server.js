var express = require("express"),
router = express.Router();
var bodyParser = require("body-parser");
var app = express();

var city = require('./api/routes/city.js');
var shortform = require('./api/routes/short_form.js');

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/',city);
app.use('/',shortform);

var server = app.listen(port, function () {
    console.log("app running on port.", server.address().port);
});