import {  Column, Pressable, Row } from "native-base";
import BHeading from "./base/BHeading";
import BText from "./base/BText";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export default function ProductItem({product}) {
  const expiryDate = dayjs(product.expiry_date).format('DD MMM YYYY');
  const quantityString = product.quantity + product.quantity_type;
  const remainingTime = dayjs.duration(dayjs(product.expiry_date).diff(dayjs())).days();
  const remainingTimeColor = remainingTime <= 3 ? 'alert.600' : 'warning.600';
  const remainingTimeString = `${remainingTime} day${remainingTime == 1 ? '' : 's'}`; 

  return (
    <Pressable>
      <Row  justifyContent="space-between" alignItems="center">
        <Row w="60%" justifyContent="space-between" alignItems="center">
          <Column>
            <BHeading fontSize={16}>{ product.name }</BHeading>
            <BText color="#8B8B8B">{expiryDate}</BText>
          </Column>
          {remainingTime <= 7 ? <BText fontWeight={800} color={remainingTimeColor}>{remainingTimeString}</BText> : <></>}
        </Row>
        <BText fontWeight={600}>{product.quantity ? quantityString : 'N/A'}</BText>
      </Row>
    </Pressable>
  )
}