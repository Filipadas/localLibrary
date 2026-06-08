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

let Product;
try {
  Product = mongoose.model("Product", ProductSchema);
} catch (error) {
  // If mongoose fails, use mock
  const mockdb = require("../mockdb");
  Product = class {
    constructor(data) {
      this.data = data;
      this._id = data._id || null;
    }

    async save() {
      if (!this.data._id) {
        this.data._id = mockdb.products.length + 1;
        this.data.created_at = new Date();
      }
      mockdb.products.push({ ...this.data });
      return this;
    }

    static async find(query = {}) {
      return {
        sort: function(sortObj) {
          return {
            exec: async function() {
              let results = [...mockdb.products];
              const sortKey = Object.keys(sortObj)[0];
              const sortOrder = sortObj[sortKey];
              results.sort((a, b) => {
                if (sortOrder === -1) {
                  return new Date(b[sortKey]) - new Date(a[sortKey]);
                }
                return new Date(a[sortKey]) - new Date(b[sortKey]);
              });
              return results;
            }
          };
        }
      };
    }

    static async findById(id) {
      return mockdb.products.find(p => p._id == id);
    }
  };
}

module.exports = Product;
