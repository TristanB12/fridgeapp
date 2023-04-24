import { RecoilRoot } from 'recoil';
import StackNavigation from './src/navigation/Stack';
import { NativeBaseProvider, extendTheme, Center, Image } from "native-base";
import { useFonts } from 'expo-font';
import illustration from './assets/splash.png';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Rubik_100': require('./assets/fonts/Rubik/Rubik-Light.ttf'),
    'Rubik_200': require('./assets/fonts/Rubik/Rubik-Regular.ttf'),
    'Rubik_300': require('./assets/fonts/Rubik/Rubik-Medium.ttf'),
    'Rubik_400': require('./assets/fonts/Rubik/Rubik-SemiBold.ttf'),
    'Rubik_500': require('./assets/fonts/Rubik/Rubik-Bold.ttf'),
    'Rubik_600': require('./assets/fonts/Rubik/Rubik-ExtraBold.ttf'),
    'Rubik_700': require('./assets/fonts/Rubik/Rubik-Black.ttf'),
    'Raleway_100': require('./assets/fonts/Raleway/Raleway-Light.ttf'),
    'Raleway_200': require('./assets/fonts/Raleway/Raleway-Regular.ttf'),
    'Raleway_300': require('./assets/fonts/Raleway/Raleway-Medium.ttf'),
    'Raleway_400': require('./assets/fonts/Raleway/Raleway-SemiBold.ttf'),
    'Raleway_500': require('./assets/fonts/Raleway/Raleway-Bold.ttf'),
    'Raleway_600': require('./assets/fonts/Raleway/Raleway-ExtraBold.ttf'),
    'Raleway_700': require('./assets/fonts/Raleway/Raleway-Black.ttf'),
  });

  const theme = extendTheme({
    fontConfig: {
      Rubik: {
        100: {
          normal: 'Rubik_100',
        },
        200: {
          normal: 'Rubik_200',
        },
        300: {
          normal: 'Rubik_300',
        },
        400: {
          normal: 'Rubik_400',
        },
        500: {
          normal: 'Rubik_500',
        },
        600: {
          normal: 'Rubik_600',
        },
        700: {
          normal: 'Rubik_700',
        }, 
      },
      Raleway: {
        100: {
          normal: 'Raleway_100',
        },
        200: {
          normal: 'Raleway_200',
        },
        300: {
          normal: 'Raleway_300',
        },
        400: {
          normal: 'Raleway_400',
        },
        500: {
          normal: 'Raleway_500',
        },
        600: {
          normal: 'Raleway_600',
        },
        700: {
          normal: 'Raleway_700',
        }, 
      },
    },
    fonts: {
      heading: 'Rubik',
      body: 'Raleway',
      mono: 'Raleway'
    },
    colors: {
      primary: {
        600: '#4B7BEC',
        800: '#3255A6',

      },
      secondary: {
        600: '#05070A',
      },
      tertiary: {
        600: '#05070A',
      },
      gray: {
        300: "#ECECEC" 
      },
      red: {
        600: '#EB3B5A',
      },
      orange: {
        600: '#FA8231'
      },
      yellow: {
        600: '#FED330'
      },
      green: {
        600: '#20BF6B'
      }
    }
  })

  if (!fontsLoaded) {
    return (
      <NativeBaseProvider theme={theme}>
        <Center flex={1}>
          <Image
            source={illustration}
            alt="Area Illustration"
            resizeMode="contain"
          />
        </Center>
      </NativeBaseProvider>
    );
  }

  return (
    <RecoilRoot>
      <NativeBaseProvider theme={theme}>
        <StackNavigation  />
      </NativeBaseProvider>
    </RecoilRoot>
  );
}