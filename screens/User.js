import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import axios from "axios";
import { UserType } from "../contexts/userContext";
import MaterialIcons from "react-native-vector-icons/MaterialIcons.js";
const User = ({ item }) => {
  const { userId, setUserId } = useContext(UserType);
  const [sentFriendReq, setFriendReq] = useState(false);
  const sendFriendRequest = (senderId, recepientId) => {
    const data = { currentUserId: senderId, sentUserId: recepientId };
    axios
      .post("http://192.168.85.115:3000/sendFriendRequest", data)
      .then((res) => {
        if (
          res.status === 200 &&
          res.data.message === "Friend Request Sent" &&
          res.data.success === true
        ) {
          setFriendReq(true);
          Alert.alert("Friend Request Sent");
        } else {
          Alert.alert("Friend Request Not Sent");
        }
      });
  };
  const takeFriendRequest = (senderId, recepientId) => {
    const data = { currentUserId: senderId, sentUserId: recepientId };

    axios
      .post("http://192.168.85.115:3000/takeFriendRequest", data)
      .then((res) => {
        if (
          res.status === 200 &&
          res.data.message === "Friend Request taken back" &&
          res.data.success === true
        ) {
          setFriendReq(false);
          Alert.alert("Friend Request taken back");
        } else {
          Alert.alert("Friend Request not Taken Back");
        }
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Friend Request could not be taken back");
      });
  };
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
        <Text style={{ color: "black", fontWeight: "bold" }}>{item?.name}</Text>
        <Text style={{ color: "grey" }}>{item?.email}</Text>
      </View>
      <Pressable
        onPress={
          !sentFriendReq
            ? () => {
                sendFriendRequest(userId, item._id);
              }
            : () => {
                takeFriendRequest(userId, item._id);
              }
        }
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
        <Text style={{}}> {sentFriendReq ? "Sent" : "Add Friend"}</Text>
        {sentFriendReq ? (
          <MaterialIcons name="done" size={20}></MaterialIcons>
        ) : (
          <MaterialIcons name="person-add" size={20}></MaterialIcons>
        )}
      </Pressable>
    </Pressable>
  );
};

export default User;

const styles = StyleSheet.create({});
