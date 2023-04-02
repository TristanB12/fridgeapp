import { Text } from "native-base";

export default function BText(props) {
  return (<Text color="tertiary.600" {...props}>{ props.children}</Text>)
}