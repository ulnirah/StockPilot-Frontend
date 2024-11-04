
import Axios from "src/services/axios.js";
import { GET_PRODUCTS } from "store/actionType";

export function getProductAction() {
    return async (dispatch) => {
      try {
        const { data } = await Axios({
          url: `/api/products`,
          method: "GET",
        });

        console.log(data);
        
        dispatch({
          type: GET_PRODUCTS,
          payload: data,
        });
      } catch (error) {
        console.log(error);
      }
    };
}