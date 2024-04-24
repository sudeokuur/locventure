import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import DefButton from "../components/DefButton";

const SignUpScreen = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [selectedLocation, setSelectedLocation] = useState(""); // State to store selected location
    const [firstName, setFirstName] = useState(""); // State to store user's first name
    const [lastName, setLastName] = useState(""); // State to store user's last name
    const [dropdownVisible, setDropdownVisible] = useState(false); // State to manage dropdown visibility

    const SignUpTestFn = async () => {
        if (password !== confirmPassword) {
            Alert.alert("Passwords do not match");
            return;
        }

        try {
            // Create user account
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);

            // Save additional user data to Firestore
            await firestore().collection('users').doc(userCredential.user.uid).set({
                email,
                firstName,
                lastName,
                location: selectedLocation,
            });

            Alert.alert("User created with those credentials", email);
        } catch (error) {
            console.error(error);
            Alert.alert("Error creating user", error.message);
        }
    };

    const locationOptions = ["Select Location", "Ankara", "Istanbul", "Izmir"];

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
                <TextInput value={firstName} onChangeText={text => setFirstName(text)} placeholder="First Name" style={styles.input} />
                <TextInput value={lastName} onChangeText={text => setLastName(text)} placeholder="Last Name" style={styles.input} />
                <View style={styles.locationContainer}>
                    <Text style={styles.locationLabel}>Location:</Text>
                    <TouchableOpacity
                        onPress={() => setDropdownVisible(!dropdownVisible)}
                        style={styles.dropdownTrigger}
                    >
                        <Text style={styles.dropdownText}>{selectedLocation || "Select Location"}</Text>
                    </TouchableOpacity>
                    {dropdownVisible && (
                        <View style={styles.dropdownMenu}>
                            {locationOptions.map((option, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        setSelectedLocation(option);
                                        setDropdownVisible(false);
                                    }}
                                    style={styles.dropdownMenuItem}
                                >
                                    <Text style={styles.dropdownMenuItemText}>{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
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
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    locationLabel: {
        color: 'white',
        marginRight: 10,
    },
    dropdownTrigger: {
        backgroundColor: '#333',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 8,
        flex: 1,
    },
    dropdownText: {
        color: 'white',
    },
    dropdownMenu: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        backgroundColor: '#333',
        borderRadius: 8,
        zIndex: 1,
    },
    dropdownMenuItem: {
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    dropdownMenuItemText: {
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