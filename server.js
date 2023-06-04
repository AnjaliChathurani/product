const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

//import routes
const productRoutes = require("./routes/api/products");

const app = express();

// bodyparser middleware
app.use(bodyParser.json());
app.use(cors());

// // db config
const db = require("./config/keys").mongoURI;

// //CONNECT to mongo

mongoose
  .connect(db)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => console.log(err));

// // use routes
//app.use("/api/products", productRoutes);
app.use(productRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
