import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, FontAwesome, Feather } from "@expo/vector-icons";
import SettingsMenu from "./SettingMenu";

const NavigationBar = () => {
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.navBar}>
      <TouchableOpacity
        onPress={() => navigateToScreen("Home")}
        style={styles.navItem}
      >
        <AntDesign name="home" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigateToScreen("Favorites")}
        style={styles.navItem}
      >
        <FontAwesome name="heart" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigateToScreen("WatchList")}
        style={styles.navItem}
      >
        <Feather name="eye" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <SettingsMenu />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#2c3e50",
    paddingVertical: 10,
    borderTopWidth: 2,
    borderTopColor: "#3498db",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 20,
  },
});

export default NavigationBar;
