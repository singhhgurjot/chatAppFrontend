import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Modal,
  Alert,
  AsyncStore,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { useNavigation } from "@react-navigation/native";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const statusBarHeight = StatusBar.currentHeight;
  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem("token");
  //       if (token) {
  //         navigation.replace("Home");
  //       } else {
  //       }
  //     } catch (err) {
  //       console.log("Error  ", err);
  //     }
  //   };
  //   checkLoginStatus();
  // }, []);
  const handleLogin = () => {
    if (email.trim().length == 0 || password.trim().length == 0) {
      Alert.alert("Please fill all the fields");
      return;
    }

    setLoading(true);
    const user = { email: email, password: password };
    axios
      .post("http://192.168.85.115:3000/login", user)
      .then((res) => {
        setLoading(false);

        if (
          res.data.token &&
          res.data.message == "Login Successfull!" &&
          res.data.success == true
        ) {
          AsyncStorage.setItem("token", res.data.token);
          navigation.replace("Home");
        } else {
          Alert.alert(res.data.message);
        }
      })
      .catch((err) => {
        if (err) {
          console.log(err);
          setLoading(false);
          Alert.alert("Internal Server Error");
        }
      });
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: 10,
        alignItems: "center",
      }}
    >
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={statusBarHeight}
      >
        <Modal transparent={true} visible={loading} animationType="slide">
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <ActivityIndicator
              size={"large"}
              color={"#88A9C3"}
            ></ActivityIndicator>
          </View>
        </Modal>
        <View>
          <View
            style={{
              alignItems: "center",
              marginTop: 100,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 22,
                color: "#88A9C3",
                fontWeight: "600",
              }}
            >
              Sign In
            </Text>
            <Text
              style={{
                marginTop: 10,
                color: "#2B4257",
                fontSize: 20,
                fontWeight: "500",
                fontStyle: "italic",
              }}
            >
              Sign In to your Account
            </Text>
          </View>
          <View style={{ marginTop: 50 }}>
            <Text style={{ color: "grey", fontSize: 17 }}>Email</Text>
            <TextInput
              style={{
                borderBottomColor: "gray",
                borderBottomWidth: 2,
                width: 300,
                fontStyle: "italic",
                color: "black",
              }}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
              placeholderTextColor={"black"}
              placeholder="Enter your Email"
            />
          </View>
          <View style={{ marginTop: 30 }}>
            <Text style={{ color: "grey", fontSize: 17 }}>Password</Text>
            <TextInput
              style={{
                borderBottomColor: "gray",
                borderBottomWidth: 2,
                width: 300,
                fontStyle: "italic",
                color: "black",
              }}
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
              placeholderTextColor={"black"}
              placeholder="Enter your Password"
            />
          </View>
          <Pressable
            style={{
              backgroundColor: "#88A9C3",
              padding: 15,
              width: 200,
              borderRadius: 10,
              marginTop: 40,
              marginLeft: "auto",
              marginRight: "auto",
            }}
            onPress={handleLogin}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                fontWeight: "bold",
                color: "white",
              }}
            >
              Login
            </Text>
          </Pressable>
          <Pressable
            style={{ marginTop: 20 }}
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={{ color: "grey", textAlign: "center", fontSize: 15 }}>
              Dont have an account? Sign Up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
