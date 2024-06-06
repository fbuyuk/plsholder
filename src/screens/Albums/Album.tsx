import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, Image, Dimensions } from "react-native";
import Colors from "../../constants/Colors";
import albumStore from "../../store/Album";
import { observer } from "mobx-react-lite";
const width = Dimensions.get('window').width;
const Album: React.FC<any> = observer(({ route }) => {
    const { album, fetchAlbum, albumLoading } = albumStore;
    const { id } = route.params;
    useEffect(() => {
        fetchAlbum(id);
    }, [fetchAlbum]);

    console.log(album);
    return (
        <View style={styles.container}>
            {albumLoading ? (
                <ActivityIndicator size="large" color={Colors.text} />
            ) : (
                <FlatList
                    data={album}
                    renderItem={({ item, index }) => {
                        return (<Image style={styles.image} source={{ uri: item.url }} />);
                    }}
                />
            )}
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
        paddingTop: 10,
        alignItems: 'center'
    },
    image: {
        width: width - 38,
        height: 180,
        borderRadius: 8,
        marginBottom: 10
    }
});

export default Album;