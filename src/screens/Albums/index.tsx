import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import Colors from "../../constants/Colors";
import albumStore from "../../store/Album";
import { observer } from "mobx-react-lite";
import AlbumListItem from "../../components/AlbumListItem";
const Albums: React.FC<any> = observer(({ navigation }) => {
    const { albums, fetchAlbums, loading } = albumStore;

    useEffect(() => {
        fetchAlbums();
    }, [fetchAlbums]);

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color={Colors.text} />
            ) : (
                <FlatList
                    data={albums}
                    renderItem={({ item, index }) => <AlbumListItem navigation={navigation} key={index} item={item} />}
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

export default Albums;