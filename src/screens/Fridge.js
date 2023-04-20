import { Actionsheet, ScrollView, useDisclose, Box, Text, Circle, Icon } from "native-base";
import ProductList from "../components/ProductList";
import { Pressable, RefreshControl } from "react-native";
import api from "../api";
import { useRecoilState } from "recoil";
import authAtom from "../recoil/atoms/auth";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import productListAtom from "../recoil/atoms/productList";
import { useState } from "react";
import ProductActionSheet from "../components/ProductActionSheet";
import actionSheetProductAtom from "../recoil/atoms/actionSheetProduct";

export default function FridgeScreen() {
  const [productList, setProductList] = useRecoilState(productListAtom);
  const [auth, setAuth] = useRecoilState(authAtom);
  const [refreshing, setRefreshing] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclose();
  const [action, setAction] = useState(undefined);
  const [product, setProduct] = useRecoilState(actionSheetProductAtom);

  const reloadProducts = async () => {
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

  function handleProductPressed(productId) {
    setProduct(productList.find(e => e.id === productId));
    setAction('edit');
    onOpen();
  }

  function startCreateProduct() {
    setProduct({
      name: '',
      quantity: 0,
      quantity_type: null,
      expiry_date: new Date()
    });
    setAction('create');
    onOpen();
  }

  return (
    <>
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={reloadProducts} /> }
      >
        <ProductList handleProductPressed={handleProductPressed} />
        {
        action ? <ProductActionSheet isOpen={isOpen} onClose={onClose} action={action} afterAction={reloadProducts} />
        : <></>
        }
      </ScrollView>
      <Pressable  position="absolute" bottom={30} right={25} onPress={startCreateProduct}>
        <Circle size="50px" bg="primary.600">
          <Icon as={<MaterialIcons name="add" />} color="white" size={7} />
        </Circle>
      </Pressable>
    </>
  );
}