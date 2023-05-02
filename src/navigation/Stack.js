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
import { Pressable } from "react-native";
import { Icon, useDisclose } from "native-base";
import Material from '@expo/vector-icons/MaterialIcons';
import SettingsActionSheet from "../components/SettingsActionSheet";
import ListDetails from "../screens/ListDetails";
import SmartListDetailsScreen from "../screens/SmartListDetails";

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  const [auth, setAuth] = useRecoilState(authAtom);
  const [productList, setProductList] = useRecoilState(productListAtom);
  const { isOpen, onOpen, onClose } = useDisclose();

  function openSettingsActionSheet() {
    onOpen();
  }

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
            <Stack.Group>
              <Stack.Screen options={{
                headerTitle: 'Dashboard',
                contentStyle: {backgroundColor: '#F2F2F7'},
                headerRight: () => (
                  <Pressable p={4} onPress={openSettingsActionSheet}>
                    <Icon as={Material} alignSelf="flex-end" name="settings" size={25} color="primary.600" />
                    <SettingsActionSheet isOpen={isOpen} onClose={onClose}  />
                  </Pressable>
                )
              }} name="Home" component={HomeScreen} />
              <Stack.Screen options={({route, navigation}) => ({contentStyle: {backgroundColor: '#F2F2F7'}, title: route.params.list.name })} name="ListDetails" component={ListDetails} />
              <Stack.Screen options={({route, navigation}) => ({contentStyle: {backgroundColor: '#F2F2F7'}, title: route.params.title })} name="SmartListDetails" component={SmartListDetailsScreen} />
            </Stack.Group>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}