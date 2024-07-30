import React, { useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch } from "react-redux";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";
import useClickOutside from "./useClickOutside";

const SettingsMenu = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleMenuItemClick = (menuItem) => {
    console.log(`Clicked ${menuItem}`);
    setShowMenu(false); // Close menu after clicking an item
  };

  const handleSignOut = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      navigation.navigate("Auth");
      setShowMenu(false); // Close menu after sign out
    } catch (error) {
      console.log(error);
      Alert.alert("Sign Out Error", error.message);
    }
  };

  const screenHeight = Dimensions.get("window").height;
  const menuTop = -0.23 * screenHeight;

  useClickOutside(menuRef, () => setShowMenu(false));

  return (
    <TouchableWithoutFeedback onPress={() => setShowMenu(false)}>
      <View style={styles.container}>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuIcon}>
          <Icon name="settings" color="#fff" size={24} />
        </TouchableOpacity>

        {showMenu && (
          <TouchableWithoutFeedback>
            <View style={[styles.overlay, { top: menuTop }]}>
              <View style={styles.menu} ref={menuRef}>
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
                  <Text
                    style={styles.menuItemText}
                    onPress={() => navigation.navigate("Profile")}
                  >
                    Profile
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSignOut}
                  style={styles.logoutButton}
                >
                  <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </TouchableWithoutFeedback>
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
