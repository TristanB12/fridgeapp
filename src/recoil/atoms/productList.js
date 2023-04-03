import { atom } from "recoil";

const productListAtom = atom({
  key: 'productListAtom',
  default: undefined,
})

export default productListAtom;