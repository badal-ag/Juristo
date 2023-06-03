import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function CartProductItem ( { item } ) {

    const navigation = useNavigation();

    const getProductDetails = () => {
        navigation.navigate('ProductDetails', { id: item[0].id } );
    }

    return (
        
        <TouchableOpacity onPress={getProductDetails} style={styles.root}>

            <Image style={styles.image} source={{ uri: item[0].img }}/>
        
            <View style={styles.rightContainer}>
                
                <Text style={styles.title} numberOfLines={3}>{ item[0].name }</Text>

                <Text style={styles.price}>
                    Rs. { item[0].price }
                </Text>

                <View style={styles.container}>

                    <Text style={styles.quantity}>
                        Quantity: { item[0].quantity }
                    </Text>

                </View>

                <Text style={styles.total}>
                    Rs. { item[0].price * item[0].quantity }
                </Text>

            </View>

        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({

    root: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginVertical: 5,
        borderBottomColor: '#d1d1d1',
        borderBottomWidth: 1
    },

    image: {
        flex: 2,
        height: 100,
        resizeMode: 'contain', 
        borderRadius: 10,
        marginTop: 3,
        marginBottom: 3
    },

    rightContainer: {
        padding: 10,
        flex: 3,
    },

    title: {
        fontSize: 15,
    },

    container: {
        flexDirection:"row",
        width:"100%",
        alignItems:"center",
    },

    price: {
        fontSize: 13,
        fontWeight: '600',
        color:"#b3aeae",
    },

    quantity: {
        fontSize: 13,
        fontWeight: '400',
        width: '50%'
    },

    total: {
        fontSize: 15,
        fontWeight: 'bold',
    },

});