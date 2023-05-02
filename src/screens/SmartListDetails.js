import { ScrollView, useDisclose } from "native-base";
import ProductList from "../components/ProductList";
import { useState } from "react";
import api from "../api";
import ProductActionSheet from "../components/ProductActionSheet";
import { useRecoilState } from "recoil";
import actionSheetProductAtom from "../recoil/atoms/actionSheetProduct";
import authAtom from "../recoil/atoms/auth";
import dashboardAtom from "../recoil/atoms/dashboard";

export default function SmartListDetailsScreen({ route }) {
  const [list, setList] = useState(route.params.list);
  const [action, setAction] = useState(undefined);
  const [product, setProduct] = useRecoilState(actionSheetProductAtom);
  const [dashboard, setDashboard] = useRecoilState(dashboardAtom);
  const [auth, setAuth] = useRecoilState(authAtom);
  const { isOpen, onClose, onOpen } = useDisclose();
  const name = route.params.name;

  function startEditProduct(productId) {
    setProduct(list.find(e => e.id === productId));
    setAction('edit');
    onOpen();
  }

  async function reloadList() {
    setList(undefined);
    try {
      const res = await api.user.getDashboard(auth.access_token);
      setDashboard(res.data);
      console.log(res.data[name]);
      setList(res.data[name]);
    } catch (error) {
      console.log(error);
      setList(null);      
    }
  }

  return (
    <ScrollView>
      {
        list && <ProductList
                  handleProductPressed={startEditProduct}
                  productList={list}
                  name={name}
                />
      }
      {
       action && <ProductActionSheet isOpen={isOpen} onClose={onClose} action='edit' afterAction={reloadList} />
      }
    </ScrollView>
  )
}