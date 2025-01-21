import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

const BlogPostForm = ({ onSubmit, initialValues = { title: '', content: '' } }) => {
    const [title, setTitle] = useState(initialValues.title);
    const [content, setContent] = useState(initialValues.content);
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Enter Title:</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={(text) => setTitle(text)}
                placeholder="Enter post title"
                placeholderTextColor="#999"
            />
            <Text style={styles.label}>Enter Content:</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                value={content}
                onChangeText={(text) => setContent(text)}
                placeholder="Enter post content"
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
            />
            <Button
                onPress={() => onSubmit(title, content)}
                title="Save Blog Post"
                color="#1E90FF"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    input: {
        backgroundColor: '#FFF',
        borderColor: '#DDD',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
        color: '#333',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top', // Ensures text starts at the top for multiline
    },
});

export default BlogPostForm;