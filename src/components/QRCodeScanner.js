import Scanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { Button, Icon, View } from "native-base";
import { useEffect, useState } from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import BText from "./base/BText";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";

export default function QRCodeScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [isScannerActive, setIsScannerActive] = useState(false);
  const [type, setType] = useState(BarCodeScanner.Constants.Type.back);
  const [scanned, setScanned] = useState(false);

  function activeScanner() {
    setIsScannerActive(true);
  }

  if (!isScannerActive) {
    return (
      <Button
        onPress={activeScanner}
        size="lg"
        borderRadius={10}
        _text={{fontWeight: "bold"}}
        leftIcon={<Icon as={FontAwesome} name="qrcode" size={4}/>}
      >
      Scan it !</Button>
    )
  }

  if (hasPermission === null) {
    return <BText>Requesting for camera permission</BText>;
  }
  if (hasPermission === false) {
    return <BText>No access to camera</BText>;
  }

  return (
    <Scanner
    onRead={this.onSuccess}
    flashMode={RNCamera.Constants.FlashMode.torch}
    topContent={
      <Text style={styles.centerText}>
        Go to{' '}
        <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
        your computer and scan the QR code.
      </Text>
    }
    bottomContent={
      <TouchableOpacity style={styles.buttonTouchable}>
        <Text style={styles.buttonText}>OK. Got it!</Text>
      </TouchableOpacity>
    }
  />
  )
}