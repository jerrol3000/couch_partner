import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text } from "react-native";
import { fetchCurrentUserFromFirestore } from "../store/reducers/slice/authSlice";

export default function ProfileScreen() {
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch(); // Get dispatch function

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dispatch(fetchCurrentUserFromFirestore());
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  console.log("userData", userData);

  return (
    <View>
      <Text>ProfileScreen</Text>
      {userData && (
        <View>
          <Text>Name: {userData.name}</Text>
          <Text>Email: {userData.email}</Text>
          {/* Add more user information here */}
        </View>
      )}
    </View>
  );
}
