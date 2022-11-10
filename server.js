var express = require("express");
var app = express();

app.use(express.static(__dirname + "/build"));

app.get("/", (req, res) => {
  res.sendFile("build/index.html");
});

app.listen(3001, "0.0.0.0", () => {
  console.log("Server is running : port 3001");
});
