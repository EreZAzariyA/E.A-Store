class Config {
  urls = {
    auth: {
      register: "",
      login: ""
    },
    products: {
      fetchAllProducts: ""
    },
    categories: {
      fetchAllCategories: "",
      fetchOneCategory: "",
      fetchProductsByCategoryId: ""
    },
    subCategories: {
      fetchAllSubCategories: "",
      fetchOneSubCategory: "",
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
      auth: {
        register: baseUrl + 'auth/register',
        login: baseUrl + 'auth/login',
      },
      products: {
        fetchAllProducts: baseUrl + 'products/all',
      },
      categories: {
        fetchAllCategories: baseUrl + 'categories/all',
        fetchOneCategory: baseUrl + 'categories/',
        fetchProductsByCategoryId: baseUrl + 'categories/products/all',
      },
      subCategories: {
        fetchAllSubCategories: baseUrl + 'categories/sub-categories/all',
        fetchOneSubCategory: baseUrl + 'categories/sub-categories/',
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
    // super("http://localhost:5000/api/");
  }
}

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;