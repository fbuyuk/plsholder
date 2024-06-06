import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import CheckBox from '@react-native-community/checkbox';

interface TaskListItemProps {
    item: {
        id: string,
        title: string,
        completed: boolean,
    },
}

const TaskListItem: React.FC<TaskListItemProps> = ({ item }) => {

    return (
        <View style={styles.container}>
            <CheckBox style={styles.checkbox} value={item.completed} tintColors={{ true: '#6E44FF', false: '#ccc' }} />
            <Text style={styles.title}>{item.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        flexShrink: 0,
    },
    title: {
        color: Colors.text,
        flex: 1,
        flexWrap: 'wrap',
    },
});

export default TaskListItem;
