import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import {
  setSearchResults,
  setSearchType,
  setPopular,
} from "../store/reducers/slice/searchResultsSlice";
import MediaMenu from "./MediaMenu";
import styles from "../styles/generalStyle";
import { setOpenMenuId } from "../store/reducers/slice/mediaMenuSlice";
import AnimatedCheckMark from "./AnimatedCheckMark";

const API_KEY = "f00232dfb1ce381afc3c65971e0fd1aa";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const { results, searchType, popular } = useSelector((state) => state.media);
  const { openMenuId, showCheckMark } = useSelector(
    (state) => state.openMenuId
  );

  const dispatch = useDispatch();

  //move to a slice
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/${searchType}`,
          {
            params: {
              api_key: API_KEY,
              language: "en-US",
              query: searchQuery,
            },
          }
        );
        dispatch(setSearchResults(response.data.results));
      } catch (error) {
        console.error(`Error fetching ${searchType} results:`, error);
      }
    };

    if (searchQuery.trim() !== "") {
      fetchSearchResults();
    } else {
      dispatch(setSearchResults([]));
    }
  }, [searchQuery, searchType]);

  useEffect(() => {
    const fetchPopularMedia = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/${searchType}`,
          {
            params: {
              api_key: API_KEY,
              language: "en-US",
              include_adult: false,
              include_null_first_air_dates: false,
              page: 1,
              sort_by: "popularity.desc",
            },
          }
        );
        dispatch(setPopular(response.data.results));
      } catch (error) {
        console.error(`Error fetching ${searchType} results:`, error);
      }
    };
    fetchPopularMedia();
  }, [searchType]);

  const handleToggleMenu = (itemId) => {
    if (openMenuId === itemId) {
      dispatch(setOpenMenuId(null));
    } else {
      dispatch(setOpenMenuId(itemId));
    }
  };

  const renderMediaItem = ({ item }) => (
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
      {openMenuId !== item.id && (
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
      <View style={styles.header}></View>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tabButton, searchType === "tv" && styles.activeTab]}
            onPress={() => dispatch(setSearchType("tv"))}
          >
            <Text
              style={[
                styles.tabButtonText,
                searchType === "tv" && styles.activeTabText,
              ]}
            >
              TV Shows
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              searchType === "movie" && styles.activeTab,
            ]}
            onPress={() => dispatch(setSearchType("movie"))}
          >
            <Text
              style={[
                styles.tabButtonText,
                searchType === "movie" && styles.activeTabText,
              ]}
            >
              Movies
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={searchQuery.trim() !== "" ? results : popular}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={renderMediaItem}
      />
      {showCheckMark && <AnimatedCheckMark isVisible={showCheckMark} />}
    </View>
  );
};

export default HomeScreen;
