import axiosAPI from "./config";

const deleteAccount = async (accessToken) => axiosAPI({
  method: "DELETE",
  url: "/me",
  headers: { Authorization: 'Bearer ' +  accessToken},
})

const linkDevice = async (accessToken, notificationToken) => axiosAPI({
  method: 'POST',
  url: '/me/device',
  headers: { Authorization: 'Bearer ' +  accessToken},
  data: { notification_token: notificationToken }
})

const getDashboard = async (accessToken) => axiosAPI({
  method: 'GET',
  url: '/me/dashboard',
  headers: { Authorization: 'Bearer ' +  accessToken},
});

export {
  deleteAccount,
  linkDevice,
  getDashboard
}