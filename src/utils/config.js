class Config {
  urls = {
    categories: {
      fetchAllCategories: ""
    },
    subCategories: {
      fetchAllSubCategories: "",
      fetchSubCategoriesByCategoryId: "",
    }
  }

  constructor(baseUrl) {
    this.urls = {
      categories: {
        fetchAllCategories: baseUrl + 'categories/all'
      },
      subCategories: {
        fetchSubCategoriesByCategoryId: baseUrl + 'categories/sub-categories/'
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