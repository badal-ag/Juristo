import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Controller } from 'react-hook-form';

export default function CustomInput ({control, name, rules={}, placeholder, keyboardType}) {

    return (

        <Controller 
            control={control}
            name={name}
            rules={rules}
            render={({field: {value, onChange, onBlur}, fieldState: {error} }) => (
                <>
                    <View style={[styles.container, {borderColor: error ? 'red' : '#e8e8e8'}]}>
                        <TextInput 
                            value={value} 
                            onChangeText={onChange} 
                            onBlur={onBlur} 
                            placeholder={placeholder}
                            keyboardType={keyboardType}
                        />
                    </View>
                    {error && (
                        <Text style={{color: 'red', width: '80%',}}>{error.message || 'Invalid Data'}</Text>
                    )}
                </>
            )}        
        />

    );
    
}


const styles = StyleSheet.create({

    container: {
        flexDirection:"row",
        alignItems:"center",
        elevation:2,
        width:"85%",
        backgroundColor:"#FFF",
        paddingHorizontal:20,
        height:50,
        borderRadius:10,
        marginLeft:1,
        marginBottom: 20,
    },

});
