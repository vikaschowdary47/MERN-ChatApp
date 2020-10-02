const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Routes
const userRoute = require("./routes/user");

// middleware
app.use(cors());
app.use(express.json());

// mondo db
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to mongo database");
  }
);
mongoose.set("useCreateIndex", true);

// route middleware
app.use("/api/", userRoute);

PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});
