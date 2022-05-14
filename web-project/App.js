const express = require("express"); //we called library express using a keyword "required" it will called automaticaly from nodemodules
const app = express(); //called the express which we defined before
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.options("*", cors());

require("dotenv/config");
const api = process.env.API_URL;

const categoriesRouter = require("./routers/categories");
const treatmentsRouter = require("./routers/treatments");

//middleware
app.use(bodyParser.json()); //Da bi bekend razumeo json podatke koji se salju sa frontenda
app.use(morgan("tiny"));
app.use("/public/uploads", express.static(__dirname + "/public/uploads")); //69

//routers
app.use(`${api}/treatments`, treatmentsRouter);
app.use(`${api}/categories`, categoriesRouter);

//Conecting to the database
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "myFirstDatabase",
  })
  .then(() => {
    console.log("Database Connection in ready");
  })
  .catch((err) => {
    console.log(err);
  });

//Server
var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;
  console.log("Express working on port " + port);
});
