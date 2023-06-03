import { StyleSheet, Text, Pressable } from 'react-native';


export default function CustomButton ({ onPress, text, type = "PRIMARY", bgColor, fgColor }) {

    return (

        <Pressable 
            onPress={onPress} 
            style={[
                styles.container, 
                styles[`container_${type}`],
                bgColor ? {backgroundColor: bgColor} : {},
            ]}
        >

            <Text 
                style={[
                    styles.text, 
                    styles[`text_${type}`],
                    fgColor ? {color: fgColor} : {},
                ]}>   
                {text} 
            </Text>
            
        </Pressable>
        
    );

}


const styles = StyleSheet.create({

    container: {
        height: 50,
        width: "88%",
        borderRadius: 5,
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: 54,
        alignItems: 'center',
        marginTop: 12,
    },

    container_PRIMARY: {
        backgroundColor:"#000",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:10,
        padding:12,
        marginBottom:15,
    },

    container_SECONDARY: {
        borderColor: '#3b71f3',
        borderWidth: 2,
    },

    container_TERTIARY: {

    },

    text: {
        fontWeight: 'bold',
        color: 'white',
    },

    text_SECONDARY: {
        color: '#3b71f3',
    },

    text_TERTIARY: {
        color: 'gray',
    },

    
});
