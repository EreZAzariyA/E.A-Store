class Config {
  urls = {
    auth: {
      register: "",
      login: ""
    },
    products: {
      fetchAllProducts: "",
      fetchProductsByCategoryId: "",
      fetchProductsBySubCategoryId: ""
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
      updateProduct: "",
      addCategory: "",
      removeCategory: "",
      updateCategory: "",
      addSubCategory: "",
      removeSubCategory: "",
      updateSubCategory: "",
    },
    cart: {
      fetchUserCart: "",
      fetchItemsFromUserCart: "",
      addProductToCart: "",
      updateStockInCart: "",
      addProductToFavorites: "",
      removeProductFromCart: "",
      removeProductFromFavorites: "",
      resetCart: "",
    },
    socket: {
      connect: "",
      disconnect: "",
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
        fetchProductsByCategoryId: baseUrl + 'products/by-category-id/',
        fetchProductsBySubCategoryId: baseUrl + 'products/by-sub-category-id/'
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
      cart: {
        fetchUserCart: baseUrl + 'cart/fetch-user-cart/',
        fetchItemsFromUserCart: baseUrl + 'cart/fetch-items-from-cart/',
        addProductToCart: baseUrl + 'cart/add-product-to-cart/',
        updateStockInCart: baseUrl + 'cart/update-product-stock-in-cart',
        addProductToFavorites: baseUrl + 'cart/add-product-to-favorites/',
        removeProductFromCart: baseUrl + 'cart/remove-product-from-cart/',
        removeProductFromFavorites: baseUrl + 'cart/remove-product-from-favorites/',
        resetCart: baseUrl + 'cart/reset/'
      },
      admin: {
        addProduct: baseUrl + 'admin/add-product',
        removeProduct: baseUrl + 'admin/remove-product/',
        updateProduct: baseUrl + 'admin/update-product',
        addCategory: baseUrl + 'admin/add-category',
        removeCategory: baseUrl + 'admin/remove-category/',
        updateCategory: baseUrl + 'admin/update-category',
        addSubCategory: baseUrl + 'admin/add-sub-category',
        removeSubCategory: baseUrl + 'admin/remove-sub-category/',
        updateSubCategory: baseUrl + 'admin/update-sub-category',
      },
      socket: {
        connect: baseUrl + 'socket/connect',
        disconnect: baseUrl + 'socket/disconnect'
      },
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