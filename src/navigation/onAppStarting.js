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

async function retrieveLists(token) {
  try {
    return (await (api.lists.getAll(token))).data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function loadApp(setAuth, setProductList) {
  const token = await retrieveToken();
  const lists = await retrieveLists(token);

  setProductList(lists);
  setAuth(auth => ({
    ...auth,
    isSignedIn: (lists !== undefined && lists !== null),
    isLoading: false,
    access_token: token,
  }));
}

export {
  loadApp
}