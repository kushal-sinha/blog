import React, { useContext, useLayoutEffect, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity } from "react-native";
import { Context } from "../context/BlogContext";
import { Feather } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {
    const { state, deleteBlogPost, getBlogPost } = useContext(Context);

    useEffect(() => {
        getBlogPost();
        const unsubscribe = navigation.addListener('focus', () => {
            getBlogPost();
        });
        return unsubscribe; // The function returned by addListener acts as the cleanup function
    }, [navigation]);


    // Set the header button dynamically
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Create')}>
                    <Feather name="plus" size={30} style={{ marginRight: 10 }} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);
    console.log(state.id);

    return (
        <View style={styles.container}>
            <FlatList
                data={state}
                keyExtractor={(blogPost) => blogPost.title}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('Show', { id: item.id })}>
                            <View style={styles.row}>
                                <View style={styles.textContainer}>
                                    <Text style={styles.id}>{item.id}</Text>
                                    <Text style={styles.title}>{item.title}</Text>
                                </View>
                                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                                    <Feather name="trash" size={24} color="#FF6B6B" />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginVertical: 5,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    id: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#666',
        marginRight: 10,
    },
    title: {
        fontSize: 18,
        color: '#333',
    },
});

export default IndexScreen;
