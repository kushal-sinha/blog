import React, { useContext, useLayoutEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { Context } from "../context/BlogContext";

const ShowScreen = ({ route, navigation }) => {
    const { state } = useContext(Context);
    const { id } = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Edit', { id: id })}>
                    <EvilIcons name="pencil" size={30} style={{ marginRight: 15, color: '#fff' }} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const blogPost = state.find(blogPost => blogPost.id === id);

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>{blogPost?.title || "No Title Found"}</Text>
                <Text style={styles.content}>{blogPost?.content || "No Content Found"}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
        paddingBottom: 10,
    },
    content: {
        fontSize: 18,
        lineHeight: 26,
        color: '#555',
    },
});

export default ShowScreen;
