import axios from "axios";
import store from "../redux/store";
import { loginAction, logoutAction, registerAction } from "../redux/slicers/auth-slicer";
import config from "../utils/config";

class AuthServices {

  register = async (user) => {
    const response = await axios.post(config.urls.auth.register, user);
    const token = response.data;
    store.dispatch(registerAction(token));
    return token;
  };

  login = async (credentials) => {
    const response = await axios.post(config.urls.auth.login, credentials);
    const token = response.data;
    store.dispatch(loginAction(token));
    return token;
  };

  logout = () => {
    store.dispatch(logoutAction());
  };
};

export const authServices = new AuthServices();