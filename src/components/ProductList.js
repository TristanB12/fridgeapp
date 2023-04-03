import { Center, Column, Skeleton, Text } from "native-base";
import BText from "../components/base/BText";
import productListAtom from "../recoil/atoms/productList";
import { useRecoilState } from "recoil";
import BHeading from "../components/base/BHeading";
import ProductItem from "./ProductItem";
import dayjs from "dayjs";

export default function ProductList() {
  const [productList, setProductList] = useRecoilState(productListAtom);

  function sortedProductList() {
    let temp = [...productList];
    temp.sort((a, b)=> new Date(a.expiry_date) - new Date(b.expiry_date));
    return temp;
  } 

  if (productList === null) {
    return (
      <Center height={400} flex={1}>
        <BHeading fontSize={32} color="primary.600">500</BHeading>
        <BHeading fontSize={22}>Houston we have a problem !</BHeading>
        <BText textAlign="center">Looks like Fridgy server failed...</BText>
        <BText>We are working on the issue.</BText>
      </Center>
    )
  }
  if (productList === undefined) {
    const skeletonList = [1, 2, 3, 4].map(key => <Skeleton.Text key={key} mt={5} />)
    return (
      <Column w="90%" alignSelf="center">
        <Column>
          {skeletonList}
        </Column>
      </Column>
    )
  }
  if (productList.length === 0) {
    return (
      <Center height={400} flex={1}>
        <BHeading fontSize={22} color="primary.600">Empty fridge</BHeading>
        <BText textAlign="center">You can start filling your frige with the + button just below.</BText>
      </Center>
    )
  }
  return (
    <Column w="90%" alignSelf="center">
      {sortedProductList().map(e => <ProductItem key={e.id} product={e} />)}
    </Column>
  );
}