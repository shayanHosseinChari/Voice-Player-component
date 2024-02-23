/** @format */

import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
 
  View
  
} from "react-native";

import Voice from "./components/Voice";
export default function App() {
 
  return (
    <View style={styles.container}>
      <Voice url={"../assets/Music/Music.mp3"} profile={'../assets/images/user-profile.png'} />
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    padding:10,
    justifyContent: "center",
  },
  voicePlayer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    height: 90,
    borderRadius: 10,
    backgroundColor: "#141414",
  },
  userProfileWrapper: {
    width: 60,
    height: 60,
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  userProfilePic: {
    width: 59,
    height: 59,

    borderWidth: 2,
    borderRadius: 100,
  },
  micIcon: {
    position: "absolute",
    bottom: -5,
    right: 10,
    backgroundColor:"#1d1d1d",
    padding:5,
    borderRadius: 10,
    borderWidth: 1,
  },
  voiceInfoWrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    paddingLeft: 10,
    alignItems: "flex-start",
  },
  voiceRange: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  progressWrapper: {
    width: "87%",
    height: 4,
    backgroundColor: "#0042614f",
    borderRadius: 10,
    position: "relative",

    marginLeft: 10,
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  timingWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  circleProgress: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 100,
    right: 0,
    top: -3,
    zIndex: 999,
    backgroundColor: "#03aefdff",
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#c95d5d",
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
