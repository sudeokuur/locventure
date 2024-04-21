import { NavigationContainer } from "@react-navigation/native"; // Import NavigationContainer from @react-navigation/native for handling navigation
import React from "react"; // Import React
import { StyleSheet } from "react-native"; // Import StyleSheet from react-native
import AppStack from "./src/navigation/AppStack"; // Import AppStack from the navigation folder

// Functional component definition for App
const App = () => {
  return (
    <NavigationContainer> {/* NavigationContainer component to wrap the navigation */}
      <AppStack/> {/* Render the AppStack component */}
    </NavigationContainer>
  )
}

export default App; // Export App component as default

const styles = StyleSheet.create({}); // Define empty styles object using StyleSheet.create()
