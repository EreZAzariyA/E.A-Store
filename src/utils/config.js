class Config {
  urls = {
    auth: {
      register: "",
      login: ""
    },
    store: {
      products: "",
      categories: "",
      subCategories: "",
    },
    admin: {
      uploadImage: "",
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
      fetchUserShoppingCart: "",
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
  };

  constructor(baseUrl) {
    this.urls = {
      auth: {
        register: baseUrl + 'auth/register',
        login: baseUrl + 'auth/login',
      },
      store: {
        products: baseUrl + 'products/all',
        categories: baseUrl + 'categories/all',
        subCategories: baseUrl + 'sub-categories/all',
      },
      cart: {
        fetchUserShoppingCart: baseUrl + 'cart/fetch-user-cart/',
        addProductToCart: baseUrl + 'cart/add-product-to-cart/',
        updateStockInCart: baseUrl + 'cart/update-product-stock-in-cart',
        addProductToFavorites: baseUrl + 'cart/add-product-to-favorites/',
        removeProductFromCart: baseUrl + 'cart/remove-product-from-cart/',
        removeProductFromFavorites: baseUrl + 'cart/remove-product-from-favorites/',
        resetCart: baseUrl + 'cart/reset/'
      },
      admin: {
        uploadImage: baseUrl + 'admin/image-upload',

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
  };
};

class DevelopmentConfig extends Config {
  constructor() {
    super("http://127.0.0.1:5000/api/");
  };
};

class ProductionConfig extends Config {
  constructor() {
    super("https://k6u7v23xwh.execute-api.eu-central-1.amazonaws.com/api/");
  };
};

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();
export default config;