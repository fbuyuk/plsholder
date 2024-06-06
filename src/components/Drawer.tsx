import { createDrawerNavigator } from '@react-navigation/drawer';
import Tasks from '../screens/Tasks';
import Posts from '../screens/Posts';
import Albums from '../screens/Albums';
import Users from '../screens/Users';
import SearchHeader from './SearchHeader';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Album from '../screens/Albums/Album';
import Stats from '../screens/Stats';
import CustomDrawer from './CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Favorites from '../screens/Users/Favorites';
const Drawer = createDrawerNavigator();
const AlbumStackNavigator = createNativeStackNavigator();

const AlbumStack: React.FC = () => {
    return (
        <AlbumStackNavigator.Navigator>
            <AlbumStackNavigator.Screen name="Albums" options={{
                title: "Albümler",
                header: ({ navigation }) => <SearchHeader id={"album"} searchInputPlaceholder='Albüm ara' navigation={navigation} />,
            }} component={Albums} />
            <AlbumStackNavigator.Screen name="Album" options={{
                title: "Albüm",
            }} component={Album} />
        </AlbumStackNavigator.Navigator>
    )
}

function MainDrawer() {

    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
            <Drawer.Screen name="Tasks" component={Tasks} options={{
                title: "Görevler",
                header: ({ navigation }) => <SearchHeader id={"task"} searchInputPlaceholder='Görev ara' navigation={navigation} />,
                drawerIcon: () => <Octicons name="checklist" color={'black'} size={24} />
            }} />
            <Drawer.Screen name="Posts" component={Posts} options={{
                title: "Gönderiler",
                header: ({ navigation }) => <SearchHeader id={"post"} searchInputPlaceholder='Gönderi ara' navigation={navigation} />,
                drawerIcon: () => <Ionicons name="list-outline" color={'black'} size={24} />
            }} />
            <Drawer.Screen name="AlbumStack" component={AlbumStack} options={{
                headerShown: false,
                title: "Albümler",
                drawerIcon: () => <Ionicons name="image-outline" color={'black'} size={24} />
            }} />
            <Drawer.Screen name="Users" component={Users} options={{
                title: "Kullanıcılar",
                header: ({ navigation }) => <SearchHeader id={"user"} searchInputPlaceholder='Kullanıcı ara' navigation={navigation} />,
                drawerIcon: () => <Ionicons name="person-outline" color={'black'} size={24} />
            }} />
            <Drawer.Screen name="Favorite" component={Favorites} options={{
                title: "Favoriler",
                drawerIcon: () => <Ionicons name="heart-outline" color={'black'} size={24} />
            }} />
            <Drawer.Screen name="Stats" component={Stats} options={{
                title: "Stats",
                header: ({ navigation }) => <SearchHeader id={"user"} searchInputPlaceholder='Kullanıcı ara' navigation={navigation} />,
                drawerItemStyle: {
                    opacity: 0
                }
            }} />
        </Drawer.Navigator>
    );
}

export default MainDrawer;