import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient/build/LinearGradient";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import { useNavigation } from "@react-navigation/native";

let customFonts = {
  poppins_semibold: require("../assets/fonts/Poppins-SemiBold.ttf"),
  Mova_regular: require("../assets/fonts/mova_regular.otf"),
};
const Summary = ({route}) => {
 const info = route.params;
 const score = info.score;
 const navigation = useNavigation()

  const [fontsLoaded, setFontsLoaded] = useState(false);

  async function loadFontsAsync() {
    await Font.loadAsync(customFonts);
    setFontsLoaded(true);
  }
  useEffect(() => {
    loadFontsAsync();
  }, []);
  if (!fontsLoaded) {
    return null;
  }
 
  return (
    <SafeAreaView className="flex-1 ">
      <LinearGradient
        style={styles.editProfile}
        locations={[0, 1]}
        colors={["#30d5c8", "#043935"]}
      >
        <View className="bg-white h-3/4 w-3/  mr-7 ml-7 mt-16 shadow-lg rounded-md justify-content items-center">
          <View className="justify-content items-center">
            {score >= 7 && (
              <View className="justify-content items-center">
                <Text
                  style={{ fontFamily: "Mova_regular" }}
                  className="text-6xl text-green-500 mt-6"
                >
                  Great!
                </Text>
                <Text
                  className="text-lg"
                  style={{ fontFamily: "poppins_semibold" }}
                >
                  Your Score is
                </Text>
                <Text
                  className="text-9xl text-green-600"
                  style={{ fontFamily: "Mova_regular" }}
                >
                  {score}
                </Text>
              </View>
            )}
            {score >= 5 && score < 7 && (
              <View className="justify-content items-center">
                <Text
                  className="text-6xl text-yellow-500 mt-6"
                  style={{ fontFamily: "Mova_regular" }}
                >
                  Average!
                </Text>
                <Text
                  className="text-lg"
                  style={{ fontFamily: "poppins_semibold" }}
                >
                  Your Score is
                </Text>
                <Text
                  className="text-9xl text-yellow-600"
                  style={{ fontFamily: "Mova_regular" }}
                >
                  {score}
                </Text>
              </View>
            )}
            {score < 5 && (
              <View className="justify-content items-center">
                <Text
                  className="text-5xl text-red-500 mt-6"
                  style={{ fontFamily: "Mova_regular" }}
                >
                  Poor!
                </Text>
                <Text
                  className="text-lg  "
                  style={{ fontFamily: "poppins_semibold" }}
                >
                  Your Score is
                </Text>
                <Text
                  className="text-9xl text-red-600"
                  style={{ fontFamily: "Mova_regular" }}
                >
                  {score}
                </Text>
              </View>
            )}
          </View>

          <View>
            <View className="flex-row m-2 justify-content items-center">
              <View>
                <Ionicons name="checkmark-circle" size={24} color="green" />
              </View>
              <Text
                className="ml-2 "
                style={{ fontFamily: "poppins_semibold" }}
              >
                Correct Answer {score}
              </Text>
            </View>
            <View className="flex-row ml-2 justify-content items-center">
              <View>
                <Entypo name="circle-with-cross" size={24} color="red" />
              </View>
              <Text
                className="ml-2 "
                style={{ fontFamily: "poppins_semibold" }}
              >
                Wrong Answer {10 - score}
              </Text>
            </View>
          </View>
          <View>
            <View>
              <Text
                className="text-lg mt-6"
                style={{ fontFamily: "poppins_semibold" }}
              >
                Improve your Score
              </Text>

              <TouchableOpacity onPress={()=>navigation.navigate('Notes')} className="bg-black mt-8 rounded-md h-14 w-30 justify-center items-center flex-row">
                <FontAwesome name="file-pdf-o" size={30} color="white" />
                <Text
                  className="text-white ml-4 text-lg"
                  style={{ fontFamily: "poppins_semibold" }}
                >
                  Notes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Summary;
const styles = StyleSheet.create({
  editProfile: {
    flex: 1,
    height: 640,
    overflow: "hidden",
    backgroundColor: "transparent",
    width: "100%",
    borderStyle: "solid",
  },
});
