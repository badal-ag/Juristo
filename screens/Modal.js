import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { firestore } from "../firebaseConfig";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

let customFonts = {
  poppins_semibold: require("../assets/fonts/Poppins-SemiBold.ttf"),
  Mova_regular: require("../assets/fonts/mova_regular.otf"),
};

const uid ="rnqNMlhiExXc4OCuWUYOYbbqnYr1";
const Modal = () => {
  const navigation = useNavigation();
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const incompleteForm = !name || !email;

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
 /* const getUid = async () => {
    const uid = await AsyncStorage.getItem("uid");
    setUid(uid);
  };
  getUid();*/
  const updatePost = async () => {
    const docRef = doc(firestore, "users", uid);
    await updateDoc(docRef, {
      name: name,
      email: email,
      timestamp: serverTimestamp(),
    }).then(() => navigation.navigate("DashBoard"));
  };
  
  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        className="flex-1"
        colors={["#2FD0C4", "#23A79D", "#19857C"]}
      >
        <View className="justify-center items-center m-5 mt-9">
          <Text className="text-4xl" style={{ fontFamily: "Mova_regular" }}>
            Welcome to Juristo
          </Text>
        </View>
        <View>
          <View>
            <Text
              className="ml-6 text-xl text-white mt-8"
              style={{ fontFamily: "poppins_semibold" }}
            >
              What's Your Name?
            </Text>
            <View className=" border-white border-2 space-x-3 rounded-lg border-opacity-100 bg-transparent h-12  ml-5 mr-5 mt-2  flex-row p-2">
              <Ionicons name="person-outline" size={26} color="white" />
              <TextInput
                value={name}
                onChangeText={(e) => setName(e)}
                style={{ fontFamily: "poppins_semibold" }}
                className="flex-1 text-white"
                placeholder="Enter text here"
              />
            </View>
          </View>
          <View>
            <Text
              className="ml-6 text-xl mt-8 text-white"
              style={{ fontFamily: "poppins_semibold" }}
            >
              Enter Your Email
            </Text>
            <View className=" border-white border-2 space-x-3 rounded-lg border-opacity-100 bg-transparent h-12  ml-5 mr-5 mt-2  flex-row p-2">
              <Ionicons name="ios-mail-outline" size={26} color="white" />
              <TextInput
                value={email}
                onChangeText={(e) => setEmail(e)}
                style={{ fontFamily: "poppins_semibold" }}
                className="flex-1 text-white"
                placeholder="Enter text here"
              />
            </View>
          </View>

          <View className="flex justify-center items-center">
            <TouchableOpacity
              disabled={incompleteForm}
              onPress={() => updatePost()}
              className="bg-black mt-8 rounded-md h-14 w-44 justify-center items-center"
            >
              <Text
                className="text-white text-lg"
                style={{ fontFamily: "poppins_semibold" }}
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Modal;
