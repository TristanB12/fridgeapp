import { Actionsheet, Button, Column, Heading, Icon, Pressable, Row, View, Circle } from "native-base";
import BHeading from "./base/BHeading";
import FontAwesome from '@expo/vector-icons/MaterialIcons';
import BText from "./base/BText";
import BAlertDialog from "./base/BAlertDialog";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import authAtom from "../recoil/atoms/auth";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadApp } from "../navigation/onAppStarting";
import productListAtom from "../recoil/atoms/productList";
import api from "../api";
import Material from '@expo/vector-icons/MaterialIcons';

export default function SettingsActionSheet(args) {
  const [productList, setProductList] = useRecoilState(productListAtom);
  const { onClose } = args;
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = React.useRef(null);
  const [alertDialogContent, setAlertDialogContent] = useState(null)
  const [auth, setAuth] = useRecoilState(authAtom);

  const onCloseAlertDialog = () => setIsOpen(false);
  const logout = async () => {
      setAuth({
        access_token: null,
        expires_in: null,
        isSignedIn: false,
        isLoading: true,
      })
      await AsyncStorage.removeItem("TOKEN");
      await loadApp(setAuth, setProductList);
      onClose();
  }
  const deleteAccount = async () => {
    try {
      await api.user.deleteAccount(auth.access_token);
      await logout();
    } catch (error) {
      return error;
    }
  }

  function startLogout() {
    setAlertDialogContent({
      cancelButtonTitle: 'Cancel',
      confirmButtonTitle: 'Log out',
      title: 'Log out',
      text: 'Are you sure you want to log out ?',
      afterConfirm: logout
    });
    setIsOpen(true);
  }

  function startDeleteAccount() {
    setAlertDialogContent({
      cancelButtonTitle: 'Cancel',
      confirmButtonTitle: 'Delete',
      title: 'Delete account',
      text: 'This will remove all data relating to your account. This action cannot be reversed. Deleted data can not be recovered.',
      afterConfirm: deleteAccount
    });
    setIsOpen(true);
  }

  return (
    <Actionsheet {...args} hideDragIndicator h="full">
      <Actionsheet.Content p={0} borderTopRadius="18" bgColor="gray.100">
        <Row w="100%" px={4} bgColor="white" justifyContent="space-between" alignItems="center">
          <View w="20%"></View>
          <BHeading fontSize={16}>Settings</BHeading>
          <Button
            w="20%"
            size="lg"
            variant="ghost"
            colorScheme="primary"
            onPress={onClose}
            _text={{fontWeight: 700}}
          >OK</Button>
        </Row>
        <View w="90%" h="full" mt={7}>
          <Heading fontSize={14} mb={2} color="gray.400" fontWeight="medium">ACCOUNT</Heading>
          <Column bgColor="white" borderRadius={5} w="100%">
            <Pressable onPress={startLogout}>
              <Row pl={2} justifyContent="space-between" alignItems="center">
              <Circle size="25px" bg="primary.600"><Icon as={Material} name="logout" color="white" /></Circle>
                <Row py={2} justifyContent="space-between" w="90%" borderBottomColor="gray.200" borderBottomWidth={1}>
                  <BText>Log out</BText>
                  <Icon as={FontAwesome} name="chevron-right" size={6} color="gray.400" />
                </Row>
              </Row>
            </Pressable>
            <Pressable onPress={startDeleteAccount} _pressed={{bgColor: 'gray.200'}}>
              <Row pl={2} justifyContent="space-between" alignItems="center">
              <Circle size="25px" bg="primary.600"><Icon as={Material} name="delete" color="white" /></Circle>
                <Row py={2} justifyContent="space-between" w="90%">
                  <BText>Delete account</BText>
                  <Icon as={FontAwesome} name="chevron-right" size={6} color="gray.400" />
                </Row>
              </Row>
            </Pressable>
          </Column>
          <BAlertDialog
            {...alertDialogContent}
            leastDestructiveRef={cancelRef}
            isOpen={isOpen}
            onClose={onCloseAlertDialog}
          />
        </View>
      </Actionsheet.Content>
    </Actionsheet>
  )
}