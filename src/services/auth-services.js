import axios from "axios";
import config from "../utils/config";
import store from "../redux/store";
import { login, logout, register } from "../redux/slicers/auth-slicer";

class AuthServices {

  register = async (user) => {
    const response = await axios.post(config.urls.auth.register, user);
    const token = response.data;
    store.dispatch(register(token));
    return token;
  };

  login = async (credentials) => {
    const response = await axios.post(config.urls.auth.login, credentials);
    const token = response.data;
    store.dispatch(login(token));
    return token;
  };

  logout = () => {
    store.dispatch(logout());
  }
};

export const authServices = new AuthServices();