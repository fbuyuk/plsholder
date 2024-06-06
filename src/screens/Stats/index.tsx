import React, { useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Text, TouchableOpacity, Image } from "react-native";
import { observer } from "mobx-react-lite";
import PieChart from "../../components/PieChart";
import Colors from "../../constants/Colors";
import Icon from 'react-native-vector-icons/Ionicons';
import albumStore from "../../store/Album";
import taskStore from "../../store/TaskStore";

const Stats: React.FC<any> = observer(({ navigation }) => {
    const { albums, fetchAlbums, loading } = albumStore;
    const { incompleteTasks, completedTasks, taskStats, loading: taskLoading } = taskStore;
    useEffect(() => {
        fetchAlbums();
        taskStats();

    }, [fetchAlbums, taskStats]);
    return (
        <View style={styles.container}>
            <Text style={{ color: Colors.text, fontSize: 18, fontWeight: '500', marginBottom: 10 }}>Görev İstatistikleri</Text>
            <View style={styles.chartContainer}>
                <PieChart completedPercentage={completedTasks} incompletePercentage={incompleteTasks} />
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 16, height: 16, backgroundColor: '#9900cc' }}></View>
                        <Text style={{ color: 'black', marginLeft: 8 }}>Yapılacak Görevler</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 18 }}>
                        <View style={{ width: 16, height: 16, backgroundColor: '#600080' }}></View>
                        <Text style={{ color: 'black', marginLeft: 8 }}>Yapılan Görevler</Text>
                    </View>
                </View>
            </View>
            <Text style={{ color: Colors.text, fontSize: 18, fontWeight: '500', marginBottom: 10, marginTop: 10 }}>Albüm İstatistikleri</Text>
            <View style={styles.albumContainer}>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <Icon name="image-outline" size={20} color={Colors.text} />
                    <Text style={{ color: Colors.text, marginLeft: 16 }}>{albums.length} adet albüm bulundu.</Text>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {albums.map((album, index) => (
                        <TouchableOpacity onPress={() => navigation.navigate('Album', { id: album[0].albumId })} key={index} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 4 }}>
                            <Image style={{ borderRadius: 10 }} source={{ uri: album[0].thumbnailUrl }} width={60} height={60} resizeMode="cover" />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
        paddingTop: 10
    },
    chartContainer: {
        borderWidth: 1,
        borderColor: Colors.grey,
        borderRadius: 10,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    albumContainer: {
        borderWidth: 1,
        borderColor: Colors.grey,
        borderRadius: 10,
        padding: 16,
    }
});

export default Stats;