import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { FC } from "react";

interface Props {
    title: string;
}

const DefButton: FC<Props> = ({ title, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
};

export default DefButton;

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#33FFA8", // Add the hash symbol
        borderRadius: 30,
    },
    title: {
        color: "white",
        fontSize: 20,
    },
});
