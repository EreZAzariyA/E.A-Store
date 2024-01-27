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
      fetchAllOrders: "",
    },
    shoppingCart: {
      fetchUserShoppingCart: "",
      updateCartOrderDetails: "",
      addProductToCart: "",
      updateStockInCart: "",
      addProductToFavorites: "",
      removeProductFromCart: "",
      removeProductFromFavorites: "",
      resetCart: "",
    },
    order: {
      fetchUserOrders: "",
      createOrder: "",
      updateOrderStatus: ""
    },
    socket: ""
  };

  constructor(baseUrl, socketUrl) {
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
      shoppingCart: {
        fetchUserShoppingCart: baseUrl + 'shopping-carts/fetch-user-cart/',
        updateCartOrderDetails: baseUrl + 'shopping-carts/update-cart-order-details/',
        addProductToCart: baseUrl + 'shopping-carts/add-product-to-cart/',
        updateStockInCart: baseUrl + 'shopping-carts/update-product-stock-in-cart',
        addProductToFavorites: baseUrl + 'shopping-carts/add-product-to-favorites/',
        removeProductFromCart: baseUrl + 'shopping-carts/remove-product-from-cart/',
        removeProductFromFavorites: baseUrl + 'shopping-carts/remove-product-from-favorites/',
        resetCart: baseUrl + 'shopping-carts/reset-shopping-cart/'
      },
      order: {
        fetchUserOrders: baseUrl + 'orders/user-orders/',
        createOrder: baseUrl + 'orders/create-order',
        updateOrderStatus: baseUrl + 'orders/update-order-status'
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

        fetchAllOrders: baseUrl + 'admin/fetch-orders'
      },
      socket: socketUrl,
    }
  };
}

class DevelopmentConfig extends Config {
  constructor() {
    super("http://127.0.0.1:5000/api/", process.env.REACT_APP_SOCKET_URL);
  };
}

class ProductionConfig extends Config {
  constructor() {
    super(process.env.REACT_APP_BASE_URL, process.env.REACT_APP_SOCKET_URL);
  };
}

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();
export default config;