import { ScrollView } from "native-base";
import ProductList from "../components/ProductList";
import { RefreshControl } from "react-native";
import api from "../api";
import { useRecoilState } from "recoil";
import authAtom from "../recoil/atoms/auth";
import productListAtom from "../recoil/atoms/productList";
import { useState } from "react";

export default function FridgeScreen() {
  const [productList, setProductList] = useRecoilState(productListAtom);
  const [auth, setAuth] = useRecoilState(authAtom);
  const [refreshing, setRefreshing] = useState(false);

  async function reloadProducts() {
    setRefreshing(true);
    setProductList(undefined);
    try {
      const res = await api.product.getAll(auth.access_token);
      setProductList(res.data);
      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
      setProductList(null);
    }
  }

  return (
    <ScrollView refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={reloadProducts} /> }
    >
      <ProductList />
    </ScrollView>
  );
}