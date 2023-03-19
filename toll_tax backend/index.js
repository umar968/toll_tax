require("dotenv").config({
  path: "./config.env",
});
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const dbConnect = require("./utils/DBConnect");

const tollRouter = require("./routers/tollRouter");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

dbConnect();

app.use("/api", tollRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
