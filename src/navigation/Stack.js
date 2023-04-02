import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExpirationsScreen from "../screens/Expirations";
import FridgeScreen from "../screens/Fridge";
import LandingScreen from "../screens/Landing";
import LoginScreen from "../screens/Login";
import SignupScreen from "../screens/Signup";
import { Box } from "native-base";

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{contentStyle: {backgroundColor: "#ffffff"}}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Fridge" component={FridgeScreen} />
      <Stack.Screen name="Expirations" component={ExpirationsScreen} />
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />        
      </Stack.Navigator>
    </NavigationContainer>
  )  
}