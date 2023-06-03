import * as React from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "../firebaseConfig";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "./Loading";

const uid = "rnqNMlhiExXc4OCuWUYOYbbqnYr1";
const Dashboard = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = React.useState(true);

  React.useLayoutEffect(() => {
    onSnapshot(doc(firestore, "users", uid), (snapshot) => {
      const userData = snapshot.data();

      if (!userData || !userData.email || !userData.name) {
        navigation.navigate("Modal");
      }
      setLoading(false);
    });
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.dashboard}>
        <LinearGradient
          style={[
            styles.dashboardItem,
            styles.continuePosition,
            styles.dashboardLayout,
          ]}
          locations={[0, 1]}
          colors={["#30d5c8", "#fff"]}
        />
        <Text style={styles.dashboard1}>Dashboard</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Quiz")}
          style={[styles.rectangleParent, styles.groupLayout]}
        >
          <View
            style={[
              styles.groupChild,
              styles.groupChildShadowBox,
              styles.groupLayout,
            ]}
          />
          <Image
            style={[styles.icons8Exam801, styles.icons8Layout]}
            resizeMode="cover"
            source={require("../assets/icons8exam80-1.png")}
          />
          <Text
            style={[
              styles.dailyQuizes,
              styles.profileTypo,
              styles.profileTypo1,
            ]}
          >
            Daily Quizes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Chatbot")}>
          <View style={[styles.rectangleGroup, styles.groupLayout]}>
            <View
              style={[
                styles.groupChild,
                styles.groupChildShadowBox,
                styles.groupLayout,
              ]}
            />
            <Image
              style={[styles.icons8Bot801, styles.icons8Layout]}
              resizeMode="cover"
              source={require("../assets/icons8bot80-1.png")}
            />
            <Text
              style={[styles.talkToJu, styles.profileTypo, styles.profileTypo1]}
            >
              Talk to Ju Ris To
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={[styles.rectangleContainer, styles.groupViewPosition]}
        >
          <View
            style={[
              styles.groupChild,
              styles.groupChildShadowBox,
              styles.groupLayout,
            ]}
          />
          <Text
            style={[styles.profile, styles.profileTypo, styles.profileTypo1]}
          >
            Profile
          </Text>
          <Image
            style={[styles.icons8CheckedUserMale641, styles.icons8Layout]}
            resizeMode="cover"
            source={require("../assets/icons8checkedusermale64-1.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Notes")}>
          <View style={[styles.groupView, styles.groupViewPosition]}>
            <View
              style={[
                styles.groupChild,
                styles.groupChildShadowBox,
                styles.groupLayout,

              ]}
            />
            <Text
              style={[
                styles.loginSignup,
                styles.profileTypo,
                styles.profileTypo1,
                { alignSelf: 'center' }

              ]}
            >
              Resources
            </Text>
            <Image
              style={[styles.icons8Exam801, styles.icons8Layout]}
              resizeMode="cover"
              source={require("../assets/icons8-note-64.png")}
            />
          </View>
        </TouchableOpacity>

        <Text style={{ fontFamily: "Mova_regular" }} className='text-5xl ml-4 mt-3 '>Juristo</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dashboardLayout: {
    width: Dimensions.get('window').width,
    position: "absolute",

  },
  continuePosition: {
    top: 0,
    left: 0,
  },
  groupLayout: {
    height: 100,
    width: 147,
    position: "absolute",

  },
  groupChildShadowBox: {
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    backgroundColor: Color.darkslategray,
    top: 0,
    left: 0,
  },
  icons8Layout: {
    height: 60,
    width: 60,
    left: 44,
    position: "absolute",
  },
  profileTypo: {
    color: Color.white,
    fontFamily: FontFamily.poppinsSemibold,
    fontWeight: "500",
  },
  profileTypo1: {
    fontSize: FontSize.size_base,
    top: 68,
    color: Color.white,
    textAlign: "left",
    position: "absolute",
  },
  groupViewPosition: {
    top: 351,
    height: 100,
    width: 147,
    position: "absolute",
  },
  continueLayout: {
    height: 47,
    width: 312,
    position: "absolute",
  },
  dashboardChild: {
    top: 84,
    height: 557,
    left: 0,
    width: 360,
  },
  dashboardItem: {
    height: 84,
    backgroundColor: "transparent",
  },
  dashboard1: {
    top: 116,
    marginLeft: 10,
    fontSize: FontSize.size_xl,
    color: Color.darkslategray,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowRadius: 4,
    textAlign: "left",
    fontFamily: FontFamily.poppinsSemibold,
    fontWeight: "500",
    left: 24,
    position: "absolute",
  },
  dashboardInner: {
    top: 26,
    left: 295,
    width: 30,
    height: 28,
    position: "absolute",
  },
  groupChild: {
    borderRadius: Border.br_xs,
  },
  icons8Exam801: {
    top: 5,
  },
  dailyQuizes: {
    left: 25,
  },
  rectangleParent: {
    top: 209,
    // left:22,
    left: 30,
  },
  icons8Bot801: {
    top: 6,
  },
  talkToJu: {
    left: 11,
  },
  rectangleGroup: {
    top: 210,
    // left:189,
    left: 210,
  },
  profile: {
    left: 47,
  },
  icons8CheckedUserMale641: {
    top: 8,
  },
  rectangleContainer: {
    left: 30,
  },
  loginSignup: {
    left: 21,
  },
  groupView: {
    left: 210,
  },
  groupIcon: {
    top: 17,
    left: 16,
    width: 50,
    height: 50,
    position: "absolute",
  },
  groupChild1: {
    borderRadius: Border.br_sm,
  },
  continue: {
    fontSize: FontSize.size_lg,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  rectangleParent1: {
    top: 491,
    left: 24,
    width: 312,
  },
  dashboard: {
    backgroundColor: Color.white,
    flex: 1,
    alignContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    overflow: "hidden",
  },
});

export default Dashboard;
