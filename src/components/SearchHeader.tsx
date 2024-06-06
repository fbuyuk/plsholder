import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import { observer } from 'mobx-react-lite';
import postStore from '../store/PostStore';
import userStore from '../store/UserStore';
import taskStore from '../store/TaskStore';

interface SearchHeaderProps {
    searchInputPlaceholder: string;
    navigation: any;
    id: string;
}

const SearchHeader: React.FC<SearchHeaderProps> = observer(({ id, navigation, searchInputPlaceholder }) => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerStyle}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Icon name="menu" size={30} color={Colors.grey} />
                </TouchableOpacity>

                <View style={styles.searchContainer}>
                    <View style={styles.searchBarIconContainer}>
                        <Icon name="search" size={24} color={Colors.grey} />
                    </View>
                    <TextInput
                        style={styles.searchInput}
                        placeholder={searchInputPlaceholder}
                        onChangeText={(text) => id == "post" ? postStore.filterPosts(text) : id == "user" ? userStore.filterUsers(text) : taskStore.filterTasks(text)}

                        placeholderTextColor='gray'
                        cursorColor={'gray'}
                    />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Stats')}>
                    <Icon name="person-circle-outline" size={30} color={Colors.grey} />
                </TouchableOpacity>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    headerContainer: {
        height: 56,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        paddingHorizontal: 8,
        borderBottomColor: '#333',
        borderBottomWidth: 1
    },
    headerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    searchBarIconContainer: {
        position: 'absolute',
        left: 6,
        top: 7,
        zIndex: 1
    },
    searchContainer: {
        flex: 1,
        marginHorizontal: 8
    },
    searchInput: {
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingRight: 10,
        paddingLeft: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        color: Colors.text
    },
});

export default SearchHeader;
