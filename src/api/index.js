import { signup, login } from "./auth";
import { getOneList } from "./list";
import { getAllLists } from "./list";
import { createProduct, getAllProducts, updateProduct } from "./product";
import { deleteAccount, getDashboard, linkDevice } from "./user";

export default {
  auth: {
    signup,
    login,
  },
  product: {
    getAll: getAllProducts,
    update: updateProduct,
    create: createProduct
  },
  user: {
    deleteAccount: deleteAccount,
    linkDevice: linkDevice,
    getDashboard: getDashboard
  },
  lists: {
    getAll: getAllLists,
    getOne: getOneList
  }
}