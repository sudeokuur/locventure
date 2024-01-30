import { Alert, Button, ImageBackground, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import SocialMedia from "../components/SocialMedia";
import DefButton from "../components/DefButton";
import auth from "@react-native-firebase/auth"

const SignUpScreen = ({navigation}) => {


    const SignUpTestFn = () => {
        auth().createUserWithEmailAndPassword(email, password).then(() =>{
            Alert.alert("User created with those credentials " + email, password);
        })
        .catch((err) =>{
            console.log(err);
        });
    };

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")


    return (
        <View style = {styles.container}>
            <ImageBackground source={require("../assets/background.jpg")}
            style = {styles.imageBackground}
            >
            <View style = {styles.inputsContainer}>
                <Text style={styles.createAccText}> Create Account </Text>
                <Text> </Text>
                <TextInput value={email} onChangeText={text => setEmail(text)} placeholder="Enter Email Address"/>
                <TextInput value={password} onChangeText={text => setPassword(text)} placeholder="Enter Password" secureTextEntry/>
                <TextInput value={confirmPassword} onChangeText={text => setConfirmPassword(text)} placeholder="Confirm Password" secureTextEntry/>

                
                <DefButton onPress={SignUpTestFn} title={"Sign Up"}/>
                <Text> Already Have An Account? </Text>
                <Text style={styles.goLoginPage} onPress={() => navigation.navigate("Login")}> Login </Text>
                

            </View>
            </ImageBackground>
        </View>
    )
}

export default SignUpScreen

const styles = StyleSheet.create({
    goLoginPage: {
        color:"red",
        fontSize:18,
        fontStyle:"italic",
        fontWeight:"800"
    },
    createAccText:{
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
        alignSelf:"flex-end",
        marginRight: 10,
        color:"black", 
        marginBottom: 15
    },
    orText:{
        fontSize: 20,
        color:"gray",
        marginTop:20,
    }
})