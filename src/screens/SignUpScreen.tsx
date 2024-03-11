import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import DefButton from "../components/DefButton";

const SignUpScreen = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const SignUpTestFn = () => {
        if (password !== confirmPassword) {
            Alert.alert("Passwords do not match");
            return;
        }

        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                Alert.alert("User created with those credentials", email);
            })
            .catch((err) => {
                console.error(err);
                Alert.alert("Error creating user", err.message);
            });
    };

    return (
        <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate("LetsGetStarted")} style={styles.backButton}>
                    <Text style={styles.backButtonText}>{'<'}</Text>
                </TouchableOpacity>
                <View style={styles.inputsContainer}>
                    <Text style={styles.createAccText}>Sign Up</Text>
                    <TextInput value={email} onChangeText={text => setEmail(text)} placeholder="Enter Email Address" style={styles.input} />
                    <TextInput value={password} onChangeText={text => setPassword(text)} placeholder="Enter Password" secureTextEntry style={styles.input} />
                    <TextInput value={confirmPassword} onChangeText={text => setConfirmPassword(text)} placeholder="Confirm Password" secureTextEntry style={styles.input} />
                    <DefButton style={styles.signUpButton} title="Sign Up" onPress={SignUpTestFn} />
                </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
    },
    backButtonText: {
        color: 'white',
        fontSize: 18,
    },
    inputsContainer: {
        borderRadius: 20,
        padding: 20,
    },
    createAccText: {
        color: 'white',
        fontSize: 20,
        alignSelf: 'center',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#333',
        width: '100%',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        color: 'white',
    },
    signUpButton: {
        backgroundColor: 'linear-gradient(to right, pink, purple)',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 40,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SignUpScreen;