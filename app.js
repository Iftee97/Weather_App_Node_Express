// Open weather API key: 5c0d5815200b4a98bad5bafae254bcf5

const express = require("express"); // install with npm
const bodyParser = require("body-parser"); // install with npm
const https = require("https"); // this module does not need to be installed manually, it already comes with our node package

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apiKey = "5c0d5815200b4a98bad5bafae254bcf5";
    const unit = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;

    // from the https module:
    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            console.log(weatherData);

            const temp = weatherData.main.temp;
            console.log(`temperature: ${temp}`);

            const weatherDescription = weatherData.weather[0].description;
            console.log(`weather description: ${weatherDescription}`);

            const icon = weatherData.weather[0].icon;
            const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

            res.write(`<h1>The temperature in ${query} is: ${temp} degree celcius.</h1>`);
            res.write(`<p>The weather is currently: ${weatherDescription}</p>`);
            res.write(`<img src=${imageURL} alt="image-url" />`);
            res.send();
        });
    });
});

app.listen(3000, function () {
    console.log("Server started on port 3000 (localhost:3000)");
});
