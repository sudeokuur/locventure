import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import DefButton from "../components/DefButton";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const LoginWithEmailandPassword = async () => {
    try {
      const signInResult = await auth().signInWithEmailAndPassword(email, password);
      if (signInResult.additionalUserInfo?.isNewUser) {
        const userDocRef = firestore().collection("users").doc(signInResult.user.uid);
        await userDocRef.set({
          email: signInResult.user.email,
        });

        console.log("User data saved in Firestore");
      }

      console.log(signInResult);
      Alert.alert("Logged in!");
      navigation.navigate("Events");
    } catch (error) {
      console.error(error);
      Alert.alert(error.nativeErrorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("LetsGetStarted")}>
          <Text style={styles.backButton}>{'<'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Sign In</Text>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Enter Email Address"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Enter Password"
          secureTextEntry
          style={styles.input}
        />
        <DefButton title={"Login"} onPress={LoginWithEmailandPassword} style={styles.loginButton} />
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'black',
      paddingHorizontal: 20,
      paddingTop: 40,
  },
  backButton: {
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
  title: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default LoginScreen;
