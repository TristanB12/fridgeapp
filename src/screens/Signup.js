import { Box, Button, Column, Icon, Input, Row, Image, KeyboardAvoidingView, ScrollView, Center, Heading, Text } from "native-base";
import React, { useState } from "react";
import api from "../api";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import BText from "../components/base/BText";
import BHeading from "../components/base/BHeading";

import illustration from '../../assets/icon.png';
import { loadApp } from "../navigation/onAppStarting";
import productListAtom from "../recoil/atoms/productList";
import { useRecoilState } from "recoil";
import authAtom from "../recoil/atoms/auth";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerForPushNotificationsAsync } from "../notifications";

export default function SignupScreen() {
  const navigation = useNavigation();
  const [auth, setAuth] = useRecoilState(authAtom);
  const [productList, setProductList] = useRecoilState(productListAtom);
  const [emailInput, changeEmailInput] = useState();
  const [passwordInput, changePasswordInput] = useState();
  const [confirmPasswordInput, ChangeConfirmPasswordInput] = useState();
  const [isButtonLoading, changeIsButtonLoading] = useState(false);
  
  const [errorMessage, changeErrorMessage] = useState(null);

  function navigateToLogin() {
    navigation.navigate('Login')
  }

  async function login() {
    console.log(emailInput, passwordInput);
    if (!(emailInput?.length > 0 && passwordInput?.length > 0 && confirmPasswordInput?.length > 0))
      return;
    if (passwordInput != confirmPasswordInput) {
      changeErrorMessage('Passwords are different.');
      return;
    }
    changeIsButtonLoading(true);
    try {
      const res = await api.auth.signup({
        email: emailInput,
        password: passwordInput
      })
      try {
        await AsyncStorage.setItem("TOKEN", res.data.access_token);
      } catch (error) {
        console.error("FAILED TO STORE ACCESS TOKEN");
      }
      setAuth({
        expires_in: res.data.expires_in,
        access_token: res.data.access_token
      });
      await registerForPushNotificationsAsync(res.data.access_token);
      loadApp(setAuth, setProductList);
      navigation.navigate('Home');
      changeIsButtonLoading(false);
    } catch (error) {
      if (error?.response.status < 500) {
        changeErrorMessage(error.response.data.message);
      } else {
        changeErrorMessage('Unknown error, please contact us.');
      }
      changePasswordInput('');
      ChangeConfirmPasswordInput('');
      changeIsButtonLoading(false);
    }
  }
  return (
    <KeyboardAvoidingView flex={1} behavior='padding'>
    <Center flex={1} m={8}>
    <Row justifyContent="center" alignItems="center">
          <Image alignSelf="center" source={illustration} rounded={10} size={41} alt="login illustration" />
          <Heading ml={4}>Fridgy</Heading>
        </Row>
      <BHeading alignSelf="flex-start" my={6}>Sign up</BHeading>
      <Column>
        <Row mb={3} justifyContent="space-between" alignItems="center">
          <Icon as={FontAwesome} name="at" size={5} color='grey'/>
          <Input
            w="90%"
            size="lg"
            variant="underlined"
            placeholder="Email"
            type="email"
            onChangeText={(e) => changeEmailInput(e)}
          />
        </Row>
        <Row mb={3} justifyContent="space-between" alignItems="center">
          <Icon as={FontAwesome} name="lock" size={5} color='grey'/>
          <Input
            w="90%"
            size="lg"
            variant="underlined"
            placeholder="Password"
            type="password"
            value={passwordInput}
            onChangeText={(e) => changePasswordInput(e)}

          />
        </Row>
        <Row mb={3} justifyContent="space-between" alignItems="center">
          <Icon as={FontAwesome} name="lock" size={5} color='grey'/>
          <Input
            w="90%"
            size="lg"
            variant="underlined"
            placeholder="Confirm password"
            type="password"
            value={confirmPasswordInput}
            onChangeText={(e) => ChangeConfirmPasswordInput(e)}
          />
        </Row>
        <BText mb={3} alignSelf="flex-end" color="red.500" fontWeight="semibold">{ errorMessage }</BText>
        <Button
          onPress={login}
          isLoading={isButtonLoading}
          mb={6}
          borderRadius={10}
          colorScheme="primary"
          _text={{fontWeight: "bold"}}
        >
          Sign up
        </Button>
      </Column>
      <Text alignSelf="center">Joined us before? <Text color="primary.600" fontWeight="semibold" onPress={navigateToLogin}>Login</Text></Text>
    </Center>
    </KeyboardAvoidingView>
  );
}