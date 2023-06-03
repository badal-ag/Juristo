import { useState, useRef, useEffect } from "react";
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
import * as FirebaseRecaptcha from "expo-firebase-recaptcha";
import { getAuth, PhoneAuthProvider } from "firebase/auth";
import { app, auth, firestore } from "../../firebaseConfig";

import * as Font from "expo-font";

let customFonts = {
  Poppins_semibold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
  Mova_regular: require("../../assets/fonts/mova_regular.otf"),
};
const firebaseConfig = {
  apiKey: "AIzaSyBx4O-qbAKZQldiOjm2beil6L3gxftFWlQ",
  authDomain: "juristo.firebaseapp.com",
  projectId: "juristo",
  storageBucket: "juristo.appspot.com",
  messagingSenderId: "500246453376",
  appId: "1:500246453376:web:87d99f821f9b37248eda65",
};
export default function Login() {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const navigation = useNavigation();

  const recaptchaVerifier = useRef(null);
  const [verificationId, setVerificationId] = useState("");
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

  const sendVerification = async (data) => {
    if (loading) {
      return;
    }
    setLoading(true);

    const { mobile } = data;
    const phoneNumber = "+91".concat(mobile);
    const phoneProvider = new PhoneAuthProvider(auth);

    try {
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      setVerificationId(verificationId);
      ToastAndroid.show("OTP Sent Successfully", ToastAndroid.SHORT);
      setLoading(false);
      navigation.navigate("VerifyOTP", {
        verificationId: verificationId,
        phoneNumber: phoneNumber,
      });
    } catch (err) {
      Alert.alert("An Unexpected Error Occured", "Kindly try Again Later.");
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <FirebaseRecaptcha.FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
          attemptInvisibleVerification={true}
          androidHardwareAccelerationDisabled={true}
          androidLayerType="software"
        />

        <Text style={styles.title}>Login to JURISTO</Text>
        <Image
          source={require('../../assets/judge.jpg')}

          style={styles.img}
        />

        <CustomInput
          name="mobile"
          placeholder="Enter Mobile Number"
          control={control}
          keyboardType="number-pad"
          rules={{
            required: "Mobile Number is Required",
            minLength: {
              value: 10,
              message: "Mobile Number should have 10 Digits",
            },
            maxLength: {
              value: 10,
              message: "Mobile Number should have 10 Digits",
            },
          }}
        />

        <CustomButton
          text={loading ? <ActivityIndicator /> : "Verify Mobile Number"}
          onPress={handleSubmit(sendVerification)}
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
    marginTop: 40,
    marginBottom: 60,
    marginLeft: 25,
    marginRight: 20,
    alignSelf: "center",

    height: 300,
    width: "100%",
  },

  title: {
    fontFamily: "Mova_regular",
    marginTop: 40,
    marginHorizontal: 10,
    fontSize: 38,
  },
});
