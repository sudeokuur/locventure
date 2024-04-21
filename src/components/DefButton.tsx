import React, { FC } from "react"; // Importing React and FC (Functional Component) from React library
import { StyleSheet, Text, TouchableOpacity } from "react-native"; // Importing necessary components from React Native library

interface Props {
    title: string; // Prop interface defining title as a string
}

// Functional component definition for Default Button (DefButton)
const DefButton: FC<Props> = ({ title, onPress }) => {
    return (
        // TouchableOpacity component to provide touchable feedback
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.title}>{title}</Text> {/* Text component to display button title */}
        </TouchableOpacity>
    );
};

export default DefButton; // Exporting Default Button component as default

// Styles for Default Button component
const styles = StyleSheet.create({
    container: {
        borderRadius: 10, // Setting border radius for button container
        paddingVertical: 15, // Setting vertical padding for button container
        paddingHorizontal: 40, // Setting horizontal padding for button container
        marginBottom: 20, // Setting margin bottom for button container
        flexDirection: 'row', // Setting flexDirection to row
        justifyContent: 'center', // Aligning items horizontally at center
        alignItems: 'center', // Aligning items vertically at center
        backgroundColor: 'purple', // Setting background color for button container
        color: 'black', // Setting text color for button (This property has no effect on TouchableOpacity)
    },
    title: {
        color: "black", // Setting text color for button title
        fontSize: 20, // Setting font size for button title
    },
});
