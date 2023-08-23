require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
var cookieParser = require("cookie-parser");
require("./config/db");
const userRouter = require("./routers/userRouter");
const productRouter = require("./routers/productRouter");

app.use("/public", express.static("public"));
// app.use("/public", express.static(__dirname + "/public"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    sameSite: "none",
  })
);

app.get("/", (req, res) => {
  res.send("Server running...");
});

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

app.listen(port, () => console.log(`Server running at ${port}`));
