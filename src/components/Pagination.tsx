import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
interface PaginationProps {
    length: number
    onPress: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ length, onPress }: any) => {
    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 }}>
            {Array.from({ length: length }, (_, index) => (
                <TouchableOpacity key={index} onPress={() => onPress(index + 1)} style={styles.paginationContainer}><Text style={styles.paginationText}>{index + 1}</Text></TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    paginationContainer: {
        flex: 1, backgroundColor: '#0774e1', width: 36, height: 36, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginRight: 4
    },
    paginationText: {
        color: 'white', fontWeight: 'bold'
    }
});

export default Pagination;
