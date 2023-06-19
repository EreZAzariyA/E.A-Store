import axios from "axios";
import config from "../utils/config";
import store from "../redux/store";
import { AuthActions } from "../redux/actions";

class AuthServices {

  register = async (user) => {
    const response = await axios.post(config.urls.auth.register, user);
    const token = response.data;
    return token;
  };

  login = async (credentials) => {
    const response = await axios.post(config.urls.auth.login, credentials);
    const token = response.data;
    store.dispatch(AuthActions.login(token));
    return token;
  };

  logout = () =>{
    store.dispatch(AuthActions.logout());
  }
};

export const authServices = new AuthServices();