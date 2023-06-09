import { Box, Button, Column, Icon, Input, Row, Image, KeyboardAvoidingView, ScrollView, Text, Heading, Center } from "native-base";
import React, { useState } from "react";
import api from "../api";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import BText from "../components/base/BText";
import BHeading from "../components/base/BHeading";
import AsyncStorage from '@react-native-async-storage/async-storage';
import illustration from '../../assets/icon.png'
import { useRecoilState } from "recoil";
import authAtom from "../recoil/atoms/auth";
import { useNavigation } from "@react-navigation/native";
import productListAtom from "../recoil/atoms/productList";
import { loadApp } from "../navigation/onAppStarting";
import { registerForPushNotificationsAsync } from "../notifications";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [productList, setProductList] = useRecoilState(productListAtom);
  const [emailInput, changeEmailInput] = useState();
  const [passwordInput, changePasswordInput] = useState();
  const [isButtonLoading, changeIsButtonLoading] = useState(false);
  
  const [errorMessage, changeErrorMessage] = useState(null);
  const [auth, setAuth] = useRecoilState(authAtom);

  function navigateToRegister() {
    navigation.navigate('Signup')
  }

  async function login() {
    console.log(emailInput, passwordInput);
    if (!(emailInput?.length > 0 && passwordInput?.length > 0))
      return;
    changeIsButtonLoading(true);
    try {
      const res = await api.auth.login({
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
      if (error.response.status < 500) {
        changeErrorMessage(error.response.data.message);
      } else {
        changeErrorMessage('Unknown error, please contact us.');
      }
      changePasswordInput('');
      changeIsButtonLoading(false);
    }
  }
  return (
    <KeyboardAvoidingView behavior="padding" flex={1}>
      <Center flex={1} m={8}>
        <Row justifyContent="center" alignItems="center">
          <Image alignSelf="center" source={illustration} rounded={10} size={41} alt="login illustration" />
          <Heading ml={4}>Fridgy</Heading>
        </Row>
        <BHeading alignSelf="flex-start" my={6}>Login</BHeading>
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
          <BText mb={3} alignSelf="flex-end" color="red.500" fontWeight="semibold">{ errorMessage }</BText>
          <Button
            onPress={login}
            isLoading={isButtonLoading}
            mb={6}
            borderRadius={10}
            colorScheme="primary"
            _text={{fontWeight: "bold"}}
          >
            Login
          </Button>
        </Column>
        <Text fontWeight="light" alignSelf="center">New to Fridgy? <Text color="primary.600" fontWeight={800} onPress={navigateToRegister}>Register</Text></Text>
      </Center>
    </KeyboardAvoidingView>
  );
}
