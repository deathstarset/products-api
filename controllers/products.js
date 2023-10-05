const asyncMiddleware = require("../middlewares/async");
const Product = require("../models/Product");
const { BadRequest, NotFoundErr } = require("../errors/index");
const getAllProducts = asyncMiddleware(async (req, res, next) => {
  const userID = req.user;
  const products = await Product.find({ createdBy: userID });
  res.status(200).json({ products, count: products.length });
});

const createProduct = asyncMiddleware(async (req, res, next) => {
  const userID = req.user;
  const { name, price, category, description } = req.body;
  if (name === "" || price === "" || category === "" || description === "") {
    next(new BadRequest("Please fill all the fields"));
  }
  const product = await Product.create({ createdBy: userID, ...req.body });
  res.status(200).json({ product });
});
const getOneProduct = asyncMiddleware(async (req, res, next) => {
  const userID = req.user;
  const { productID } = req.params;
  const product = await Product.findOne({ createdBy: userID, _id: productID });
  if (!product) {
    return next(
      new NotFoundErr(`there is not product with the id ${productID}`)
    );
  }
  res.status(200).json({ product });
});
const editProduct = asyncMiddleware(async (req, res, next) => {
  const userID = req.user;
  const { productID } = req.params;
  const product = await Product.findOneAndUpdate(
    {
      createdBy: userID,
      _id: productID,
    },
    { ...req.body },
    { runValidators: true, new: true }
  );
  if (!product) {
    return next(
      new NotFoundErr(`There is no product with the id ${productID}`)
    );
  }
  res.status(200).json({ product });
});

const deleteProduct = asyncMiddleware(async (req, res, next) => {
  const userID = req.user;
  const { productID } = req.params;
  const product = await Product.findOneAndDelete({
    createdBy: userID,
    _id: productID,
  });

  if (!product) {
    return next(
      new NotFoundErr(`There is no product with the id ${productID}`)
    );
  }
  res.send("product deleted");
});

module.exports = {
  getAllProducts,
  getOneProduct,
  editProduct,
  deleteProduct,
  createProduct,
};
