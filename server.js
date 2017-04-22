// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// =============================================================
var reservations = [{
  customerName: "Hubert",
  phoneNumber: "1234567899",
  customerEmail: "howdy@gmail.com",
  customerID: 1
}, {
  customerName: "Qbert",
  phoneNumber: "9876543211",
  customerEmail: "sunshine@gmail.com",
  customerID: 2
}
];

// Routes
// =============================================================

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// Search for Specific reservation (or all reservations) - provides JSON
app.get("/api/:characters?", function(req, res) {
  var chosen = req.params.reservations;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < reservations.length; i++) {
      if (chosen === reservations[i].routeName) {
       return res.json(reservations[i]);
      }
    }
    return res.json(false);
  }
  return res.json(reservations);
});

// Create New Reservation - takes in JSON input
app.post("/api/new", function(req, res) {
  var newreservation = req.body;
  newreservation.routeName = newreservation.name.replace(/\s+/g, "").toLowerCase();

  console.log(newreservation);

  reservations.push(newreservation);

  res.json(newreservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
