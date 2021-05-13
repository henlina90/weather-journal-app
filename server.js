const bodyParser = require("body-parser");
const cors = require("cors");

// Setup empty JS object to act as endpoint for all routes
const projectData = [];

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
app.get("/getData", function (req, res) {
  res.send(projectData);
});

app.post("/postData", function (req, res) {
  console.log(req.body);
  const newData = {
    temp: req.body.temp,
    date: req.body.date,
    content: req.body.content,
  };
  projectData.push(newData);
  res.send(projectData);
});
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 4000 || process.env.PORT;
const server = app.listen(port, () => {
  console.log(`running on localhost: ${port}`);
});
