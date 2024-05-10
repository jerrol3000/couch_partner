import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { fetchCurrentUserFromFirestore } from "../store/reducers/slice/authSlice";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const userData = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchCurrentUserFromFirestore())
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text style={styles.header}>Your Information</Text>
          <View style={styles.userInfoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>First Name:</Text>
              <Text style={styles.value}>{userData.firstName}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Last Name:</Text>
              <Text style={styles.value}>{userData.lastName}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Username:</Text>
              <Text style={styles.value}>{userData.username}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{userData.email}</Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  userInfoContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 15,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  value: {
    flex: 2,
    fontSize: 16,
    color: "#666",
  },
});
