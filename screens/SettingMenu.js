/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";

const SettingsMenu = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleMenuItemClick = (menuItem) => {
    console.log(`Clicked ${menuItem}`);
  };

  const handleSignOut = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      navigation.navigate("Auth");
    } catch (error) {
      console.log(error);
      Alert.alert("Sign Out Error", error.message);
    }
  };

  const screenHeight = Dimensions.get("window").height;
  const menuTop = -0.23 * screenHeight;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleMenu} style={styles.menuIcon}>
        <Icon name="settings" color="#fff" size={24} />
      </TouchableOpacity>

      {showMenu && (
        <View style={[styles.overlay, { top: menuTop }]}>
          <View style={styles.menu}>
            <TouchableOpacity
              onPress={() => handleMenuItemClick("Settings")}
              style={styles.menuItem}
            >
              <Text style={styles.menuItemText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleMenuItemClick("Profile")}
              style={styles.menuItem}
            >
              <Text style={styles.menuItemText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSignOut}
              style={styles.logoutButton}
            >
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    zIndex: 1,
  },
  menuIcon: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  menu: {
    width: 300,
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 20,
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuItemText: {
    fontSize: 18,
    color: "#fff",
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#ff0000",
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: 150,
  },
  logoutButtonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});

export default SettingsMenu;
