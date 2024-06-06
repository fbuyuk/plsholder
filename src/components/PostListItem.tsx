import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';

interface PostListItemProps {
    item: {
        id: string,
        title: string,
        body: string,
    };
}

const PostListItem: React.FC<PostListItemProps> = ({ item }) => {
    const [isExpanded, setIsExpanded] = useState(false); // Metnin genişletilip genişletilmediğini kontrol eder

    const displayedText = isExpanded ? item.body : `${item.body.substring(0, 100)}...`;
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body}>{displayedText}</Text>
            {item.body.length > 100 && (
                <TouchableOpacity style={styles.toggleExpand} onPress={toggleExpand}>
                    <Text style={styles.seeMore}>{isExpanded ? 'See less' : 'See more'}</Text>
                    <View style={{
                        borderWidth: 2,
                        borderColor: 'purple',
                        padding: 4,
                        borderRadius: 8
                    }}>
                        <Icon name={!isExpanded ? "arrow-forward" : "arrow-back"} size={14} color={"purple"} />
                    </View>

                </TouchableOpacity>
            )}
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
        fontSize: 20,
        color: Colors.text,
        marginBottom: 16,
        fontWeight: 'bold'
    },
    body: {
        color: Colors.grey
    },
    toggleExpand: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 16
    },
    seeMore: {
        color: "#333",
        marginTop: 5,
        fontWeight: 'bold',
        marginRight: 24
    },
});

export default PostListItem;
