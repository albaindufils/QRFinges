import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
} from "react-native";
import { styles } from "../component/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { PROFILE_KEY, WEBVIEW_KEY } from "../constant/contants";
import { useTranslation } from "react-i18next";
import { addRecordQRCode } from "../services/firebase";
import { useUserContext } from "../services/user-context";
import { askCameraPermission } from "../services/cameraPermission";

const QRcodeView = (props) => {
  const isFocused = useIsFocused();
  const { t } = useTranslation();
  const { state } = useUserContext();
  const [hasPermissionQR, setHasPermissionQR] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [resultScanQR, setResultScanQR] = useState("");
  const [userText, setUserText] = useState("");

  const onPressText = () => {
    setScanned(false);

    try {
      addRecordQRCode(state.userId, resultScanQR).then(() => {
        props.navigation.navigate(WEBVIEW_KEY, { uri: resultScanQR });
        setResultScanQR("");
      });
    } catch (e) {
      console.log("Echec !");
    }
  };

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);

    setResultScanQR(data);
  };

  askCameraPermission();

  

  return (
    <ScrollView>
      <View style={styles.screen}>
        <View style={styles.content}>
          <View style={styles.barcodeBox}>
            <BarCodeScanner
              onBarCodeScanned={handleBarCodeScanned}
              style={{ height: 400, width: 400 }}
            />
          </View>

          {scanned && (
            <View style={styles.content}>
              <TouchableOpacity
                style={styles.customBtnGreen}
                onPress={onPressText}
              >
                <Text style={{ color: "cornsilk" }}>{resultScanQR}</Text>
              </TouchableOpacity>

              <Button
                title={"Scan again ?"}
                onPress={() => setScanned(false)}
                color="tomato"
              />
            </View>
          )}
        </View>
        <MaterialIcons
          name="add-a-photo"
          size={24}
          style={styles.iconContainer}
        />
      </View>
    </ScrollView>
  );
};

export default QRcodeView;
