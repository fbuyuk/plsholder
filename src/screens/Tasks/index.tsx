import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, Text } from "react-native";
import Colors from "../../constants/Colors";
import taskStore from "../../store/TaskStore";
import { observer } from "mobx-react-lite";
import TaskListItem from "../../components/TaskListItem";
import Pagination from "../../components/Pagination";
const Tasks: React.FC = observer(() => {
    const { tasks, fetchTasks, loading } = taskStore;

    useEffect(() => {
        fetchTasks(1);
    }, [fetchTasks]);

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color={Colors.text} />
            ) : (
                <FlatList
                    ListHeaderComponent={() => <Pagination length={7} onPress={(page) => { fetchTasks(page) }} />}
                    data={tasks}
                    renderItem={({ item, index }) => <TaskListItem key={index} item={item} />}
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

export default Tasks;