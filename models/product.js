var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  price: { type: Number, required: true, min: 0 },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
});

ProductSchema.virtual("url").get(function () {
  return "/products/" + this._id;
});

module.exports = mongoose.model("Product", ProductSchema);
