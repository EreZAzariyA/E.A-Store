import axios from "axios";
import store from "../redux/store";

class InterceptorsService {

  createInterceptors = () => {
    axios.interceptors.request.use((request) => {
      if(store.getState().auth?.token) {
        request.headers = {
          authorization: "Bearer " + store.getState().auth.token,
        };
      };
      return request;
    }, ((err) => {
      console.log(err);
    }));
  };
};

const interceptorsService = new InterceptorsService();
export default interceptorsService;