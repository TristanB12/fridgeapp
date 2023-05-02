import { Box, Button, Column, Icon, Input, KeyboardAvoidingView, Row, ScrollView, Select, Text } from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRecoilState } from "recoil";
import actionSheetProductAtom from "../recoil/atoms/actionSheetProduct";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function ProductActionSheetForm() {
  const [product, setProduct] = useRecoilState(actionSheetProductAtom);

  function changeProductKeyValue(value, key) {
    setProduct((prev) => ({
      ...prev,
      [key]: value, 
    }));
  }
  return (
       <Box>
        <Column mb={4}>
          <Text fontSize={16} mb={2}>Product name</Text>
          <Input
            value={product.name}
            borderRadius={8}
            size="md"
            variant="filled"
            placeholderTextColor="gray.400"
            bg="gray.300"
            placeholder="Add product name..."
            onChangeText={value => changeProductKeyValue(value, 'name')}
          />
        </Column>
        <Row justifyContent="space-between">
          <Column w="35%">
            <Text fontSize={16} mb={2}>Expiry date</Text>
            <DateTimePicker
              style={{ marginLeft: -5 }}
              value={new Date(product.expiry_date)}
              mode={'date'}
              is24Hour={true}
              onChange={(event, value) => changeProductKeyValue(value, 'expiry_date')}
            />
          </Column>
          <Column w="55%">
            <Text fontSize={16} mb={2}>Quantity</Text>
            <Row>
              <Input
                keyboardType="numeric"
                width="30%"
                size="md"
                variant="filled"
                placeholder="000"
                placeholderTextColor="gray.400"
                bg="gray.300"
                onChangeText={value => changeProductKeyValue(+value, 'quantity')}
                value={product.quantity ? product.quantity.toString() : ''}
              />
              <Select
                minW="70%"
                bg="gray.300"
                selectedValue={product.quantity_type}
                onValueChange={value => changeProductKeyValue(value, 'quantity_type')}
                dropdownIcon={<Icon as={MaterialCommunityIcons} name="sort-variant" color="gray.400" />}
                _selectedItem={{ color: 'primary.600' }}
              >
              <Select.Item label="Grams" value="g"/>
              <Select.Item label="Pieces" value="pcs"/>
              <Select.Item label="Milliliters" value="mL"/>
            </Select>
            </Row>
          </Column>
        </Row>
       </Box>
  )
}