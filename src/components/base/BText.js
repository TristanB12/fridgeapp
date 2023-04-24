import { Text } from "native-base";

export default function BText(props) {
  return (<Text color="tertiary.600" fontWeight={100} {...props}>{ props.children}</Text>)
}