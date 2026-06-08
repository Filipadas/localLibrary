const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// GET product add form.
router.get("/add", productController.product_add_get);

// POST product add form.
router.post("/add", productController.product_add_post);

// GET product list (default products page).
router.get(["/", "/list"], productController.product_list);

module.exports = router;
