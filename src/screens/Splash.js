import { Center, Image } from "native-base";
import illustration from '../../assets/splash.png';

export default function SplashScreen() {
  return (
    <Center flex={1}>
      <Image
        source={illustration}
        alt="Area Illustration"
        resizeMode="contain"
      />
    </Center>
  );
}