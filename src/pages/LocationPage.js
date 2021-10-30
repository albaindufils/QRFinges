import React, { useState, useEffect } from "react";
import { Switch, Text, View } from "react-native";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
const BACKGROUND_LOCATION_UPDATES_TASK = "START_LOCATION";
const handleLocationUpdate = ({ data, error }) => {
  console.log("location update", data);
};
TaskManager.defineTask(BACKGROUND_LOCATION_UPDATES_TASK, handleLocationUpdate);

export const LocationPage = () => {
  const [currentLocation, setCurrentLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);

  const [locations, setLocations] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  let watch;
  useEffect(() => {
    Location.requestForegroundPermissionsAsync();
    /* let { status } = await Location.requestBackgroundPermissionsAsync(); */
    /* if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    } */
    if (isEnabled) {
      /* Location.startLocationUpdatesAsync("START_LOCATION", {
        accuracy: 4,
        timeInterval: 3000,
      }); */

      watch = Location.watchPositionAsync(
        { distanceInterval: 5, accuracy: Location.Accuracy.Highest },
        (l) => {
          console.log(l);
          setCurrentLocation(l);
          setLocations((old) => [l, ...old]);
        }
      );
      /* const location = await Location.getCurrentPositionAsync({
          accuracy: 1,
        }); */
      /* const location = await Location.getCurrentPositionAsync({
          accuracy: 1,
        });
        console.log(location);
        setCurrentLocation(location);
        setLocations([location, ...locations]);
        locations.push(location);
        setTimeout(() => {
          setTimer(timer + 1);
        }, 1000); */
    } else {
      setLocations([]);
      // Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_UPDATES_TASK);
    }
  }, [isEnabled]);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (currentLocation) {
    text = JSON.stringify(currentLocation);
  }

  return (
    <View style={{ flex: 1, alignItems: "center", marginTop: 50 }}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={setIsEnabled}
        value={isEnabled}
      />
      <Text>Number of locations: {locations.length}</Text>

      {isEnabled ? (
        <>
          <Text>Current location: {text}</Text>
        </>
      ) : (
        <Text>Feature desactivée</Text>
      )}
      {locations.map((l, i) => (
        <Text key={`text-${i}`}>{JSON.stringify(l)}</Text>
      ))}
    </View>
  );
};
