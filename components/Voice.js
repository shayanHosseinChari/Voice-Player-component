/** @format */

import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Audio } from "expo-av";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import Slider from "@react-native-community/slider";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Voice({url}) {
  const [soundB, setSound] = useState();
  const [isShowBtn, setIsShowBtn] = useState(true);
  const [timeDidPlay, setTimeDidPlay] = useState("00:00");
  const [MainTime, setMainTime] = useState("00:00");
  const [width, setWidth] = useState(0);
  let timeSpend;
  const handleBtns = async (url = "",isResum=false) => {
    if(isResum){
       await soundB.playAsync();
      setIsShowBtn(false);
    }
    if (timeDidPlay > "00:00") {
      await soundB.playAsync();
      setIsShowBtn(false);
    } else {
      const { sound } = await Audio.Sound.createAsync(
        require("./assets/Music/Music.mp3")
      );
      setSound(sound);
     
      // if you want to get audio from server unComment this
      // ===============const {sound} = await Audio.Sound.createAsync({uri: url})==============
      sound.setOnPlaybackStatusUpdate((s) => {
        console.log(s);
        setMainTime(new Date(s.durationMillis).toISOString().slice(14, 19));
        timeSpend = Math.floor(s.positionMillis);
        setTimeDidPlay(new Date(timeSpend).toISOString().slice(14, 19)); // HH:MM:SS
        setWidth((s.positionMillis * 100) / s.durationMillis);
      });

      if (isShowBtn) {
        sound.replayAsync();
        await sound.playAsync(timeDidPlay);
        setIsShowBtn(false);
      }
    }
  };

  const pause = () => {
    soundB.pauseAsync();
    setIsShowBtn(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.voicePlayer}>
        <Pressable style={styles.userProfileWrapper}>
          <Image
            source={require("../assets/images/user-profile.png")}
            style={styles.userProfilePic}
          />
          <View style={styles.micIcon}>
            <FontAwesome name='microphone' color={"#00a2ff"} size={15} />
          </View>
        </Pressable>
        <View style={styles.voiceInfoWrapper}>
          <View style={styles.voiceRange}>
            {isShowBtn ? (
              <Pressable onPress={handleBtns} style={{borderWidth:1,borderColor:'black',backgroundColor:"#00a2ff",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:200,width:26,height:26}}>
                <Entypo name='controller-play' color={"#ffffff"} size={16} />
              </Pressable>
            ) : (
              <Pressable onPress={pause} style={{borderWidth:1,borderColor:'black',backgroundColor:"#00a2ff",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:200,width:26,height:26}}>
                <Entypo name='controller-paus' color={"#ffffff"} size={16} />
              </Pressable>
            )}

            <View
              style={{
                width: "88%",
                display: "flex",
                flexDirection: "row-reverse",
              }}
            >
              <Slider
                step={1}
                maximumValue={100}
                minimumValue={0}
                style={{ width: "100%", direction: "rtl" }}
                value={width}
                thumbTintColor={"#00a2ff"}
                maximumTrackTintColor={"#00a2ff"}
                minimumTrackTintColor={"#00a2ff"}
                onValueChange={(value) => {
                   
                    
                   
                }}
              />
            </View>
          </View>
          <View style={styles.timingWrapper}>
            <Text style={{ color: "#5f5f5f" }}>{timeDidPlay}</Text>
            <Text style={{ color: "#5f5f5f" }}>{MainTime}</Text>
          </View>
        </View>
      </View>
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
