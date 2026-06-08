// Mock database for development without MongoDB
const products = [];
let nextId = 1;

// Mock MongoDB-like interface
class MockSchema {
  constructor(schema) {
    this.schema = schema;
  }
}

class MockModel {
  constructor(data, name) {
    this.data = data;
    this.name = name;
    this._id = data._id || null;
  }

  async save() {
    if (!this.data._id) {
      this.data._id = nextId++;
      this.data.created_at = new Date();
    }
    const index = products.findIndex(p => p._id === this.data._id);
    if (index >= 0) {
      products[index] = this.data;
    } else {
      products.push({ ...this.data });
    }
    return this;
  }

  static async find(query = {}) {
    return {
      sort: function(sortObj) {
        return {
          exec: async function() {
            let results = [...products];
            const sortKey = Object.keys(sortObj)[0];
            const sortOrder = sortObj[sortKey];
            results.sort((a, b) => {
              if (sortOrder === -1) {
                return (b[sortKey] || 0) - (a[sortKey] || 0);
              }
              return (a[sortKey] || 0) - (b[sortKey] || 0);
            });
            return results;
          }
        };
      }
    };
  }

  static async findById(id) {
    return products.find(p => p._id == id);
  }
}

module.exports = {
  MockSchema,
  MockModel,
  Schema: MockSchema,
  products
};
