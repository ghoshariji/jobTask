const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
require("dotenv").config();
// db-conn
const db = require("./config/dbConn");

// server static file

app.use("/upload", express.static("uploads"));

const PORT = 5000;

// Body parser middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// api call

const userRoute = require("./routes/userRoute");

app.use("/v1/api/auth", userRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
