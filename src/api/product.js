import axiosAPI from "./config";


const getAllProduct = async (accessToken) => axiosAPI({
  method: "GET",
  url: "/product",
  headers: { Authorization: 'Bearer ' +  accessToken}
});

export {
  getAllProduct,
}