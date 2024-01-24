import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons.js";
const FriendRequests = ({ item, friendRequests, setFriendRequest }) => {
  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={{ height: 50, width: 50, borderRadius: 25, resizeMode: "cover" }}
      ></Image>

      <Text
        style={{ color: "black", fontWeight: "bold", marginLeft: 10, flex: 1 }}
      >
        {item.name} sent you a friend request
      </Text>
      <Pressable
        style={{
          backgroundColor: "#88A9C3",
          padding: 10,
          borderRadius: 6,
          width: 80,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center", // Center items horizontally
        }}
      >
        <Text> Accept </Text>
        <MaterialIcons name="done" size={20}></MaterialIcons>
      </Pressable>
    </Pressable>
  );
};

export default FriendRequests;

const styles = StyleSheet.create({});
