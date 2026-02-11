const express = require("express");
const app = express();

const route1 = require("./routes/url.route");
app.use(express.json());

app.use("/api", route1);



module.exports = app;