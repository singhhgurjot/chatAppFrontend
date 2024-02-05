import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserType } from "../contexts/userContext";
import MaterialIcons from "react-native-vector-icons/MaterialIcons.js";
import Toast from "react-native-toast-message";
const User = ({ item }) => {
  const { userId, setUserId } = useContext(UserType);
  const [sentFriendReq, setFriendReq] = useState(false);
  const [sentList, setSentList] = useState([]);
  const [alreadyFriends, setAlreadyFriends] = useState([]);
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
          Toast.show({
            type: "success",
            text1: "Friend request sent",
            visibilityTime: 2000,
            text1Style: { fontSize: 15 },
          });
        } else {
          Toast.show({
            type: "error",
            text1: "Error sending friend request",
            visibilityTime: 2000,
            text1Style: { fontSize: 15 },
          });
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
          Toast.show({
            type: "success",
            text1: "Friend request taken back",
            visibilityTime: 2000,
            text1Style: { fontSize: 15 },
          });
        } else {
          Toast.show({
            type: "error",
            text1: "Error taking Friend request back",
            visibilityTime: 2000,
            text1Style: { fontSize: 15 },
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Friend Request could not be taken back");
      });
  };
  useEffect(() => {
    const getSentRequests = async (userId) => {
      axios
        .get(`http://192.168.85.115:3000/getSentRequests/${userId}`)
        .then((res) => {
          const alreadySent = res.data.sentRequests.map((item) => item._id);
          setSentList(alreadySent);
        });
    };
    getSentRequests(userId);
  }, [userId]);
  useEffect(() => {
    const getAllFriends = async (userId) => {
      axios
        .get(`http://192.168.85.115:3000/getAllFriends/${userId}`)
        .then((res) => {
          const friends = res.data.friends.map((item) => item._id);
          setAlreadyFriends(friends);
        });
    };
    getAllFriends(userId);
  }, [userId]);
  console.log(sentList);

  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderWidth: 0.5,
        borderTopWidth: 0,
        borderColor: "grey",
      }}
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
      {alreadyFriends.includes(item._id) ? (
        <Pressable
          style={{
            backgroundColor: "#88A9C3",
            padding: 10,
            borderRadius: 6,
            width: 120,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginRight: 5,
          }}
        >
          <Text style={{ textAlign: "center", color: "white" }}>Friends</Text>
        </Pressable>
      ) : sentList.includes(item._id) ? (
        <Pressable
          onPress={takeFriendRequest(userId, item._id)}
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
          <Text style={{}}> Sent</Text>
          {sentFriendReq ? (
            <MaterialIcons name="done" size={20}></MaterialIcons>
          ) : (
            <MaterialIcons name="person-add" size={20}></MaterialIcons>
          )}
        </Pressable>
      ) : (
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
      )}
    </Pressable>
  );
};

export default User;

const styles = StyleSheet.create({});
