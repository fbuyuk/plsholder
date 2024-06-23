import React, { useEffect, useState, useCallback, useRef } from "react";
import { Text, View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import UserListItem from "../../components/UserListItem";
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import Colors from "../../constants/Colors";
import Icon from 'react-native-vector-icons/Ionicons';
import userStore from "../../store/UserStore";
import { observer } from "mobx-react-lite";
import Pagination from "../../components/Pagination";
const Users: React.FC = observer(() => {
  const { users, fetchUsers, loading, favorites, getFavs, page } = userStore;
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    getFavs();
    fetchUsers(1);
  }, [fetchUsers]);

  useEffect(() => {

  }, [favorites.length]);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
    []
  );

  const openBottomSheet = (user: any) => {
    setSelectedUser(user);
    bottomSheetRef.current?.expand();
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.text} />
      ) : (
        <FlatList
          ListHeaderComponent={() => <Pagination activePage={page} length={3} onPress={(page) => { fetchUsers(page) }} />}
          data={users}
          renderItem={({ item, index }) => {
            return <UserListItem key={index} fav={favorites.includes(item.id)} item={item} onPress={() => openBottomSheet(item)} />
          }}
        />
      )}
      <BottomSheet
        ref={bottomSheetRef}
        enablePanDownToClose={true}
        snapPoints={[340]}
        backdropComponent={renderBackdrop}
        index={-1}
      >
        <BottomSheetView style={styles.contentContainer}>
          {selectedUser && (
            <>
              <Text style={styles.bottomSheetUserName}>{selectedUser.name}</Text>
              <View style={styles.bottomSheetItemContainer}>
                <View style={{ flexDirection: 'row' }}>
                  <Icon name="location-outline" size={24} color={Colors.text} />
                  <Text style={styles.bottomSheetListItemTitle}>Location</Text>
                </View>
                <Text style={styles.bottomSheetListItemDescription}>{selectedUser.address.street}, {selectedUser.address.city}</Text>
              </View>
              <View style={styles.bottomSheetItemContainer}>
                <View style={{ flexDirection: 'row' }}>
                  <Icon name="business-outline" size={24} color={Colors.text} />
                  <Text style={styles.bottomSheetListItemTitle}>Company</Text>
                </View>
                <Text style={styles.bottomSheetListItemDescription}>{selectedUser.company.name}</Text>
              </View>
              <View style={styles.bottomSheetItemContainer}>
                <View style={{ flexDirection: 'row' }}>
                  <Icon name="globe-outline" size={24} color={Colors.text} />
                  <Text style={styles.bottomSheetListItemTitle}>Website</Text>
                </View>
                <Text style={styles.bottomSheetListItemDescription}>{selectedUser.website}</Text>
              </View>
            </>
          )}
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 10
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  bottomSheetItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
    marginBottom: 16,
    padding: 8
  },
  bottomSheetUserName: {
    color: Colors.text,
    fontSize: 24
  },
  bottomSheetListItemTitle: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    marginBottom: 16
  },
  bottomSheetListItemDescription: {
    color: Colors.grey
  }
});

export default Users;