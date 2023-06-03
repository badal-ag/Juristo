import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  StyleSheet,
  Pressable,
  Text,
  View,
  Linking,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { firestore } from "../firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
  updateDocs,
  onSnapshot
} from "firebase/firestore";

import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useEffect, useLayoutEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
let customFonts = {
  poppins_semibold: require("../assets/fonts/Poppins-SemiBold.ttf"),
};

const EditProfile = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [uid, setUid] = useState(null);
  const [docId, setDocId] = useState(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  useLayoutEffect(() => {
    const getUid = async () => {
      const uid = await AsyncStorage.getItem("uid");
      setUid(uid);
    };
    getUid();

    const getUserDetails = async () => {
      if (uid) {
        const userDocRef = doc(firestore, "users", uid);
        onSnapshot(userDocRef, (snapshot) => {
          const userData = snapshot.data();
          setName(userData.name);
          setEmail(userData.email);
        });
      }
    };

    getUserDetails();
  }, [uid]);
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

  const updatePost = async () => {
    const docRef = doc(firestore, "users", uid);
    await updateDoc(docRef, {
      name: name,
      email: email,
      timestamp: serverTimestamp(),
    }).then(() => navigation.navigate("DashBoard"));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        style={styles.editProfile}
        locations={[0, 1]}
        colors={["#30d5c8", "#043935"]}
      >
        <View className="flex justify-between flex-row m-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View>
              <Ionicons name="chevron-back-circle" size={44} color="black" />
            </View>
          </TouchableOpacity>
        
        </View>
        <View className=" flex justify-center items-center">
          <TouchableOpacity>
            <Image
              className="rounded-full h-36 w-36 "
              resizeMode="cover"
              source={{
                uri: "data:image/png;base64,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",
              }} // or provide a default image source
            />
          </TouchableOpacity>
        </View>

        <View>
          <View>
            <Text
              className="ml-6 text-xl text-white mt-4"
              style={{ fontFamily: "poppins_semibold" }}
            >
              Name
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
              className="ml-6 text-xl mt-2 text-white"
              style={{ fontFamily: "poppins_semibold" }}
            >
              Email
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
              onPress={() =>
                updatePost().then(() => navigation.navigate("Profile"))
              }
              className="bg-black mt-8 rounded-md h-14 w-44 justify-center items-center"
            >
              <Text
                className="text-white text-lg"
                style={{ fontFamily: "poppins_semibold" }}
              >
                Update
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

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

export default EditProfile;
