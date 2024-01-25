import { Pressable, StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { UserType } from "../contexts/userContext";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Toast from "react-native-toast-message";
import UserChat from "./UserChat";

const Chats = () => {
  const [allFriends, setAllFriends] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  const navigate = useNavigation();
  useEffect(() => {
    const getFriends = async () => {
      try {
        axios
          .get(`http://192.168.85.115:3000/getAllFriends/${userId}`)
          .then((res) => {
            if (res.status == 200 && res.data.success == true) {
              setAllFriends(res.data.friends);
            }
          });
      } catch (err) {
        console.log(err);
        Toast.show({
          type: "error",
          text1: "Something went wrong!",
          visibilityTime: 2000,
          text1Style: { fontSize: 15 },
        });
      }
    };
    getFriends();
  }, []);
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable>
          {allFriends.map((item, index) => {
            return <UserChat item={item} key={index}></UserChat>;
          })}
        </Pressable>
      </ScrollView>
      <Toast />
    </>
  );
};

export default Chats;

const styles = StyleSheet.create({});
