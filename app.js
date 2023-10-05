require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require("./db/connect");
const authRouter = require("./routes/authentication");
const errorHandler = require("./middlewares/error-handler");
const productsRouter = require("./routes/products");
const authorizationMiddleware = require("./middlewares/authorization");
const notFoundMiddleware = require("./middlewares/not-found");

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Products api");
});
app.use("/api/v1/auth", authRouter);

app.use(authorizationMiddleware);
app.use("/api/v1/products", productsRouter);
app.use(errorHandler);
app.use(notFoundMiddleware);
const start = async () => {
  try {
    await connectDB(process.env.DB_URI);
    app.listen(port, () => console.log(`server listening on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
