import { signup, login } from "./auth";
import { getAllProduct } from "./product";

export default {
  auth: {
    signup,
    login,
  },
  product: {
    getAll: getAllProduct
  }
}