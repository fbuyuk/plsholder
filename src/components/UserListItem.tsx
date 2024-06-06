import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import userStore from '../store/UserStore';
interface UserListItemProps {
    item: {
        id: string,
        name: string,
        email: string,
        phone: string,
        address: {
            suite: string,
            street: string,
            city: string
        }
    },
    fav: boolean,
    onPress: () => void,
}

const UserListItem: React.FC<UserListItemProps> = ({ onPress, item, fav }) => {
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Image
                    style={styles.userImage}
                    source={{ uri: `https://randomuser.me/api/portraits/men/${item.id}.jpg` }}

                />
                <View style={styles.textContainer}>
                    <View>
                        <Text style={styles.title}>{item.name}</Text>
                        <Text style={styles.email}>{item.email}</Text>
                    </View>
                    <Text style={styles.phone}>{item.phone}</Text>
                </View>
            </View>
            <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.actionButton} onPress={() => {
                    userStore.toggleFavs(item.id);
                }}>
                    <Icon color={'red'} name={fav ? 'heart' : 'heart-outline'} size={18} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={onPress}>
                    <Icon color={'black'} name='ellipsis-vertical' size={18} />
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        borderWidth: 1,
        borderColor: Colors.grey,
        borderRadius: 16,
        marginBottom: 10,
        padding: 10
    },
    innerContainer: {
        flexDirection: 'row'
    },
    textContainer: {
        marginLeft: 8,
        justifyContent: 'space-between'
    },
    userImage: {
        width: 80,
        height: 80,
        borderRadius: 10
    },
    title: {
        fontSize: 20,
        color: Colors.text
    },
    phone: {
        color: Colors.grey
    },
    email: {
        color: Colors.grey
    },
    actionsContainer: {
        position: 'absolute',
        right: 10,
        top: 10,
        zIndex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionButton: {

    },

});

export default UserListItem;
