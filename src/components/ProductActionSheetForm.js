import { Column, Input, KeyboardAvoidingView, Row, ScrollView, Select } from "native-base";
import BHeading from "./base/BHeading";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRecoilState } from "recoil";
import actionSheetProductAtom from "../recoil/atoms/actionSheetProduct";

export default function ProductActionSheetForm() {
  const [product, setProduct] = useRecoilState(actionSheetProductAtom);

  function changeProductKeyValue(value, key) {
    setProduct((prev) => ({
      ...prev,
      [key]: value, 
    }));
  }
  return (
       <Column w="100%" px={4} py={8}>
        <Row my={3} justifyContent="space-between">
          <Column w="40%">
            <BHeading fontSize={16} mb={2}>Name</BHeading>
            <Input
              size="md"
              variant="underlined"
              onChangeText={value => changeProductKeyValue(value, 'name')}
              value={product.name}
            />
          </Column>
          <Column >
            <BHeading fontSize={16} mb={2}>Expiry date</BHeading>
            <DateTimePicker
              margin={0}
              testID="dateTimePicker"
              value={new Date(product.expiry_date)}
              onChange={(event, value) => changeProductKeyValue(value, 'expiry_date')}
              mode={'date'}
              is24Hour={true}
            />
          </Column>
        </Row>
        <Column my={3}>
          <BHeading fontSize={16}>Quantity</BHeading>
          <Row w="100%" justifyContent="space-between">
            <Input
              keyboardType="numeric"
              w="35%"
              size="md"
              variant="underlined"
              onChangeText={value => changeProductKeyValue(+value, 'quantity')}
              value={product.quantity ? product.quantity.toString() : ''}
            />
            <Select selectedValue={product.quantity_type} onValueChange={value => changeProductKeyValue(value, 'quantity_type')} minWidth={200} placeholder="Pick a unit measure">
              <Select.Item label="Grams" value="g"/>
              <Select.Item label="Pieces" value="pcs"/>
              <Select.Item label="Liters" value="L"/>
            </Select>
          </Row>
        </Column>
      </Column>
  )
}