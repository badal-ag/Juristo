import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Border, FontFamily, FontSize, Color } from "../GlobalStyles";

import * as Font from "expo-font";

let customFonts = {
  Poppins_semibold: require("../assets/fonts/Poppins-SemiBold.ttf"),
  Mova_regular: require("../assets/fonts/mova_regular.otf"),
};

const LandingPage = () => {
  const navigation = useNavigation();
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
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <LinearGradient
          colors={["#34D6CA", "#87E6DF"]}
          className="w-full, h-24"
        >
          <Text style={styles.juRisTo}>JU RIS TO</Text>
        </LinearGradient>
      </View>
      <View>
        <Image
          className="ml-7 mt-10 rounded-31 w-307  h-352"
          source={require("../assets/990077-wallpaper2-1.png")}
          style={{
            left: 15,
          }}
        />
      </View>
      <View className="flex  items-center justify-center">
        <TouchableOpacity
          className=" flex  items-center justify-center h-12 w-44 bg-gray-700 rounded-lg mt-4"
          onPress={() => navigation.replace("Login")}
        >
          <Text
            className="text-white  text-lg"
            style={{ fontFamily: "Poppins_semibold" }}
          >
            Getting Started{" "}
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity >
          <Image
            resizeMode="cover"
            source={require("../assets/icons8exterior100-1.png")}
          />
        </TouchableOpacity> */}
      </View>

      <View className="absolute bottom-0 inset-x-0">
        <LinearGradient
          colors={["#34D6CA", "#87E6DF"]}
          className=" flex  items-center justify-center w-full  h-24   "
        >
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  juRisTo: {
    top: 27,
    left: 85,
    fontSize: 48,
    fontFamily: FontFamily.movaRegular,
    textAlign: "left",
    position: "absolute",
  },
});

export default LandingPage;
