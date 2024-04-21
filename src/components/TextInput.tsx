import React from "react"; // Importing React library
import { StyleSheet, View } from "react-native"; // Importing necessary components from react-native

// Custom TextInput component definition
const TextInput = ({...props}) => {
    return (
        <View style={styles.container}> {/* Container for TextInput */}
            <TextInput // This line causes an error due to naming conflict; it should be renamed
            style={styles.input} // Style for the text input
            {...props} // Spread props to pass any additional props
            />
            <View style={styles.border}/> {/* View for the border line */}
        </View>
    )
}

export default TextInput; // Exporting TextInput component as default

// Styles for TextInput component
const styles = StyleSheet.create({
    container:{
        height:50, // Height of the container
        width:"100%", // Full width
        justifyContent:"center", // Centering content vertically
        paddingHorizontal: 10, // Horizontal padding
        marginBottom: 20 // Margin bottom for spacing
    },
    input:{
        width:"100%", // Full width
        height:50 // Height of the text input
    },
    border:{
        width:"100%", // Full width
        backgroundColor:"gray", // Background color for the border
        height:1, // Height of the border line
        alignSelf:"center" // Align the border line to the center horizontally
    }
});
