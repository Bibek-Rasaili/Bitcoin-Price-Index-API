const express = require('express');
const bodyParse = require('body-parser');
const request = require('request');

const app = express();
app.use(bodyParse.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req, response) {
  var fiatCurrency = req.body.fiat; //gets the form option value via body-parser

  request('https://api.coindesk.com/v1/bpi/currentprice/' + fiatCurrency + '.json',
    function(err, res, body) {
      // console.log(err);
      // console.log('statusCode:', res.statusCode);

      var data = JSON.parse(body); //converts the JSON into JS Object
      var price = data.bpi;

      var dateAndTime = data.time.updateduk;

      var curr;
      // if (fiatCurrency === "CNY")
      //   curr = "Yuan"
      //using switch instead of if statement
      switch (fiatCurrency) {
        case "CNY":
          curr = "Yuan";
          price = price.CNY.rate_float;
          break;
        case "GBP":
          curr = "Pounds";
          price = price.GBP.rate_float;
          break;

        case "USD":
          curr = "Dollar";
          price = price.USD.rate_float;
          break;

        case "EUR":
          curr = "Euro";
          price = price.EUR.rate_float;
          break;

        default:
        console.log("Error has occured! check switch statement");
      }
      //in order to send multiple lines, use response.write
      //then response.send() works like an enter button/key
      response.write("<p>The current date is: "+dateAndTime+" </p>");
      response.write("<h1>The Bitcoin price in " + curr + " is: " + price + " </h1>");
      response.send();

      //REQUEST, req
      //RESPONSE, res
      //conflict and overload can occur, careful!!
    });
});


app.listen(3000, function() {
  console.log("Server is at port 3000");
});
//server listen on port 3000
