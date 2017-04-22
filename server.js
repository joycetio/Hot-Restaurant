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

var waitlist = [{
  customerName: "Boris",
  phoneNumber: "4567899123",
  customerEmail: "greatlakes@gmail.com",
  customerID: 3
}, {
  customerName: "Grover",
  phoneNumber: "9876543222",
  customerEmail: "notsogreatlakes@gmail.com",
  customerID: 4
}];

// Routes
// =============================================================

// Home (home.html)
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Shows current and waitlist (tables.html)
app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

// Makes a reservation (reserve.html)
app.get("/make", function(req, res) {
  res.sendFile(path.join(__dirname, "make.html"));
});

// Search for all reservations - provides JSON
app.get("/api/:reservations?", function(req, res) {
  return res.json(reservations);
});

// Create New Reservation - takes in JSON input
app.post("/api/make", function(req, res) {
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
