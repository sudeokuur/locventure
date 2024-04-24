import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

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
        borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'purple',
    color: 'black', // Text color
    },
    title: {
        color: "black",
        fontSize: 20,
    },
});
