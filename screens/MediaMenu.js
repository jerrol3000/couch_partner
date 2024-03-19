import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "react-native-elements";

import {
  addToFavorite,
  removeFromFavorite,
} from "../store/reducers/slice/addToFavoriteSlice";
import {
  addToWatchlist,
  removeFromWatchList,
} from "../store/reducers/slice/addToWatchSlice";
import { setShowCheckMark } from "../store/reducers/slice/mediaMenuSlice";
import {
  addToFirestore,
  removeFromFirestore,
} from "../store/reducers/slice/addToFavoriteSlice";

const MediaMenu = ({ onClose, item, id }) => {
  const dispatch = useDispatch();
  const currentScreen = useSelector((state) => state.screens.currentScreen);
  const { favorite } = useSelector((state) => state.favoriteList);
  const { watchList } = useSelector((state) => state.watchList);

  const handleAddToFavorites = () => {
    const alreadyAdded = favorite.findIndex((item) => item.id === id);
    if (alreadyAdded !== -1) {
      dispatch(setShowCheckMark(false));
      Alert.alert(
        "Fail to add",
        `${item.title || item.name} is already in your favorites list.`
      );
    } else {
      dispatch(addToFavorite(item));
      dispatch(setShowCheckMark(true));
      dispatch(addToFirestore(item))
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
    const alreadyAdded = watchList.findIndex((item) => item.id === id);
    if (alreadyAdded !== -1) {
      dispatch(setShowCheckMark(false));
      Alert.alert(
        "Fail to add",
        `${item.title || item.name} is already in your watch list.`
      );
    } else {
      dispatch(addToWatchlist(item));
      dispatch(setShowCheckMark(true));
      dispatch(addToFirestore(item))
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

  const handleRemoveFromFavorites = () => {
    dispatch(removeFromFavorite(item.id));
    dispatch(removeFromFirestore(id))
      .then(() => {
        onClose();
      })
      .catch((error) => {
        console.error("Error removing from Firestore:", error);
        // Handle error
      });
  };

  const handleRemoveFromWatchList = () => {
    dispatch(removeFromWatchList(item.id));
    dispatch(removeFromFirestore(id))
      .then(() => {
        onClose();
      })
      .catch((error) => {
        console.error("Error removing from Firestore:", error);
        // Handle error
      });
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
