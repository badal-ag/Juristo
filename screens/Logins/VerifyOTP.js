import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  Alert,
  ToastAndroid,
} from "react-native";
import { useForm } from "react-hook-form";
import CustomInput from "../common/CustomInput";
import CustomButton from "../common/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import {
  getAuth,
  onAuthStateChanged,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import {
  getFirestore,
  setDoc,
  doc,
  Timestamp,
  query,
  where,
  getDocs,
  collection,
} from "firebase/firestore";
import { app, auth, firestore } from "../../firebaseConfig";
import LottieView from "lottie-react-native";

let customFonts = {
  Poppins_semibold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
  Mova_regular: require("../../assets/fonts/mova_regular.otf"),
};
export default function VerifyOTP({ route }) {
  const info = route.params;
  const verificationId = info.verificationId;
  const phoneNumber = info.phoneNumber;

  const [loading, setLoading] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();

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

  const verifyOTP = async (data) => {
    if (loading) {
      return;
    }
    setLoading(true);

    const { verificationCode } = data;

    try {
      const credential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      const authResult = await signInWithCredential(auth, credential);
      const date = new Timestamp.now();
      const user = auth.currentUser;
      const uid = user.uid;
      if (uid) {
        await AsyncStorage.setItem("uid", uid);
        setUser(uid);
        console.log("success");
      }
      const myDoc = doc(firestore, "users", uid);

      const docData = {
        uid: uid,
        phone: phoneNumber,

        createdAt: date,
        updatedAt: date,
      };

      await setDoc(myDoc, docData, { merge: true })
        .then(() => {
          ToastAndroid.show("User Verified Successfully", ToastAndroid.SHORT);
          setLoading(false);
          navigation.navigate("DashBoard");
        })
        .catch((error) => {
          Alert.alert(
            "Connection Timeout!",
            "An Unexpected Error occured. Kindly try again."
          );
          setLoading(false);
        });
    } catch (err) {
      Alert.alert(
        "Incorrect OTP!",
        "An Unexpected Error occured. Kindly check the OTP and try again."
      );
    }
  };

  const resendOTP = () => {
    navigation.goBack();
    setLoading(false);
  };

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Verify OTP</Text>

        <LottieView
          style={styles.img}
          source={require("../../assets/animation/verification.json")}
          autoPlay
        />

        <CustomInput
          name="verificationCode"
          placeholder="Enter OTP"
          control={control}
          keyboardType="number-pad"
          rules={{
            required: "OTP is Required",
            minLength: {
              value: 6,
              message: "OTP consists of 6 Digits only",
            },
            maxLength: {
              value: 6,
              message: "OTP consists of 6 Digits only",
            },
          }}
        />

        <CustomButton
          text={loading ? <ActivityIndicator /> : "Submit"}
          onPress={handleSubmit(verifyOTP)}
        />

        <CustomButton
          text={loading ? <ActivityIndicator /> : "Resend Code"}
          onPress={resendOTP}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  img: {
    marginTop: 30,
    marginBottom: 60,
    alignSelf: "center",
    borderTopRightRadius: 80,
    borderBottomLeftRadius: 80,
    height: 300,
    width: "80%",
  },

  title: {
    fontFamily: "Mova_regular",
    marginTop: 40,
    marginHorizontal: 10,
    fontSize: 32,
  },
});
