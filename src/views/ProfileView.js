import React from "react";
import { View, Text, Button, StyleSheet, Platform } from "react-native";
import { useTranslation } from "react-i18next";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";
import { LinearProgress } from "react-native-elements";
import { LocationBackgroundView } from "./LocationBackgroundView";
import { styles } from "../component/styles";
import { QR_CODE_KEY } from "../constant/contants";

const ProfileView = (props) => {
  const { t, i18n } = useTranslation();

  return (
    <View style={stylesProfile.screen}>
      <Text style={styles.title}>{t("profileHead")}</Text>
      
      <AntDesign
          style={styles.iconContainerProfile}
          name={"playcircleo"}
          size={30}
        />

      <View style={styles.startContainer}>
      <LocationBackgroundView />
        <View style={styles.timerContainer}>
          <View style={styles.timerLine}>
            <Text style={styles.timerText}> {t("start")} </Text>
            <View>
              <Text style={styles.timerText}> {moment().format("LTS")}</Text>
            </View>
          </View>
          <View style={styles.timerLine}>
            <Text style={styles.timerText}> {t("end")} </Text>
            <View>
              <Text style={styles.timerText}> {moment().format("LTS")}</Text>
            </View>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.secondtitle}> {t("scanQR")}</Text>
        <AntDesign
          style={styles.iconContainerProfile}
          name={"qrcode"}
          size={50}
          onPress={() => props.navigation.navigate(QR_CODE_KEY)}
        />
      </View>
      <View>
        <Text style={styles.thirdtitle}> {t("syncData")}</Text>
      </View>
      {/* afficher soit LinearProgress ou l'icon de données selon du status de connexion*/}
      <LinearProgress color="darkgreen" />
      <View>
        <AntDesign style={styles.iconSyncContainer} name={"sync"} size={30} />
      </View>
    </View>
  );
};

const stylesProfile = StyleSheet.create({
  screen: {
    flexDirection: "column",
    flex: 1,
    padding: 10,
    alignItems: "flex-start",
  },
});

export default ProfileView;
