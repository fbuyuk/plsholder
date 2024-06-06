import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';
import SwiperFlatList from 'react-native-swiper-flatlist';
const width = Dimensions.get('window').width;
const AlbumListItem = ({ item, navigation }: any) => {
  return (
    <View style={styles.container}>
      <View>
        <SwiperFlatList
          autoplay={false}
          index={0}
          data={item.slice(0, 3)}
          renderItem={({ item, index }) => {
            return (
              <Image key={index} style={styles.image} source={{ uri: item.url }} />
            );
          }}
          showPagination
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Album', { id: item[0].albumId })}>
        <Text style={styles.title}>{item[0].title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 16,
    marginBottom: 16,
    padding: 10,
  },

  title: {
    color: Colors.text,

  },
  image: {
    width: width - 38,
    height: 180,
    borderRadius: 8,
  },
});

export default AlbumListItem;
