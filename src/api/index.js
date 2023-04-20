import { signup, login } from "./auth";
import { createProduct, getAllProducts, updateProduct } from "./product";

export default {
  auth: {
    signup,
    login,
  },
  product: {
    getAll: getAllProducts,
    update: updateProduct,
    create: createProduct
  }
}