import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useLayoutEffect, useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../contexts/userContext.js";
import MaterialIcons from "react-native-vector-icons/MaterialIcons.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { Alert } from "react-native";
import User from "./User.js";
import Toast from "react-native-toast-message";
import axios from "axios";
const Home = () => {
  const { userId, setUserId } = useContext(UserType);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => {
        return (
          <Text
            style={{
              color: "#1B2E3C",
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
        return (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <Pressable
              onPress={() => {
                navigation.navigate("Chats");
              }}
            >
              <MaterialIcons name="chat" size={30} color="#1B2E3C" />
            </Pressable>

            <Pressable
              onPress={() => {
                navigation.navigate("Friends");
              }}
            >
              <MaterialIcons name="group" size={30} color="#1B2E3C" />
            </Pressable>
          </View>
        );
      },
    });
  }, []);
  useEffect(() => {
    try {
      const fetchUser = async () => {
        const userId = await AsyncStorage.getItem("userId");

        setUserId(userId);

        await axios
          .get(`http://192.168.85.115:3000/getUsers/${userId}`)
          .then((res) => {
            setUsers(res.data.users);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      fetchUser();
    } catch (err) {
      console.log(err);
    }
  }, []);
  const [users, setUsers] = useState([]);
  return (
    <>
      <View>
        <View>
          {users.map((item, index) => {
            return <User item={item} key={index}></User>;
          })}
        </View>
      </View>
      <Toast />
    </>
  );
};
export default Home;
const styles = StyleSheet.create({});
