import { Box, Button, Column, Container, Heading, Icon, Input, Text, Row, Spacer, Pressable, Image } from "native-base";
import React, { useState } from "react";
import api from "../api";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import BText from "../components/base/BText";
import BHeading from "../components/base/BHeading";

import illustration from '../../assets/images/login-illustration.png'

export default function LoginScreen() {
  const [emailInput, changeEmailInput] = useState();
  const [passwordInput, changePasswordInput] = useState();
  const [isButtonLoading, changeIsButtonLoading] = useState(false);
  
  const apiError = React.useRef('');

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
      console.log(res);
      changeIsButtonLoading(false);
    } catch (error) {
      
      changeIsButtonLoading(false);
    }
  }
  return (
    <Box m={8}>
      <Image alignSelf="center" source={illustration} size={220} alt="login illustration" />
      <BHeading mb={6}>Login</BHeading>
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
            onChangeText={(e) => changePasswordInput(e)}

          />
        </Row>
        <BText mb={3} alignSelf="flex-end" color="secondary.600" fontWeight="semibold">Forgot password?</BText>
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
      <BText alignSelf="center">New to Fridgy? <BText color="secondary.600" fontWeight="semibold">Register</BText></BText>
    </Box>
  );
}
