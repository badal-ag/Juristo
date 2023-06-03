import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Linking,
} from "react-native";
import * as FileSystem from "expo-file-system";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { StorageAccessFramework } from "expo-file-system";
import * as Font from "expo-font";
import SkeletonLoading from "./SkeletonLoading";

let customFonts = {
  Poppins_semibold: require("../assets/fonts/Poppins-SemiBold.ttf"),
  Mova_regular: require("../assets/fonts/mova_regular.otf"),
};
const Notes = () => {
  const navigation = useNavigation();
  const [res, setRes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    const getRes = async () => {
      const resRef = collection(firestore, "resources");
      const quizSnapshot = await getDocs(query(resRef, limit(10)));
      const resData = quizSnapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          name: data.name,

          url: data.url,
        };
      });
      setRes(resData);
    };
    getRes();
    setLoading(false);
  }, []);
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

  // ...

  const downloadAndSaveFile = async (url, fileName) => {
    const response = await fetch(url);
    const fileContents = await response.blob();

    // Request permission to write to the Downloads directory
    const dirUri = StorageAccessFramework.DOWNLOADS_DIRECTORY_URI;
    const permission =
      await StorageAccessFramework.requestDirectoryPermissionsAsync(dirUri);
    if (permission.granted) {
      try {
        const fileUri = `${dirUri}/${fileName}`;
        await FileSystem.writeAsStringAsync(fileUri, fileContents, {
          encoding: FileSystem.EncodingType.UTF8,
        });
        console.log("File saved successfully.");
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("Permission to write to Downloads directory not granted");
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("PdfViewer", { url: item.url })}
    >
      <View className="p-4 shadow-lg border-black rounded-lg mt-3">
        <View className="flex-row p-3 items-center">
          <View>
            <AntDesign name="pdffile1" size={28} color="red" />
          </View>
          <View className="ml-5">
            <Text
              style={{ fontFamily: "Poppins_semibold" }}
              className="text-sm"
            >
              {item.name}
            </Text>
          </View>
          <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
            <AntDesign
              name="download"
              size={24}
              color="black"
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return loading ? (
    <SkeletonLoading />
  ) : (
    <SafeAreaView classname="flex-1">
      <View>
        <View className="flex-row space-x-2 p-3 mx-4 mt-4 items-center bg-gray-200">
          <AntDesign name="search1" size={24} color="black" />
          <TextInput className="flex-1" placeholder="Search Notes Series..." />
        </View>
        <FlatList
          data={res}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
        />
      </View>
    </SafeAreaView>
  );
};

export default Notes;
