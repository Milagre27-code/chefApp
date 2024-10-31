import { StyleSheet, View,Image } from "react-native";
import Logo from "./assets/logo.png";

export default function SplashScreen(){
    return (
        <View style={styles.container}>
            <Image source={Logo} style={styles.image}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5'
    },
    image:{
        width: 300,
        height: 300,
        borderRadius: 100,
        marginBottom: 20,
        alignSelf: 'center',
        resizeMode:'cover'
    },
});
  