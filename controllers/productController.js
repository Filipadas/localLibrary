const Product = require("../models/product");

exports.product_add_get = async (req, res, next) => {
  res.render("products/add", { title: "Add Product" });
};

exports.product_add_post = async (req, res, next) => {
  try {
    const product = new Product({
      name: req.body.name,
      price: parseFloat(req.body.price) || 0,
      description: req.body.description,
    });

    await product.save();
    res.redirect("/products/list");
  } catch (err) {
    return next(err);
  }
};

exports.product_list = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ created_at: -1 }).exec();
    res.render("products/list", { title: "Product List", products });
  } catch (err) {
    return next(err);
  }
};
