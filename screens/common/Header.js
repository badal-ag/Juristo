import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
    
    const navigation = useNavigation();
    
    const checkOrders = () => { 
        navigation.navigate("Cart");
    }

    const goToSearch = () => { 
        navigation.navigate("Product Search");
    }

    return(
        <View style={styles.root}>
            <View style={styles.container}>

                <View style={{ width: "50%" }}>
                    <Text style={{ fontFamily: "Montserrat_700Bold", fontSize: 22 }}>Jyoti Store</Text>
                </View>
                
                <View style={{ width: "50%", alignItems: "flex-end" }}>
                    <View style={{ flexDirection: 'row' }}>

                        <TouchableOpacity onPress={goToSearch}>
                            <Ionicons name="ios-search"
                                size={22}
                                color="#000"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={checkOrders}>
                            <Image
                                source={require('../images/bag-2.png')}
                                style={{ width: 16, height: 20, marginLeft: 20 }}
                            />
                        </TouchableOpacity>

                    </View>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    root: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },

    container: {
        flexDirection:"row",
        width:"100%",
        marginTop:20,
        alignItems:"center"
    }

});
