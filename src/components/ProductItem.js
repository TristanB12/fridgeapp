import {  Column, Pressable, Row } from "native-base";
import BHeading from "./base/BHeading";
import BText from "./base/BText";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export default function ProductItem({product, handleProductPressed}) {
  const expiryDate = dayjs(product.expiry_date).format('DD MMM YYYY');
  const quantityString = product.quantity + product.quantity_type;
  const remainingTime = dayjs.duration(dayjs(product.expiry_date).diff(dayjs())).days();
  let remainingTimeColor = remainingTime <= 3 ? 'danger.600' : 'amber.500';
  let remainingTimeString = `${remainingTime} day${remainingTime == 1 ? '' : 's'}`; 

  if (remainingTime <= 0) {
    remainingTimeString = 'expired';
    remainingTimeColor = 'dark.100';
  }
  return (
    <Pressable pb={2} mb={3} borderBottomColor="#ECECEC" borderBottomWidth={1}  onPress={() => handleProductPressed(product.id)}>
        <Row  justifyContent="space-between" alignItems="center">
          <Row w="60%" justifyContent="space-between" alignItems="center">
            <Column>
              <BHeading fontSize={16}>{ product.name }</BHeading>
              <BText color="#8B8B8B">{expiryDate}</BText>
            </Column>
            {remainingTime <= 7 ? <BText fontWeight={800} color={remainingTimeColor}>{remainingTimeString}</BText> : <></>}
          </Row>
          <BText color={product.quantity ? 'tertiary.600' : '#B5B5B5'} fontWeight={600}>{product.quantity ? quantityString : 'N/A'}</BText>
        </Row>
    </Pressable>
  )
}