import React, {useEffect, useState} from "react";
import {View, Text, Button, StyleSheet} from "react-native";
import Header from "../component/Header";


export const HelpView = (props) => {
    return (
        <View>
            <Header/>
            <Text> Ici toutes les questions fréquentes </Text>
            <Button
                onPress={() => props.navigation.navigate('Contact') }
                title={"N'hésitez pas à nous contacter"}/>
            <footer>
                <Button title="Go back" onPress={() => props.navigation.goBack() } />
            </footer>
        </View>
    );
};
export default HelpView;
