const Product = require("../models/product");
const simpledb = require("../simpledb");

exports.product_add_get = async (req, res, next) => {
  res.render("products/add", { title: "Add Product" });
};

exports.product_add_post = async (req, res, next) => {
  try {
    // Try MongoDB first
    if (global.mongodbConnected) {
      const product = new Product({
        name: req.body.name,
        price: parseFloat(req.body.price) || 0,
        description: req.body.description,
      });

      await product.save();
      res.redirect("/products/list");
    } else {
      throw new Error("MongoDB not connected, using fallback");
    }
  } catch (err) {
    console.log("Using fallback database for add product");
    // Use fallback database
    try {
      await simpledb.addProduct({
        name: req.body.name,
        price: parseFloat(req.body.price) || 0,
        description: req.body.description,
      });
      res.redirect("/products/list");
    } catch (fallbackErr) {
      console.error("Fallback error:", fallbackErr);
      return next(fallbackErr);
    }
  }
};

exports.product_list = async (req, res, next) => {
  try {
    // Try MongoDB first
    if (global.mongodbConnected) {
      const products = await Product.find().sort({ created_at: -1 }).exec();
      res.render("products/list", { title: "Product List", products });
    } else {
      throw new Error("MongoDB not connected, using fallback");
    }
  } catch (err) {
    console.log("Using fallback database for list products");
    // Use fallback database
    try {
      const products = await simpledb.getProducts();
      res.render("products/list", { title: "Product List", products });
    } catch (fallbackErr) {
      console.error("Fallback error:", fallbackErr);
      return next(fallbackErr);
    }
  }
};
