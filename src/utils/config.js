class Config {
  urls = {
    products: {
      fetchAllProducts: ""
    },
    categories: {
      fetchAllCategories: "",
      fetchProductsByCategoryId: ""
    },
    subCategories: {
      fetchAllSubCategories: "",
      fetchSubCategoriesByCategoryId: "",
      fetchProductsBySubCategoryId: ""
    },
    admin: {
      addProduct: "",
      addCategory: ""
    }
  }

  constructor(baseUrl) {
    this.urls = {
      products: {
        fetchAllProducts: baseUrl + 'products/all',
      },
      categories: {
        fetchAllCategories: baseUrl + 'categories/all',
        fetchProductsByCategoryId: baseUrl + 'categories/products/all',
      },
      subCategories: {
        fetchAllSubCategories: baseUrl + 'categories/sub-categories/all',
        fetchSubCategoriesByCategoryId: baseUrl + 'categories/sub-categories/',
        fetchProductsByCategoryId: baseUrl + 'categories/products/all',
      },
      admin: {
        addProduct: baseUrl + 'admin/add-product',
        addCategory: baseUrl + 'admin/add-category',

      }
    }
  }
}

class DevelopmentConfig extends Config {
  constructor() {
    super("http://localhost:5000/api/");
  }
}

class ProductionConfig extends Config {
  constructor() {
    super("https://ea-store.herokuapp.com/api/");
  }
}

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;