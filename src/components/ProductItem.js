import {  Circle, Column, Icon, Pressable, Row, Text } from "native-base";
import BHeading from "./base/BHeading";
import BText from "./base/BText";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

dayjs.extend(duration);

export default function ProductItem({product, handleProductPressed}) {
  const expiryDate = dayjs(product.expiry_date).format('DD MMM YYYY');
  let iconColor = product.expires_in <= 0 ? 'red.600' : 
                  product.expires_in <= 3 ? 'orange.600' : 'yellow.600';
 let iconName = product.expires_in <= 0 ? 'calendar-today' : 
                  product.expires_in <= 3 ? 'warning' : 'info';
  return (
    <Pressable pb={2} mb={1} borderBottomColor="#ECECEC"  onPress={() => handleProductPressed(product.id)}>
        <Row bg="white" p={4} borderRadius={10} justifyContent="space-between" alignItems="center">
          <Row w="60%" justifyContent="space-between" alignItems="center">
            <Column>
              <BHeading fontSize={16}>{ product.name }</BHeading>
              <BText color="#8B8B8B">{expiryDate}</BText>
            </Column>
            {
              product.quantity ?(
                <Text fontSize={16}>{product.quantity} <Text fontSize={14} color="gray.400" fontWeight={"light"}>{product.quantity_type}</Text></Text>
              )
              : <Text color="gray.300">N/A</Text>
            }
          </Row>
          {
            product.expires_in <= 7 ? (
              <Circle size="25px" bg={iconColor}>
               <Icon as={MaterialIcons} name={iconName} color="white" />
              </Circle>
            ) : <></>
          }
        </Row>
    </Pressable>
  )
}