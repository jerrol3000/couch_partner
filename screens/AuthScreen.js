import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
  Platform,
} from "react-native";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { FIREBASE_DB } from "../firebaseConfig";
import { setUser } from "../store/reducers/slice/authSlice";
import { styles } from "../styles/authStyle";

const AuthScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [signUpMode, setSignUpMode] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);

  useEffect(() => {
    const subscribe = FIREBASE_AUTH.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Home");
      }
    });
    return subscribe;
  }, []);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      dispatch(setUser(JSON.stringify(response.user)));
    } catch (error) {
      console.log(error);
      Alert.alert("Sign In Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  const userData = {
    email,
    firstName,
    lastName,
    username,
  };

  const handleSignUp = async () => {
    if (
      !email ||
      !password ||
      !passwordConfirmation ||
      !firstName ||
      !lastName ||
      !username
    ) {
      Alert.alert("Validation Error", "Please fill in all fields.");
      return;
    }

    if (password !== passwordConfirmation) {
      Alert.alert("Validation Error", "Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      dispatch(setUser(JSON.stringify(response.user)));

      const docRef = await addDoc(collection(FIREBASE_DB, "users"), userData);
      console.log(docRef);
      Alert.alert(
        "Registration Successful",
        "Check your email for verification!"
      );
    } catch (error) {
      console.log(error);
      Alert.alert("Registration Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/login-wallpaper.jpeg")}
      style={styles.backgroundImage}
      onLoad={() => setBackgroundLoaded(true)}
    >
      {!backgroundLoaded && <ActivityIndicator style={styles.loader} />}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContentContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formContainer}>
            <Text style={styles.logo}>Couch Partner</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              textContentType="oneTimeCode" //eliminate the flickering
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              textContentType="oneTimeCode" //eliminate the flickering
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            {signUpMode && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  secureTextEntry={true}
                  value={passwordConfirmation}
                  onChangeText={(text) => setPasswordConfirmation(text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="First Name"
                  value={firstName}
                  onChangeText={(text) => setFirstName(text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Last Name"
                  value={lastName}
                  onChangeText={(text) => setLastName(text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  value={username}
                  onChangeText={(text) => setUsername(text)}
                />
              </>
            )}
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "blue" }]}
              onPress={signUpMode ? handleSignUp : handleSignIn}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.buttonText}>
                  {signUpMode ? "Sign Up" : "Sign In"}
                </Text>
              )}
            </TouchableOpacity>
            {!signUpMode && (
              <TouchableOpacity
                style={styles.signUpTextContainer}
                onPress={() => setSignUpMode(true)}
              >
                <Text style={styles.signUpText}>
                  If you don't have an account, Sign Up
                </Text>
              </TouchableOpacity>
            )}
            {signUpMode && (
              <TouchableOpacity
                style={styles.signUpTextContainer}
                onPress={() => setSignUpMode(false)}
              >
                <Text style={styles.signUpText}>
                  If you have an account, Login
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default AuthScreen;
