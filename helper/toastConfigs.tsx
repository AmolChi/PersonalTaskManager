import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Toast, {BaseToast, ErrorToast, ToastOptions, ToastShowParams} from "react-native-toast-message";

export const toastConfig = {
    success:(props:ToastOptions)=>(

        <BaseToast
            {...props}
            style={{ borderLeftColor: 'pink' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 15,
                fontWeight: '400'
            }}
        />
    ),

    error: ({props,text1}:ToastShowParams) => (
       <View style={styles.errorView}>
            <Image source={require('../assets/cross.png')} style={{flex:1,resizeMode:'contain'}}/>
            <Text style={styles.text}>
                {text1}
            </Text>
       </View>
    ),
}

const styles = StyleSheet.create({
    errorView:{
        backgroundColor:'#242C32',
        paddingHorizontal:30,
        borderRadius:40,
        height:60,
        width:'80%',
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        flexDirection:'row'
    },
    text:{
        flex:9,
        fontSize:17,
        color:'white',
        textAlign:'center'
    }
})