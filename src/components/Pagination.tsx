import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
interface PaginationProps {
    length: number
    onPress: (page: number) => void
    activePage: number
}

const Pagination: React.FC<PaginationProps> = ({ length, onPress, activePage }: any) => {
    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10, justifyContent: 'space-between', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => {
                if (0 < activePage - 1)
                    onPress(activePage - 1)
            }}>
                <Icon name="chevron-back" size={16} color={"black"} />
            </TouchableOpacity>
            {Array.from({ length: length }, (_, index) => (
                <TouchableOpacity key={index} onPress={() => {
                    onPress(index + 1)
                }} style={[styles.paginationContainer, index + 1 != activePage ? { backgroundColor: 'transparent' } : null]}><Text style={[styles.paginationText, index + 1 != activePage ? { color: 'black' } : null]}>{index + 1}</Text></TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => {
                if (length > activePage)
                    onPress(activePage + 1)
            }}>
                <Icon name="chevron-forward" size={16} color={"black"} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    paginationContainer: {
        backgroundColor: '#0774e1', width: 30, height: 30, borderRadius: 100, justifyContent: 'center', alignItems: 'center', marginRight: 4
    },
    paginationText: {
        color: 'white', fontWeight: 'bold'
    }
});

export default Pagination;
