import { atom } from "recoil";

const authAtom = atom({
  key: 'authAtom',
  default: {
    access_token: null,
    expires_in: null,
    isSignedIn: false,
    isLoading: true,
  }
})

export default authAtom;