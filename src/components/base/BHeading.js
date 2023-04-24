import { Heading, Text } from "native-base";

export default function BHeading(props) {
  return (<Heading color="tertiary.600" fontWeight={"400"} fontSize={22} {...props}>{ props.children}</Heading>)
}