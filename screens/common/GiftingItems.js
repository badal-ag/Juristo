import { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  limit,
} from "firebase/firestore";
import { app, auth, firestore } from "../../firebaseConfig";
export default function GiftingItems() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetch() {
      const queriesColl = collection(firestore, "products");
      const queriesList = query(
        queriesColl,
        where("displayGifting", "==", "Yes"),
        limit(5)
      );
      const querySnapshot = await getDocs(queriesList);
      const products = querySnapshot.docs.map((doc) => doc.data());
      setProducts(products);
      setLoading(false);
      return products;
    }
    fetch();
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ height: "100%", width: "100%" }}
        data={products}
        numColumns={5}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ProductDetails", { id: item.pid });
            }}
            style={styles.root}
          >
            <Image source={{ uri: item.img1 }} style={styles.img} />

            <View style={styles.name}>
              <Text style={styles.nameText} numberOfLines={2}>
                {item.name}
              </Text>
            </View>

            <Text style={styles.description} numberOfLines={3}>
              {item.description}
            </Text>

            <View style={styles.price}>
              <View style={{ width: "80%" }}>
                <Text style={styles.priceText}>Rs. {item.sellingPrice}</Text>
              </View>

              <View style={{ width: "20%" }}>
                <Image
                  source={require("../images/add.png")}
                  style={styles.add}
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    marginTop: 30,
    backgroundColor: "#FFF",
    height: 250,
    width: 200,
    elevation: 2,
    borderRadius: 10,
    padding: 15,
    marginRight: 30,
    marginLeft: 2,
    marginBottom: 5,
  },

  img: {
    width: 170,
    height: 110,
    borderRadius: 10,
    resizeMode: "contain",
  },

  name: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },

  nameText: {
    color: "#4f4a4a",
    fontSize: 12,
  },

  description: {
    fontSize: 9,
    color: "#4f4a4a",
  },

  price: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
    width: "100%",
  },

  priceText: {
    fontSize: 15,
  },

  add: {
    alignSelf: "flex-end",
    width: 25,
    height: 25,
  },
});
