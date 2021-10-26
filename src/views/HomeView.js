import React from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import { Logo } from "../component/Logo";
// import {
//   NavigationContext
// } from '@react-navigation/native';

// import { Navigation } from "../component/Navigation";
// import { Navigation } from "../component/Nav_test";

// import LocationRecording from "pages/LocationRecording";

// const navigation = React.useContext(NavigationContext);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 40,
    color: "#087940",
    textDecorationLine: "underline",
    textAlign: "center",
  },
});

const HomeView = ({navigation}) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => {
            console.log("Hamburger");
          }}
        >
          <Image
            source={{
              uri: "https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png",
            }}
            style={{ width: 35, height: 35, marginLeft: 15 }}
          />
        </TouchableOpacity>

        <View style={styles.container}>
          <View style={{ marginBottom: 50 }}>
            <Logo />
          </View>
          <View>
          <Button
        onPress={() => navigation.navigate('SignIn')}
        title="Sign In"
      />
      <Button
        onPress={() => navigation.navigate('SignOn')}
        title="Sign On"
      />
          <Button
        onPress={() => navigation.navigate('Location')}
        title="Go to Record Location"
      />
      
            {/* <Text style={styles.buttonText}>Finges</Text> */}
            <Text style={styles.buttonText}>Map</Text>
            <Text style={styles.buttonText}>Experience</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default HomeView;
