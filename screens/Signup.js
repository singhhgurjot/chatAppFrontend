import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "react-native";
import Toast from "react-native-toast-message";
import axios from "axios";
const Login = () => {
  const statusBarHeight = StatusBar.currentHeight;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    if (
      name.trim().length != 0 &&
      email.trim().length != 0 &&
      password.trim().length != 0 &&
      image.trim().length != 0
    ) {
      const user = {
        name: name,
        email: email,
        password: password,
        image: image,
      };
      setLoading(true);
      axios
        .post("http://192.168.85.115:3000/register", user)
        .then((res) => {
          console.log(res);
          setLoading(false);
          if (
            res.data.message === "An account with this email Already Exists"
          ) {
            Toast.show({
              type: "error",
              text1: res.data.message,
              visibilityTime: 2000,
              text1Style: { fontSize: 15, fontWeight: "400" },
            });
            return;
          }
          Toast.show({
            type: "success",
            text1: res.data.message,
            visibilityTime: 2000,
            text1Style: { fontSize: 15, fontWeight: "400" },
          });
          setName("");
          setEmail("");
          setPassword("");
          setImage("");
          navigation.replace("Login");
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          Toast.show({
            type: "error",
            text1: "Registration Failed!",
            visibilityTime: 2000,
            text1Style: { fontSize: 15, fontWeight: "400" },
          });
        });
    } else {
      Toast.show({
        type: "error",
        text1: "Fill all the fields!",
        visibilityTime: 2000,
        text1Style: { fontSize: 15, fontWeight: "400" },
      });
    }
  };
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          padding: 10,
          alignItems: "center",
        }}
      >
        <KeyboardAvoidingView behavior="padding">
          <ScrollView>
            <View
              style={{
                alignItems: "center",
                marginTop: 50,
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
                Register
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
                Create an Account!
              </Text>
            </View>
            <View style={{ marginTop: 50 }}>
              <Text style={{ color: "grey", fontSize: 17 }}>Name</Text>
              <TextInput
                style={{
                  borderBottomColor: "gray",
                  borderBottomWidth: 2,
                  width: 300,
                  fontStyle: "italic",
                  color: "black",
                }}
                value={name}
                onChangeText={(text) => {
                  setName(text);
                }}
                placeholderTextColor={"black"}
                placeholder="Enter your Name"
              />
            </View>
            <View style={{ marginTop: 30 }}>
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
            <View style={{ marginTop: 30 }}>
              <Text style={{ color: "grey", fontSize: 17 }}>Image</Text>
              <TextInput
                style={{
                  borderBottomColor: "gray",
                  borderBottomWidth: 2,
                  width: 300,
                  fontStyle: "italic",
                  color: "black",
                }}
                value={image}
                onChangeText={(text) => {
                  setImage(text);
                }}
                placeholderTextColor={"black"}
                placeholder="Upload Your Image"
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
              onPress={handleSubmit}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Sign Up
              </Text>
            </Pressable>
            <Pressable
              style={{ marginTop: 20 }}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text
                style={{ color: "grey", textAlign: "center", fontSize: 15 }}
              >
                Already have an account? Login
              </Text>
            </Pressable>
            <Modal transparent={true} animationType="slide" visible={loading}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <ActivityIndicator size="large" color="#88A9C3" />
              </View>
            </Modal>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      <Toast />
    </>
  );
};

export default Login;
const styles = StyleSheet.create({});
