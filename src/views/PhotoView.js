import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Image } from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import { styles } from "../component/styles";
import { Camera } from "expo-camera";
import { askCameraPermission } from "../services/cameraPermission";
import { useUserContext } from "../services/user-context";
import { t } from "i18next";
import { storage, addImageToUser } from "../services/firebase";
import { ref, uploadBytes } from "@firebase/storage";
import LinearProgress from "react-native-elements/dist/linearProgress/LinearProgress";

const CameraView = (props) => {
  const { state } = useUserContext();
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [picture, setPicture] = useState("uri");
  const [isPicked, setIsPicked] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const isFocused = useIsFocused();
  let camera;
  let p;
  let date;
  let uri;
  askCameraPermission();
  const takePicture = async () => {
    p = null;
    if (camera) {
      const options = { quality: 0.5 };
      p = await camera.takePictureAsync(options);
    }
    console.log(" photo ", p.uri);
    if (p) {
      setPicture(p.uri);
      setPhoto(p);
      setIsPicked(true);
    }
  };

  const savePicture = async () => {
    setIsUploading(true);
    const response = await fetch(picture);
    let blob = await response.blob();

    date = new Date();
    uri =
      date.toISOString().toLocaleLowerCase("fr-CH") +
      "_" +
      picture.substring(picture.lastIndexOf("/") + 1);

    const storageRef = ref(storage, "Photos/" + uri);

    /* addRefPicture(state.id, uri, date); */

    uploadBytes(storageRef, blob)
      .then(() => {
        addImageToUser(state.userId, storageRef.name);
        blob = null;
        console.log("Image uploaded!");
        newPicture();
      })
      .catch((e) => {
        console.log(e);
        newPicture();
      });

    //  addRefPicture(state.id, storageRef, date);
  };

  const newPicture = () => {
    p = null;
    setIsPicked(false);
    setPhoto(null);
    setPicture(null);
    setIsUploading(false);
  };

  return (
    <>
      {!isPicked ? (
        <Camera
          style={styles.camera}
          type={type}
          ref={(refs) => {
            camera = refs;
          }}
        >
          <View style={styles.cameraButtonContainer}>
            <Ionicons
              name="camera-reverse"
              style={styles.cameraButton}
              size={40}
              color="green"
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            />
            <MaterialIcons
              name="enhance-photo-translate"
              style={styles.cameraButton}
              size={60}
              color="green"
              onPress={takePicture}
            />
          </View>
        </Camera>
      ) : (
        <>
          {isUploading ? <LinearProgress color="darkgreen" /> : null}
          <Image style={styles.camera} source={{ uri: picture }} />
          {!isUploading && (
            <>
              <TouchableOpacity
                style={styles.customBtnGreen}
                onPress={newPicture}
              >
                <Text style={{ color: "cornsilk" }}>{t("newPicture")}</Text>
              </TouchableOpacity>
              <MaterialCommunityIcons
                name="content-save-move"
                style={styles.cameraButton}
                size={40}
                color="green"
                onPress={savePicture}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default CameraView;
