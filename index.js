const express = require('express');
const bodyParse = require('body-parser');
const request = require('request');

const app = express();
app.use(bodyParse.urlencoded({
  extended: true
}));

app.use(express.static("public"));

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
      response.write("<body style='text-align: center; font-size:1.8rem;'>");//Added for mobile
      response.write("<p>The last updated date and time is: "+dateAndTime+" </p>");
      response.write("<h1>The Bitcoin price in " + curr + " is: " + price + " </h1>");
      response.write("<em><a href='https://www.coindesk.com'>Powered by coindesk</a></em>")
      response.write("</body>");
      response.send();

      //REQUEST, req
      //RESPONSE, res
      //conflict and overload can occur, careful!!
    });
});


app.listen(process.env.PORT || 3000, function() {
  console.log("Server is at port 3000");
});
//server listen on port 3000
