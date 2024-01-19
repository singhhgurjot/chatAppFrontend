import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => {
        return (
          <Text
            style={{
              color: "#0074B7",
              fontSize: 18,
              fontWeight: "bold",
              fontStyle: "italic",
            }}
          >
            YAP YAP
          </Text>
        );
      },
      headerRight: () => {
        return;
      },
    });
  }, []);
  return <View></View>;
};

export default Home;

const styles = StyleSheet.create({});
