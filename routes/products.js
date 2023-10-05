const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getOneProduct,
  editProduct,
  deleteProduct,
  createProduct,
} = require("../controllers/products");

router.route("/").get(getAllProducts).post(createProduct);
router
  .route("/:productID")
  .get(getOneProduct)
  .patch(editProduct)
  .delete(deleteProduct);

module.exports = router;
