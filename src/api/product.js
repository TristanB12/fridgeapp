import axiosAPI from "./config";


const getAllProducts = async (accessToken) => axiosAPI({
  method: "GET",
  url: "/product",
  headers: { Authorization: 'Bearer ' +  accessToken},
  params: { status: 'present' }
});

const updateProduct = async (accessToken, productId, dto) => axiosAPI({
  method: "PUT",
  url: "/product/" + productId,
  headers: { Authorization: 'Bearer ' +  accessToken},
  data: dto
});

const createProduct = async (accessToken, dto) => axiosAPI({
  method: "POST",
  url: "/product",
  headers: { Authorization: 'Bearer ' +  accessToken},
  data: dto
});

export {
  getAllProducts,
  updateProduct,
  createProduct
}