import { Actionsheet, Box, Button, Center, Circle, Column, Divider, Icon, Input, KeyboardAvoidingView, Pressable, Row, ScrollView, Skeleton, Spinner, Square, Text, useDisclose } from "native-base";
import BHeading from "../components/base/BHeading";
import Material from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import productListAtom from "../recoil/atoms/productList";
import api from "../api";
import authAtom from "../recoil/atoms/auth";
import { RefreshControl } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import dashboardAtom from "../recoil/atoms/dashboard";

export default function HomeScreen() {
  const [lists, setList] = useRecoilState(productListAtom);
  const [dashboard, setDashboard] = useRecoilState(dashboardAtom);
  const [auth, setAuth] = useRecoilState(authAtom);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  function openAddListActionSheet() {
    onOpen();
  }
  function closeAddListActionSheet() {
    onClose();
  }

  async function reload(hideReload = false) {
    if (!hideReload) setRefreshing(true);
    try {
      const resLists = await api.lists.getAll(auth.access_token);
      setList(resLists.data);
      const resDashboard = await api.user.getDashboard(auth.access_token);
      setDashboard(resDashboard.data);
      setRefreshing(false);
    } catch (error) {
      console.log(error);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    reload();
  }, []);

  if (!lists || !dashboard || lists.length == 0) {
    return (
      <Center flex={1}>
        <Spinner accessibilityLabel="Loading data" />
        <BHeading>Loading data...</BHeading>
      </Center>
    )
  }

  return (
    <ScrollView contentContainerStyle={{ width: "90%", alignSelf: "center" }} refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={reload} />}
    >
      <Column mt={8}>
        <BHeading mt={8} mb={2}>Important</BHeading>
        <Column backgroundColor="white" borderRadius={10} overflow="hidden">
          <Pressable _pressed={{ backgroundColor: 'gray.300' }} onPress={() => navigation.navigate('SmartListDetails', { list: dashboard.red, name: 'red', title: 'Expired' })}>
            <Row pl={2} justifyContent="space-between" alignItems="center">
              <Circle size="25px" bg="red.600"><Icon as={Material} name="calendar-today" color="white" /></Circle>
              <Row py={2} pr={2} w="90%" justifyContent="space-between" borderBottomColor="gray.200" borderBottomWidth={1}>
                <Text fontSize={16} fontWeight={200}>Expired</Text>
                <Text fontSize={16} fontWeight={300}>{ dashboard.red.length }</Text>
              </Row>
            </Row>
          </Pressable>
          <Pressable _pressed={{ backgroundColor: 'gray.300' }} onPress={() => navigation.navigate('SmartListDetails', { list: dashboard.orange, name: 'orange', title: 'Expiring soon' })}>
            <Row pl={2} justifyContent="space-between" alignItems="center">
              <Circle size="25px" bg="orange.600"><Icon as={Material} name="warning" color="white" /></Circle>
              <Row py={2} pr={2} w="90%" justifyContent="space-between" borderBottomColor="gray.200" borderBottomWidth={1}>
                <Text fontSize={16} fontWeight={200}>Expires in less than 3 days</Text>
                <Text fontSize={16} fontWeight={300}>{ dashboard.orange.length }</Text>
              </Row>
            </Row>
          </Pressable>
          <Pressable _pressed={{ backgroundColor: 'gray.300' }} onPress={() => navigation.navigate('SmartListDetails', { list: dashboard.yellow, name: 'yellow', title: 'Expiring in a week' })}>
            <Row pl={2} justifyContent="space-between" alignItems="center">
              <Circle size="25px" bg="yellow.600"><Icon as={Material} name="info" color="white" /></Circle>
              <Row py={2} pr={2} w="90%" justifyContent="space-between">
                <Text fontSize={16} fontWeight={200}>Expires in less than 7 days</Text>
                <Text fontSize={16} fontWeight={300}>{ dashboard.yellow.length }</Text>
              </Row>
            </Row>
          </Pressable>
        </Column>
        <Column>
          <Row mb={2} mt={6} justifyContent="space-between">
            <BHeading>My lists</BHeading>
            {/* <Pressable borderRadius={10} size="27px" bg="primary.600" onPress={openAddListActionSheet} _pressed={{ bg: 'primary.800', size: '29px' }}><Icon as={MaterialCommunityIcons} name="plus" size={"27px"} color="white" /></Pressable> */}
          </Row>
          <Column backgroundColor="white" borderRadius={10} overflow="hidden">
            <Pressable _pressed={{ backgroundColor: 'gray.300' }}  onPress={() => navigation.navigate('ListDetails', { list: lists.find(e => e.name == 'Fridge')})}>
              <Row pl={2} justifyContent="space-between" alignItems="center">
                <Circle size="25px" bg="primary.600"><Icon as={MaterialCommunityIcons} name="fridge" color="white" /></Circle>
                <Row py={2} pr={2} w="90%" justifyContent="space-between" borderBottomColor="gray.200" borderBottomWidth={1}>
                  <Text fontSize={16} fontWeight={200}>Fridge</Text>
                  <Text fontSize={16} fontWeight={300}>{ lists.find(e => e.name == 'Fridge').products.length }</Text>
                </Row>
              </Row>
            </Pressable>
            <Pressable _pressed={{ backgroundColor: 'gray.300' }} onPress={() => navigation.navigate('ListDetails',  { list: lists.find(e => e.name == 'Freezer')})}>
              <Row pl={2} justifyContent="space-between" alignItems="center">
                <Circle size="25px" bg="primary.600"><Icon as={MaterialCommunityIcons} name="snowflake" color="white" /></Circle>
                <Row py={2} pr={2} w="90%" justifyContent="space-between" borderBottomColor="gray.200" borderBottomWidth={1}>
                  <Text fontSize={16} fontWeight={200}>Freezer</Text>
                  <Text fontSize={16} fontWeight={300}>{ lists.find(e => e.name == 'Freezer').products.length }</Text>
                </Row>
              </Row>
            </Pressable>
            <Pressable _pressed={{ backgroundColor: 'gray.300' }} onPress={() => navigation.navigate('ListDetails', { list: lists.find(e => e.name == 'Pantry')})}>
              <Row pl={2} justifyContent="space-between" alignItems="center">
                <Circle size="25px" bg="primary.600"><Icon as={MaterialCommunityIcons} name="food-variant" color="white" /></Circle>
                <Row py={2} pr={2} w="90%" justifyContent="space-between">
                  <Text fontSize={16} fontWeight={200}>Pantry</Text>
                  <Text fontSize={16} fontWeight={300}>{ lists.find(e => e.name == 'Pantry').products.length }</Text>
                </Row>
              </Row>
            </Pressable>
          </Column>
        </Column>
      </Column>

      <Actionsheet isOpen={isOpen} onClose={onClose} h="100%" hideDragIndicator>
        <KeyboardAvoidingView w="100%" behavior="position">
          <Actionsheet.Content>
            <Box w="100%" px={4} justifyContent="center">
              <BHeading my={4} textAlign="center">Add list</BHeading>
              <Divider />
              <Column mt={6}>
                <Text fontSize={16} mb={2} w="100%">List name</Text>
                <Input borderRadius={8} size="md" variant="filled" placeholderTextColor="gray.400" bg="gray.300" placeholder="Add list name..." />
              </Column>
              <Row justifyContent="space-between" mt={16}>
                <Button onPress={closeAddListActionSheet} borderRadius={8} variant="outline" borderColor="primary.600" borderWidth={1} w="45%">Cancel</Button>
                <Button borderRadius={8} w="45%">Create</Button>
              </Row>
            </Box>
          </Actionsheet.Content>
        </KeyboardAvoidingView>
      </Actionsheet>
    </ScrollView>
  )
}