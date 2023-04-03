import { Box, Button, Column, Icon, Input, Row, Image } from "native-base";
import React, { useState } from "react";
import api from "../api";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import BText from "../components/base/BText";
import BHeading from "../components/base/BHeading";

import illustration from '../../assets/images/signup-illustration.png';

export default function SignupScreen({navigation}) {
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
    <Box m={8}>
      <Image alignSelf="center" source={illustration} size={220} alt="login illustration" />
      <BHeading mb={6}>Sign up</BHeading>
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
      <BText alignSelf="center">Joined us before? <BText color="secondary.600" fontWeight="semibold" onPress={navigateToLogin}>Login</BText></BText>
    </Box>
  );
}