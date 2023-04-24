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
import HomeScreen from "../screens/Home";

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  const [auth, setAuth] = useRecoilState(authAtom);
  const [productList, setProductList] = useRecoilState(productListAtom);

  useEffect(() => {
    loadApp(setAuth, setProductList);
  }, []);

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
            <Stack.Group screenOptions={{headerShown:  false}}>
              <Stack.Screen options={{contentStyle: {backgroundColor: '#F2F2F7'}}} name="Home" component={HomeScreen} />
              <Stack.Screen options={{contentStyle: {backgroundColor: '#F2F2F7'}}} name="Fridge" component={FridgeScreen} />
            </Stack.Group>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}