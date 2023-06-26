class Config {
  urls = {
    auth: {
      register: "",
      login: ""
    },
    products: {
      fetchAllProducts: "",
      fetchProductsByCategoryId: ""
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
      removeProduct: "",
      addCategory: "",
      removeCategory: "",
      addSubCategory: "",
      removeSubCategory: ""
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
        fetchProductsByCategoryId: baseUrl + 'products/by-category-id/'
      },
      categories: {
        fetchAllCategories: baseUrl + 'categories/all',
        fetchOneCategory: baseUrl + 'categories/',
        fetchProductsByCategoryId: baseUrl + 'categories/products/all',
      },
      subCategories: {
        fetchAllSubCategories: baseUrl + 'categories/sub-categories/all',
        fetchOneSubCategory: baseUrl + 'categories/sub-category/',
        fetchSubCategoriesByCategoryId: baseUrl + 'categories/sub-categories/',
        fetchProductsByCategoryId: baseUrl + 'categories/products/all',
      },
      admin: {
        addProduct: baseUrl + 'admin/add-product',
        removeProduct: baseUrl + 'admin/remove-product/',
        addCategory: baseUrl + 'admin/add-category',
        removeCategory: baseUrl + 'admin/remove-category/',
        addSubCategory: baseUrl + 'admin/add-sub-category',
        removeSubCategory: baseUrl + 'admin/remove-sub-category/'
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
    super("https://k6u7v23xwh.execute-api.eu-central-1.amazonaws.com/api/");
  }
}
const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;