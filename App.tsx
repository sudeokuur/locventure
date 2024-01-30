import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import { NavigationContainer } from "@react-navigation/native";
import MyStack from "./src/navigation/MyStack";

const App = () => {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})