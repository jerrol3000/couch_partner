import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { store } from "./store";

import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import FavoritesScreen from "./screens/FavoritesScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
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
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
