require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require("./db/connect");
const authRouter = require("./routes/authentication");
const errorHandler = require("./middlewares/error-handler");
const productsRouter = require("./routes/products");
const authorizationMiddleware = require("./middlewares/authorization");
app.use(express.json());

app.use("/api/v1/auth", authRouter);

app.use(authorizationMiddleware);
app.use("/api/v1/products", productsRouter);
app.use(errorHandler);
const start = async () => {
  try {
    await connectDB(process.env.DB_URI);
    app.listen(port, () => console.log(`server listening on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
