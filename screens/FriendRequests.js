import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useContext } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons.js";
import axios from "axios";
import Toast from "react-native-toast-message";
import { UserContext, UserType } from "../contexts/userContext";
const FriendRequests = ({ item, friendRequests, setFriendRequest }) => {
  const { userId, setUserId } = useContext(UserType);
  const accept = (friendRequestId) => {
    const data = { currentUserId: userId, recepientUserId: item._id };
    axios
      .post("http://192.168.85.115:3000/acceptFriendRequest", data)
      .then((res) => {
        if (res.status == 200 && res.data.message === "Accepted Successfully") {
          console.log("Hii");
          Toast.show({
            type: "success",
            text1: res.data.message,
            visibilityTime: 2000,
            text1Style: { fontSize: 15 },
          });
          setFriendRequest(
            friendRequests.filter((request) => request._id !== friendRequestId)
          );
        } else {
          Toast.show({
            type: "error",
            text1: res.data.message,
            visibilityTime: 2000,
            text1Style: { fontSize: 15 },
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Toast.show({
          type: "error",
          text1: "Something went wrong!",
          visibilityTime: 2000,
          text1Style: { fontSize: 15 },
        });
      });
  };
  return (
    <>
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          marginBottom: 20,
        }}
      >
        <Image
          source={{ uri: item.image }}
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            resizeMode: "cover",
          }}
        ></Image>

        <Text
          style={{
            color: "black",
            fontWeight: "bold",
            marginLeft: 10,
            flex: 1,
          }}
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
          onPress={() => {
            accept(item._id);
          }}
        >
          <Text> Accept </Text>
          <MaterialIcons name="done" size={20}></MaterialIcons>
        </Pressable>
      </Pressable>
      <Toast />
    </>
  );
};

export default FriendRequests;

const styles = StyleSheet.create({});
