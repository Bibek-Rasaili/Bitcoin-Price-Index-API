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
  // console.log(req.body.crypto);
  var fiatCurrency = req.body.fiat;

  console.log(fiatCurrency);
  request('https://api.coindesk.com/v1/bpi/currentprice/' + fiatCurrency + '.json',
    function(err, res, body) {
      // console.log(err);
      // console.log('statusCode:', res.statusCode);

      var data = JSON.parse(body); //converts the JSON into JS Object

      var price = data.bpi;

      console.log(price);

      var curr;
      // if (fiatCurrency === "CNY")
      //   curr = "Yuan"

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
      }
      response.send("<h1>The Bitcoin price in " + curr + " is: " + price + " </h1>")

      //REQUEST, req
      //RESPONSE, res
      //THEY CAN CONFLICT and OVERLOAD!! CARE!
    });

});


app.listen(3000, function() {
  console.log("Server is at port 3000");
});
//server listen on port 3000
