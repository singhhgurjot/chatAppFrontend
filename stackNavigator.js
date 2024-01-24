import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screens/Login.js";
import SignUp from "./screens/Signup.js";
import Home from "./screens/Home.js";
import Friends from "./screens/Friends.js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const stackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Friends" component={Friends} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default stackNavigator;

const styles = StyleSheet.create({});
