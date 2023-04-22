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

export {
  deleteAccount,
  linkDevice
}