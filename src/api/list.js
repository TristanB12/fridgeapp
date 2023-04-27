import axiosAPI from "./config";


const getAllLists = async (accessToken) => axiosAPI({
  method: "GET",
  url: "/lists",
  headers: { Authorization: 'Bearer ' +  accessToken},
  params: { status: 'present' }
});

const getOneList = async (accessToken, listId) => axiosAPI({
  method: "GET",
  url: "/lists/" + listId,
  headers: { Authorization: 'Bearer ' +  accessToken},
  params: { status: 'present' }
});

export {
  getAllLists,
  getOneList
}