import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "react-native-elements";
import {
  addItemToFirestore,
  getListFromFirestore,
  removeItemFromFirestore,
  removefromList,
} from "../store/reducers/slice/mediaSlice";
import { setShowCheckMark } from "../store/reducers/slice/mediaMenuSlice";

const MediaMenu = ({ onClose, item, id }) => {
  const dispatch = useDispatch();
  const currentScreen = useSelector((state) => state.screens.currentScreen);
  const favoriteList = useSelector((state) => state.firestore.favoriteList);
  const watchList = useSelector((state) => state.firestore.watchList);

  useEffect(() => {
    dispatch(getListFromFirestore("favorites"));
    dispatch(getListFromFirestore("watchlist"));
  }, []);

  const handleAddToCollection = useCallback(
    (collectionName) => {
      const list = collectionName === "favorites" ? favoriteList : watchList;
      const alreadyAdded = list.find((listItem) => listItem.data.id === id);
      if (alreadyAdded) {
        dispatch(setShowCheckMark(false));
        onClose();
        Alert.alert(
          "Fail to add",
          `${
            item.title || item.name
          } is already in your ${collectionName} list.`
        );
      } else {
        dispatch(setShowCheckMark(true));
        dispatch(addItemToFirestore({ collectionName, payload: item }))
          .then(() => {
            setTimeout(() => {
              dispatch(setShowCheckMark(false));
              onClose();
            }, 1000);
          })
          .catch((error) => {
            console.error("Error adding to Firestore:", error);
            // Handle error
          });
      }
    },
    [dispatch, favoriteList, watchList, id, item, onClose]
  );

  const handleRemoveFromCollection = useCallback(
    (collectionName) => {
      const list = collectionName === "favorites" ? favoriteList : watchList;
      const currentItem = list.find((listItem) => listItem.data.id === id);
      if (currentItem) {
        dispatch(
          removefromList(
            id,
            collectionName === "favorites" ? "favorites" : "watchlist"
          )
        );
        dispatch(
          removeItemFromFirestore({
            collectionName,
            id: currentItem.entryId,
          })
        );
      } else {
        console.log(`Item not found in the ${collectionName} list.`);
      }
      onClose();
    },
    [dispatch, favoriteList, watchList, id, onClose]
  );

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <View style={[styles.container, { zIndex: 1 }]}>
      <MenuItem
        title="Add to Favorites"
        onPress={() => handleAddToCollection("favorites")}
        icon="favorite"
        visible={currentScreen !== "Favorites"}
      />
      <MenuItem
        title="Add to Watch list"
        onPress={() => handleAddToCollection("watchlist")}
        icon="watch-later"
        visible={currentScreen !== "WatchList"}
      />
      <MenuItem
        title="Remove from watch list"
        onPress={() => handleRemoveFromCollection("watchlist")}
        icon="remove-circle"
        visible={currentScreen === "WatchList"}
      />
      <MenuItem
        title="Remove from favorites"
        onPress={() => handleRemoveFromCollection("favorites")}
        icon="favorite-border"
        visible={currentScreen === "Favorites"}
      />
      <MenuItem title="Close" onPress={handleClose} icon="close" />
    </View>
  );
};

const MenuItem = ({ title, onPress, icon, visible = true }) => {
  if (!visible) return null;

  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemContent}>
        {icon && (
          <View style={styles.iconContainer}>
            <Icon name={icon} iconStyle={styles.icon} />
          </View>
        )}
        <Text style={styles.menuItemText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    marginRight: 5,
  },
  iconContainer: {
    width: 24,
    alignItems: "center",
  },
  icon: {
    fontSize: 20,
    color: "#000",
  },
});

export default MediaMenu;
