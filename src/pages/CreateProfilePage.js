import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import Header from "../component/Header";
import { useTranslation } from "react-i18next";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import CreateProfilePageView from "../views/CreateProfilePageView";

export const CreateProfilePage = (props) => {
    return (
        <CreateProfilePageView/>
        // <View>
        //     <Header/>
        //     <AntDesign name={"phone"} size={30}/>
        //     <AntDesign name={"mail"} size={30}/>
        //     <FontAwesome name={"address-book"} size={30}/>

        // </View>
    );
};

export default CreateProfilePage;