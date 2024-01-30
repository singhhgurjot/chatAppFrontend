import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { UserType } from "../contexts/userContext";
import FriendRequests from "./FriendRequests.js";
import Toast from "react-native-toast-message";
const Friends = () => {
  const { userId, setUserId } = useContext(UserType);
  const [friendRequests, setFriendRequests] = useState([]);
  useEffect(() => {
    axios
      .get(`http://192.168.85.115:3000/viewFriendRequests/${userId}`)
      .then((res) => {
        setFriendRequests(res.data.friendRequests);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Could not fetch friend requests");
      });
  }, []);

  return (
    <>
      <View
        style={{
          padding: 10,
          marginHorizontal: 12,
        }}
      >
        {friendRequests.length > 0 && (
          <Text style={{ color: "black", marginBottom: 20 }}>
            Your Friend Requests!
          </Text>
        )}
        {friendRequests.map((item, key) => {
          return (
            <FriendRequests
              item={item}
              key={key}
              friendRequests={friendRequests}
              setFriendRequest={setFriendRequests}
            />
          );
        })}
      </View>
      <Toast />
    </>
  );
};
export default Friends;

const styles = StyleSheet.create({});
