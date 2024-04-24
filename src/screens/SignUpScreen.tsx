import auth from "@react-native-firebase/auth"; // Import auth from @react-native-firebase/auth for user authentication
import firestore from "@react-native-firebase/firestore"; // Import firestore from @react-native-firebase/firestore for database operations
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook from @react-navigation/native for navigation
import React, { useState } from "react"; // Import React, useState
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"; // Import necessary components from react-native
import DefButton from "../components/DefButton"; // Import custom button component

// Functional component definition for SignUpScreen
const SignUpScreen = () => {
    const navigation = useNavigation(); // Use useNavigation hook to get the navigation object

    // State variables for email, password, confirm password, selected location, first name, last name, and dropdown visibility
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dropdownVisible, setDropdownVisible] = useState(false);

    // Function to handle user sign up
    const SignUpTestFn = async () => {
        if (password !== confirmPassword) { // Check if passwords match
            Alert.alert("Passwords do not match"); // Display alert if passwords do not match
            return;
        }

        try {
            // Create user account with email and password
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);

            // Save additional user data to Firestore
            await firestore().collection('users').doc(userCredential.user.uid).set({
                email,
                firstName,
                lastName,
                location: selectedLocation,
            });

            Alert.alert("User created with those credentials", email); // Display alert for successful user creation
        } catch (error) {
            console.error(error); // Log error if user creation fails
            Alert.alert("Error creating user", error.message); // Display alert for error message
        }
    };

    const locationOptions = ["Select Location", "Ankara", "Istanbul", "Izmir"]; // Array of location options

    return (
        <View style={styles.container}>
            {/* Main container view */}
            <TouchableOpacity onPress={() => navigation.navigate("LetsGetStarted")} style={styles.backButton}>
                <Text style={styles.backButtonText}>{'<'}</Text>
                {/* Back button */}
            </TouchableOpacity>
            <View style={styles.inputsContainer}>
                {/* Container for input fields */}
                <Text style={styles.createAccText}>Sign Up</Text>
                {/* Sign up text */}
                {/* Text input fields for email, password, confirm password, first name, and last name */}
                <TextInput value={email} onChangeText={text => setEmail(text)} placeholder="Enter Email Address" style={styles.input} />
                <TextInput value={password} onChangeText={text => setPassword(text)} placeholder="Enter Password" secureTextEntry style={styles.input} />
                <TextInput value={confirmPassword} onChangeText={text => setConfirmPassword(text)} placeholder="Confirm Password" secureTextEntry style={styles.input} />
                <TextInput value={firstName} onChangeText={text => setFirstName(text)} placeholder="First Name" style={styles.input} />
                <TextInput value={lastName} onChangeText={text => setLastName(text)} placeholder="Last Name" style={styles.input} />
                <View style={styles.locationContainer}>
                    {/* Container for location dropdown */}
                    <Text style={styles.locationLabel}>Location:</Text>
                    {/* Location label */}
                    {/* Dropdown trigger to select location */}
                    <TouchableOpacity
                        onPress={() => setDropdownVisible(!dropdownVisible)}
                        style={styles.dropdownTrigger}
                    >
                        <Text style={styles.dropdownText}>{selectedLocation || "Select Location"}</Text>
                        {/* Selected location or default text */}
                    </TouchableOpacity>
                    {dropdownVisible && (
                        <View style={styles.dropdownMenu}>
                            {/* Dropdown menu container */}
                            {/* Render location options */}
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
                {/* Sign up button */}
            </View>
        </View>
    );
};

// Styles for SignUpScreen component
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

export default SignUpScreen; // Export SignUpScreen component as default
