import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "react-native-elements";
import {
  addItemToFirestore,
  getListFromFirestore,
  removeItemFromFirestore,
} from "../store/reducers/slice/mediaSlice";
import { setShowCheckMark } from "../store/reducers/slice/mediaMenuSlice";

const MediaMenu = ({ onClose, item, id }) => {
  const dispatch = useDispatch();
  const currentScreen = useSelector((state) => state.screens.currentScreen);
  const { favoriteList, watchList } = useSelector((state) => state.firestore);

  const handleAddToFavorites = () => {
    const alreadyAdded = favoriteList.findIndex(
      (favItem) => favItem.data.id === id
    );
    if (alreadyAdded !== -1) {
      dispatch(setShowCheckMark(false));
      Alert.alert(
        "Fail to add",
        `${item.title || item.name} is already in your favorites list.`
      );
    } else {
      dispatch(setShowCheckMark(true));
      dispatch(
        addItemToFirestore({ collectionName: "favorites", payload: item })
      )
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
    onClose();
  };

  const handleAddToWatchlist = () => {
    const alreadyAdded = watchList.findIndex(
      (watchItem) => watchItem.data.id === id
    );
    if (alreadyAdded !== -1) {
      dispatch(setShowCheckMark(false));
      Alert.alert(
        "Fail to add",
        `${item.title || item.name} is already in your watch list.`
      );
    } else {
      dispatch(setShowCheckMark(true));
      dispatch(
        addItemToFirestore({ collectionName: "watchlist", payload: item })
      )
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
    onClose();
  };

  const handleRemoveFromFavorites = async () => {
    const favoritesList = await dispatch(getListFromFirestore("favorites"));

    const currentItem = favoritesList.payload.find(
      (item) => item.data.id === id
    );
    if (currentItem) {
      dispatch(
        removeItemFromFirestore({
          collectionName: "favorites",
          id: currentItem.entryId,
        })
      )
        .then(() => {
          onClose();
        })
        .catch((error) => {
          console.error("Error removing from Firestore:", error);
        });
    } else {
      console.log("Item not found in the favorite list.");
    }
  };

  const handleRemoveFromWatchList = async () => {
    const watchList = await dispatch(getListFromFirestore("watchlist"));
    const currentItem = watchList.payload.find((item) => item.data.id === id);
    if (currentItem) {
      dispatch(
        removeItemFromFirestore({
          collectionName: "watchlist",
          id: currentItem.entryId,
        })
      )
        .then(() => {
          onClose();
        })
        .catch((error) => {
          console.error("Error removing from Firestore:", error);
        });
    } else {
      console.log("Item not found in the watchlist list.");
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <View style={[styles.container, { zIndex: 1 }]}>
      <MenuItem
        title="Add to Favorites"
        onPress={handleAddToFavorites}
        icon="favorite"
        visible={currentScreen !== "Favorites"}
      />
      <MenuItem
        title="Add to Watch list"
        onPress={handleAddToWatchlist}
        icon="watch-later"
        visible={currentScreen !== "WatchList"}
      />
      <MenuItem
        title="Remove from watch list"
        onPress={handleRemoveFromWatchList}
        icon="remove-circle"
        visible={currentScreen === "WatchList"}
      />
      <MenuItem
        title="Remove from favorites"
        onPress={handleRemoveFromFavorites}
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
