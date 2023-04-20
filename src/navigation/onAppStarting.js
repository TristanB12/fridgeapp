import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';

async function retrieveToken() {
  try {
    return await AsyncStorage.getItem('TOKEN');
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function retrieveProducts(token) {
  try {
    return (await (api.product.getAll(token))).data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function loadApp(setAuth, setProductList) {
  const token = await retrieveToken();
  const products = await retrieveProducts(token);

  setProductList(products);
  setAuth(auth => ({
    ...auth,
    isSignedIn: (products !== undefined && products !== null),
    isLoading: false,
    access_token: token,
  }));
}

export {
  loadApp
}