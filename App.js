import { RecoilRoot } from 'recoil';
import StackNavigation from './src/navigation/Stack';
import { KeyboardAvoidingView, NativeBaseProvider, extendTheme } from "native-base";

export default function App() {
  const theme = extendTheme({
    colors: {
      primary: {
        600: '#FF9F68',
        800: '#FF8138',

      },
      secondary: {
        600: '#3B83F0',
      },
      tertiary: {
        600: '#3C3C3C',
      }
    }
  })
  return (
    <RecoilRoot>
      <NativeBaseProvider theme={theme}>
        <StackNavigation  />
      </NativeBaseProvider>
    </RecoilRoot>
  );
}