import { Alert, Button, ImageBackground, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import DefButton from "../components/DefButton";
import auth from "@react-native-firebase/auth"


const LoginScreen = ({navigation}) => {

      
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const LoginWithEmailandPassword = () => {
        auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
            console.log(res)
            Alert.alert("Logged in!")
            navigation.navigate("Events")
        })
        .catch(err => {
            console.log(err)
            Alert.alert(err.nativeErrorMessage)
        })
    }



    return (
        <View style = {styles.container}>
            <ImageBackground source={require("../assets/background.jpg")}
            style = {styles.imageBackground}
            >
            <View style = {styles.inputsContainer}>
                <Text style={styles.titleStyle}>Hi, Welcome Back!</Text>
                <TextInput value={email} onChangeText={text => setEmail(text)} placeholder="Enter Email Address"/>
                <TextInput value={password} onChangeText={text => setPassword(text)} placeholder="Enter Password" secureTextEntry/>

                
               
                <DefButton title={"Login"} onPress={LoginWithEmailandPassword}/>
                <Text></Text>

                <Text style={styles.textDontHaveAcc}> Don't Have An Account Yet? </Text>
                <Text style={styles.createAcc} onPress={() => navigation.navigate("SignUp")}> Create An Account </Text>
                

            </View>
            </ImageBackground>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    createAcc:{
        color:"red",
        fontStyle:"italic",
        fontSize:18,
        fontWeight:"800"
    },
    titleStyle:{
        color:"black",
        fontSize:30,
        alignSelf:"flex-start"

    },
    container:{
        flex:1
    },
    imageBackground:{
        height:"100%",
        paddingHorizontal: 20
    },
    inputsContainer:{
        height:600,
        width:"100%",
        backgroundColor:"white",
        borderRadius:20,
        justifyContent:"center",
        alignItems:"center",
        marginTop:30,
        paddingHorizontal:20
    },
    textDontHaveAcc:{
        alignSelf:"center",
        marginRight: 10,
        color:"black", 
        marginBottom: 15,
        fontSize:18
    },
    orText:{
        fontSize: 20,
        color:"gray",
        marginTop:20,
    }
})

