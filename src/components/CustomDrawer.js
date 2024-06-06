import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import userStore from '../store/UserStore';
import {useNavigation} from '@react-navigation/native';

const CustomDrawer = props => {
  const {me} = userStore;
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          backgroundColor: '#9288F9',
          marginTop: -50,
          zIndex: 10,
        }}>
        <ImageBackground
          source={{
            uri: `https://randomuser.me/api/portraits/women/${me.id}.jpg`,
          }}
          style={{padding: 20}}>
          <Image
            alt="Not find"
            source={{
              uri: `https://randomuser.me/api/portraits/women/${me.id}.jpg`,
            }}
            style={styles.userAvatar}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              marginBottom: 5,
            }}>
            Name
          </Text>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                color: '#333',
                marginLeft: 5,
              }}>
              LOGO
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}
          style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} color={'#333'} />
            <Text
              style={{
                fontSize: 15,

                marginLeft: 5,
                color: '#333',
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  userAvatar: {
    height: 67.5,
    width: 67.5,
    borderRadius: 40,
    marginBottom: 10,
    marginTop: 30,
  },
  switchTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 7,
    paddingVertical: 5,
  },
  preferences: {
    fontSize: 16,
    color: '#ccc',
    paddingTop: 10,
    fontWeight: '500',
    paddingLeft: 20,
  },
  switchText: {
    fontSize: 17,
    color: '',
    paddingTop: 10,
    fontWeight: 'bold',
  },
});
