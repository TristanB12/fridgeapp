import axiosAPI from "./config";


const login = async (dto) => axiosAPI({
  method: "POST",
  url: "/auth/login",
  data: dto,
});

const signup = async (dto) => axiosAPI({
  method: "POST",
  url: "/auth/signup",
  data: dto,
});

export {
  login,
  signup
}