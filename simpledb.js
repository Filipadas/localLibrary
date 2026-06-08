// Simple JSON-based database for when MongoDB is unavailable
const fs = require('fs');
const path = require('path');

const dbFile = path.join(__dirname, 'products.json');

function loadProducts() {
  try {
    if (fs.existsSync(dbFile)) {
      const data = fs.readFileSync(dbFile, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.log('Error loading products:', err);
  }
  return [];
}

function saveProducts(products) {
  try {
    fs.writeFileSync(dbFile, JSON.stringify(products, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving products:', err);
  }
}

class SimpleDB {
  constructor() {
    this.products = loadProducts();
    this.nextId = Math.max(0, ...this.products.map(p => p._id || 0)) + 1;
  }

  async addProduct(data) {
    const product = {
      _id: this.nextId++,
      ...data,
      created_at: new Date().toISOString(),
    };
    this.products.push(product);
    saveProducts(this.products);
    return product;
  }

  async getProducts() {
    // Sort by created_at descending
    return [...this.products].sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });
  }

  async getProductById(id) {
    return this.products.find(p => p._id == id);
  }
}

module.exports = new SimpleDB();
