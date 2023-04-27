import { Actionsheet, Box, Button, Column, Divider, Icon, KeyboardAvoidingView, Row, ScrollView, Text, useToast } from "native-base";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ProductActionSheetForm from "./ProductActionSheetForm";
import { useRecoilState } from "recoil";
import actionSheetProductAtom from "../recoil/atoms/actionSheetProduct";
import api from "../api";
import authAtom from "../recoil/atoms/auth";
import { useState } from "react";
import BText from "./base/BText";
import BHeading from "./base/BHeading";

export default function ProductActionSheet(args) {
  const toast = useToast();
  const { action, onClose, afterAction } = args;
  const [product, setProduct] = useRecoilState(actionSheetProductAtom);
  const [auth, setAuth] = useRecoilState(authAtom);
  const [isButtonLoading, changeIsButtonLoading] = useState({ action: false, discarded: false, consummed: false });
  const [errorMessage, setErrorMessage] = useState(false);

  async function changeProductStatus(status) {
    changeIsButtonLoading(prev => ({ ...prev, [status]: true }));
    try {
      await api.product.update(auth.access_token, product.id, {
        status,
      });
      toast.show({
        title: 'Product ' + status + ' !',
        variant: 'solid',
        backgroundColor: status == 'consummed' ? 'success.600' : 'error.600'
      });
      changeIsButtonLoading(prev => ({ ...prev, [status]: false }));
      afterAction();
      onClose();
    } catch (error) {
      changeIsButtonLoading(prev => ({ ...prev, [status]: false }));
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
    changeIsButtonLoading(prev => ({ ...prev, action: true }));
    try {
      if (action == 'edit') {
        await api.product.update(auth.access_token, product.id, product);
      } else {
        await api.product.create(auth.access_token, product);
      }
      changeIsButtonLoading(prev => ({ ...prev, action: false }));
      afterAction();
      onClose();
    } catch (error) {
      console.log(error.response.data);
      setErrorMessage(error.response.data.message);
      changeIsButtonLoading(prev => ({ ...prev, action: false }));
    }
  }
  return (
    <Actionsheet {...args} h="100%" hideDragIndicator>
      <KeyboardAvoidingView w="100%" behavior="position">
        <Actionsheet.Content>
          <BHeading my={4} textAlign="center">{action == 'create' ? 'Create ' : 'Edit '}product</BHeading>
          <Divider />
          <BText mb={3} alignSelf="center" color="red.500" fontWeight="semibold">{errorMessage}</BText>
          <Box w="90%" alignSelf="center">
            <ProductActionSheetForm />
            <Button mt={8} borderRadius={8} w="100%" onPress={startAction} isLoading={isButtonLoading.action}>{action == 'create' ? 'Create ' : 'Edit '}</Button>
            {
              action == 'edit' ? (
                <Row mt={4} justifyContent="space-between">
                  <Button
                    w="45%"
                    borderRadius={8}
                    variant="outline"
                    borderColor="red.600"
                    borderWidth={2}
                    onPress={discardProduct}
                    colorScheme="danger"
                    isLoading={isButtonLoading.discarded}
                    rightIcon={<Icon as={FontAwesome} name="trash" size={4} color='#e11d48' />}
                  >Discarded</Button>
                  <Button
                    w="45%"
                    borderRadius={8}
                    variant="outline"
                    borderColor="green.600"
                    borderWidth={2}
                    onPress={consumeProduct}
                    colorScheme="success"
                    isLoading={isButtonLoading.consummed}
                    rightIcon={<Icon as={FontAwesome} name="check" size={4} color='#16a34a' />}
                  >Consumed</Button>
                </Row>
              ) : <></>
            }
          </Box>
        </Actionsheet.Content>
      </KeyboardAvoidingView>
    </Actionsheet>
  )
}