import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { store } from "./store";
import { registerRootComponent } from "expo";

import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import WatchListScreen from "./screens/WatchListScreen";
import NavigationBar from "./screens/NavigationBar";
import AuthScreen from "./screens/AuthScreen";
import { setCurrentScreen } from "./store/reducers/slice/screensSlice";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./firebaseConfig";

const Stack = createStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setIsAuthenticated(user);
    });
    return unsubscribe;
  }, []);

  const handleScreenChange = (newState) => {
    const currentRoute = newState.routes[newState.index];
    if (currentRoute) {
      store.dispatch(setCurrentScreen(currentRoute.name));
    }
  };

  return (
    <Provider store={store}>
      <NavigationContainer onStateChange={handleScreenChange}>
        <Stack.Navigator>
          {!isAuthenticated ? (
            <Stack.Screen
              name="Auth"
              component={AuthScreen}
              options={{ title: "Login" }}
            />
          ) : (
            <>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: "Home" }}
              />
              <Stack.Screen
                name="Favorites"
                component={FavoritesScreen}
                options={{ title: "Favorites" }}
              />
              <Stack.Screen
                name="Details"
                component={DetailsScreen}
                options={{ title: "Details" }}
              />
              <Stack.Screen
                name="WatchList"
                component={WatchListScreen}
                options={{ title: "Watch List" }}
              />
            </>
          )}
        </Stack.Navigator>
        {isAuthenticated && <NavigationBar />}
      </NavigationContainer>
    </Provider>
  );
};
registerRootComponent(App);
export default App;
