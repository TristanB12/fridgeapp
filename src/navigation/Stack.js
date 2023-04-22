import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FridgeScreen from "../screens/Fridge";
import LoginScreen from "../screens/Login";
import SignupScreen from "../screens/Signup";
import SplashScreen from "../screens/Splash";
import { useEffect } from "react";
import { loadApp } from "./onAppStarting";
import { useRecoilState } from "recoil";
import authAtom from "../recoil/atoms/auth";
import productListAtom from "../recoil/atoms/productList";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Actionsheet, Button, Icon, useDisclose } from "native-base";
import SettingsActionSheet from "../components/SettingsActionSheet";

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  const [auth, setAuth] = useRecoilState(authAtom);
  const [productList, setProductList] = useRecoilState(productListAtom);
  const { isOpen, onClose, onOpen } = useDisclose();

  useEffect(() => {
    loadApp(setAuth, setProductList);
  }, []);

  function openSettingsPannel() {
    onOpen();
  }

  if (auth.isLoading) {
    return (
      <NavigationContainer>
        <Stack.Screen name="Splash" component={SplashScreen} screenOptions={{headerShown: false }} />
      </NavigationContainer>
    )
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: "#ffffff" }}}>
        {
          auth.isSignedIn === false ? (
            <>
              <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false }} />
              <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown: false }} />
            </>
          ) : (
            <Stack.Group screenOptions={{
              headerStyle: { backgroundColor: '#FF9F68' },
              headerTitleStyle: { color: 'white', fontSize: 24, fontWeight: "600" },
              headerRight: () => (
                <>
                  <Icon onPress={openSettingsPannel} as={FontAwesome} name="gear" size={6} color='#ffff'/>
                  <SettingsActionSheet isOpen={isOpen} onClose={onClose}>
                    
                  </SettingsActionSheet>
                </>
              )
            }}>
              <Stack.Screen name="Fridge" component={FridgeScreen} />
            </Stack.Group>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}