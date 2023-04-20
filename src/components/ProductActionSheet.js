import { Actionsheet, Box, Button, Column, Icon, KeyboardAvoidingView, Row, ScrollView, Text, useToast } from "native-base";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ProductActionSheetForm from "./ProductActionSheetForm";
import { useRecoilState } from "recoil";
import actionSheetProductAtom from "../recoil/atoms/actionSheetProduct";
import api from "../api";
import authAtom from "../recoil/atoms/auth";
import { useState } from "react";
import BText from "./base/BText";
import QRCodeScanner from "./QRCodeScanner";

export default function ProductActionSheet(args) {
  const toast = useToast();
  const { action, onClose, afterAction } = args;
  const [product, setProduct] = useRecoilState(actionSheetProductAtom);
  const [auth, setAuth] = useRecoilState(authAtom);
  const [isButtonLoading, changeIsButtonLoading] = useState({action: false, discarded: false, consummed: false});
  const [errorMessage, setErrorMessage] = useState(false);

  async function changeProductStatus(status) {
    changeIsButtonLoading(prev => ({...prev, [status]: true}));
    try {
      await api.product.update(auth.access_token, product.id, {
        status,
      });
      toast.show({
        title: 'Product ' + status + ' !',
        variant: 'solid',
        backgroundColor: status == 'consummed' ? 'success.600' : 'error.600'
      });
      changeIsButtonLoading(prev => ({...prev, [status]: false}));
      afterAction();
      onClose();
    } catch (error) {
      changeIsButtonLoading(prev => ({...prev, [status]: false}));
      console.log(error.response.data);
      setErrorMessage(error.response.data.message);
    }
  }

  function discardProduct() {
    changeProductStatus('discarded');
  }

  function consumeProduct() {
    changeProductStatus('consummed');
  }

  async function startAction() {
    changeIsButtonLoading(prev => ({...prev, action: true}));
    try {
      if (action == 'edit') {
        await api.product.update(auth.access_token, product.id, product);
      } else {
        await api.product.create(auth.access_token, product);
      }
      changeIsButtonLoading(prev => ({...prev, action: false}));
      afterAction();
      onClose();
    } catch (error) {
      console.log(error.response.data);
      setErrorMessage(error.response.data.message);
      changeIsButtonLoading(prev => ({...prev, action: false}));
    }
  }
  return (
    <Actionsheet {...args}>
      <Actionsheet.Content borderTopRadius="18">
          <Row w="100%" px={4} justifyContent="space-between" alignItems="center">
            <Icon as={FontAwesome} name="close" size={6} color='grey'onPress={onClose} />
            <Button
              size="lg"
              variant="ghost"
              colorScheme="primary"
              onPress={startAction}
              isLoading={isButtonLoading.action}
              _text={{fontWeight: 700}}
            >SAVE</Button>
          </Row>
          <BText mb={3} alignSelf="center" color="red.500" fontWeight="semibold">{ errorMessage }</BText>
          <KeyboardAvoidingView behavior="padding">
            <ScrollView>
            <ProductActionSheetForm />
            {
              action == 'edit' ? (
                <Row alignSelf="center">
                  <Button
                    onPress={discardProduct}
                    size="lg"
                    variant="ghost"
                    colorScheme="danger"
                    isLoading={isButtonLoading.discarded}
                    rightIcon={<Icon as={FontAwesome} name="trash" size={4} color='#e11d48'/>}
                  >Discarded</Button>
                  <Button
                    onPress={consumeProduct}
                    size="lg"
                    variant="ghost"
                    colorScheme="success"
                    isLoading={isButtonLoading.consummed}
                    rightIcon={<Icon as={FontAwesome} name="check" size={4} color='#16a34a'/>}
                  >Consumed</Button>
                </Row>
              ) :  <QRCodeScanner />
            }
            </ScrollView>
          </KeyboardAvoidingView>
        </Actionsheet.Content>
    </Actionsheet>
  )
}