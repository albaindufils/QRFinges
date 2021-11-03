import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Linking } from "react-native";
import Header from "../component/Header";
import { useTranslation } from "react-i18next";
import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import { LinearProgress } from 'react-native-elements';
import Time from "../component/Time";


export const Profile = () => {
    const { t, i18n } = useTranslation();
    const [clickableText, setClickableText] = useState("ça clic vers google ?");
    const onPressText = () => {
        // setClickableText("Bird's Nest [pressed]");
        Linking.openURL('https://google.com');
      };

    i18n.changeLanguage(i18n.language == "fr" ? "en" : "fr");

  /*  const [time, setTime] = useState('');

   // const now = moment().format('LTS');

    useEffect(() => {

        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        setTime(
         hours + ':' + min + ':' + sec
        );
    }, []); */


    return (
    <View style={styles.screen}>
        <Header />
        <Text style={styles.title}>{t("profileHead")}</Text>
        <View style={styles.startContainer}>
                <AntDesign style={styles.iconContainer} name={"playcircleo"} size={30} />
                <View style={styles.timerContainer}>
                    <View style={styles.timerLine}>
                        <Text style={styles.timerText}> {t("start")} </Text>
                        <View>
                            <Text style={styles.timerText}> {moment().format('LTS')}</Text>
                        </View>
                    </View>
                    <View style={styles.timerLine}>
                        <Text  style={styles.timerText}> {t("end")} </Text>
                        <View>
                            <Text style={styles.timerText}> {moment().format('LTS')}</Text>
                        </View>
                    </View>

                </View>

        </View>
        <View>
            <Text style = {styles.title}> {t("scanQR")}</Text>
            <AntDesign style={styles.iconContainer} name = {"qrcode"} size={50} />
            <Text style={styles.title} onPress={onPressText}>
        {clickableText}
        {"\n"}
        {"\n"}
      </Text>
            
        </View>
        <View>
            <Text style = {styles.title}> {t("syncData")}</Text>
        </View>
        {/* afficher soit LinearProgress ou l'icon de données selon du status de connexion*/}
        <LinearProgress color="darkgreen" />
        <View>
            <AntDesign style={styles.iconSyncContainer} name={"sync"} size={30} />
        </View>
    </View>
  );
};


const styles = StyleSheet.create({
    screen : {
        flexDirection : 'column',
        flex : 1,
        padding : 10,
        alignItems : 'flex-start'
    },

    title : {
      //  flex : 1,
        fontSize: 16,
        fontWeight: "700",
        color : 'darkgreen',
        padding : 10,
    },

    startContainer : {
      //  flex : 2,
        width: '100%',
        flexDirection : 'row',
        justifyContent : 'space-between',
        padding : 10,
        paddingBottom : 70,

    },

    timerContainer : {
        flexDirection : 'column',
    },

    timerText : {
        fontSize: 14,
        fontWeight: "400",
        color : 'darkgreen',
        paddingRight: 30,
        paddingBottom: 20,
    },

    timerLine : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        paddingRight : 35,
    },

    scanContainer : {

        flexDirection : 'row',
        justifyContent : 'space-between',
    },

    SyncContainer : {
        flexDirection : 'row',
        justifyContent : 'space-between',
    },

    iconContainer : {
        color : 'darkgreen',
        padding : 10,
    },

    iconSyncContainer : {
        color : 'darkgreen',
        paddingTop : 20,
        paddingLeft : 150,
        alignItems : "center",
    }
});
