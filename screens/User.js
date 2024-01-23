import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons.js";
const User = ({ item }) => {
  return (
    <Pressable
      style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}
    >
      <View style={{}}>
        <Image
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            resizeMode: "cover",
          }}
          source={{
            uri: item.image,
          }}
        ></Image>
      </View>
      <View style={{ marginLeft: 10, flex: 1 }}>
        <Text style={{ color: "black" }}>{item?.name}</Text>
        <Text style={{ color: "black" }}>{item?.email}</Text>
      </View>
      <Pressable
        style={{
          backgroundColor: "#88A9C3",
          padding: 10,
          borderRadius: 6,
          width: 120,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginRight: 5,
        }}
      >
        <Text> Add Friend</Text>
        <MaterialIcons name="person-add" size={20}></MaterialIcons>
      </Pressable>
    </Pressable>
  );
};

export default User;

const styles = StyleSheet.create({});
