import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LocationBackgroundView } from "./LocationBackgroundView";
import { styles } from "../component/styles";
import { QR_CODE_KEY } from "../constant/contants";
import { ScrollView } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";

const ProfileView = (props) => {
  const { t } = useTranslation();
  return (
    <ScrollView>
      <View style={stylesProfile.screen}>
        <Text style={styles.title}>{t("profileHead")}</Text>
        <LocationBackgroundView />

        <View style={styles.timerLine}>
          <Text style={styles.title}> {t("scanQR")}</Text>
          <AntDesign
            style={styles.iconContainer}
            name={"qrcode"}
            size={50}
            onPress={() => props.navigation.navigate(QR_CODE_KEY)}
          />
        </View>
        <View>
          <Text style={styles.title}> {t("syncData")}</Text>
        </View>

        <View>
          <AntDesign style={styles.iconSyncContainer} name={"sync"} size={30} />
        </View>
      </View>
    </ScrollView>
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
