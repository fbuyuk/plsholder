import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import PostListItem from "../../components/PostListItem";
import Colors from "../../constants/Colors";
import postStore from "../../store/PostStore";
import { observer } from "mobx-react-lite";
import Pagination from "../../components/Pagination";
const Posts: React.FC = observer(() => {
    const { posts, fetchPosts, loading } = postStore;


    useEffect(() => {
        fetchPosts(1);
    }, [fetchPosts]);


    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color={Colors.text} />
            ) : (
                <FlatList
                    ListHeaderComponent={() => <Pagination length={4} onPress={(page) => { fetchPosts(page) }} />}
                    data={posts}
                    renderItem={({ item, index }) => <PostListItem key={index} item={item} />}
                />
            )}
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
        paddingTop: 10
    },
});

export default Posts;