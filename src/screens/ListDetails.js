import { Box, Circle, Icon, Pressable, ScrollView, Text, useDisclose } from "native-base"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRecoilState } from "recoil";
import actionSheetProductAtom from "../recoil/atoms/actionSheetProduct";
import ProductList from "../components/ProductList";
import { useState } from "react";
import authAtom from "../recoil/atoms/auth";
import ProductActionSheet from "../components/ProductActionSheet";
import api from "../api";

export default function ListDetailsScreen({ route }) {
  const [auth, setAuth] = useRecoilState(authAtom);
  const [product, setProduct] = useRecoilState(actionSheetProductAtom);
  const { isOpen, onClose, onOpen } = useDisclose();
  const [action, setAction] = useState(undefined);
  const [list, setList] = useState(route.params.list);

  function startCreateProduct() {
    setProduct({
      name: '',
      quantity: 0,
      quantity_type: 'g',
      expiry_date: new Date(),
      list_id: list.id
    });
    setAction('create');
    onOpen();
  }
  function startEditProduct(productId) {
    setProduct(list.products.find(e => e.id === productId));
    setAction('edit');
    onOpen();
  }

  async function reloadList() {
    const listId = list.id;

    setList(undefined);
    try {
      const res = await api.lists.getOne(auth.access_token, listId);
      console.log(res.data);
      setList(res.data);
    } catch (error) {
      console.log(error);
      setList(null);      
    }
  }

  return (
    <>
    <ScrollView>
      {
        list && <ProductList handleProductPressed={startEditProduct} productList={list.products} name={list.name} /> 
      }
    </ScrollView>
    <Pressable position="absolute" bottom={30} right={25} onPress={startCreateProduct}>
        <Circle size="50px" bg="primary.600">
          <Icon as={<MaterialIcons name="add" />} color="white" size={7} />
        </Circle>
      </Pressable>
      {
        action ? <ProductActionSheet isOpen={isOpen} onClose={onClose} action={action} afterAction={reloadList} />
        : <></>
      }
    </>
  )
}