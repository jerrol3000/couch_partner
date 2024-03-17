import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import MediaMenu from "./MediaMenu";
import styles from "../styles/generalStyle";
import { setOpenMenuId } from "../store/reducers/slice/mediaMenuSlice";

const MediaListScreen = ({ mediaList, listType }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { openMenuId } = useSelector((state) => state.openMenuId);

  const handleToggleMenu = (itemId) => {
    if (openMenuId === itemId) {
      dispatch(setOpenMenuId(null));
    } else {
      dispatch(setOpenMenuId(itemId));
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.mediaTile}
      onPress={() => navigation.navigate("Details", { item })}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.mediaPoster}
        resizeMode="cover"
      />
      <Text style={styles.mediaTitle}>{item.title || item.name}</Text>
      {(openMenuId !== item.id || listType === "watchlist") && (
        <TouchableOpacity
          style={styles.menuIcon}
          onPress={() => handleToggleMenu(item.id)}
        >
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>
      )}
      {openMenuId === item.id && (
        <MediaMenu
          onClose={() => dispatch(setOpenMenuId(null))}
          item={item}
          id={openMenuId}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {mediaList.length ? (
        <FlatList
          data={mediaList}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={renderItem}
        />
      ) : (
        <View style={styles.noMediaContainer}>
          <Text style={styles.noMediaText}>
            {listType === "favorite"
              ? "Your favorites list is empty. Start adding TV shows and movies to keep track of what you are currently watching!"
              : "Your watchlist is empty. Start adding TV shows and movies to keep track of what you want to watch later!"}
          </Text>
        </View>
      )}
    </View>
  );
};

export default MediaListScreen;
