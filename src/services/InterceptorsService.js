import axios from "axios";
import store from "../redux/store";
import { getError } from "../utils/helpers";
import { AuthActions } from "../redux/actions";
import { message } from "antd";

class InterceptorsService {

  createInterceptors = () => {
    axios.interceptors.request.use((request) => {
      if(store.getState().authReducer?.token) {
        request.headers = {
          authorization: "Bearer " + store.getState().authReducer.token,
        };
      };
      return request;
    }, ((err) => {
      console.log(err);
    }));

    axios.interceptors.response.use((response) => {
      const token = response.headers?.get('authorization');
      if (token) {
        store.dispatch(AuthActions.refreshToken(token));
      }
      return response;
    }, (error) => {
      if (error.response.status === 401) {
        store.dispatch(AuthActions.logout());
      }
      message.error(getError(error));
    });
  };
};

const interceptorsService = new InterceptorsService();

export default interceptorsService;

