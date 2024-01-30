import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import Toast from "react-native-toast-message";
import axios from "axios";
import React, { useState, useContext, useLayoutEffect, useEffect } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons.js";
import EmojiSelector from "react-native-emoji-selector";
import { UserType } from "../contexts/userContext";
import { useNavigation, useRoute } from "@react-navigation/native";
const ChatMessage = () => {
  const route = useRoute();
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [message, setMessage] = useState("");
  const [recepientData, setRecepientData] = useState();
  const { userId, setUserId } = useContext(UserType);
  const navigation = useNavigation();
  const [done, setDone] = useState(false);
  const { recepientId } = route.params;
  const handleEmoji = () => {
    setShowEmojiSelector(!showEmojiSelector);
  };
  useEffect(() => {
    const fetchRec = async () => {
      try {
        const response = await axios.get(
          `http://192.168.85.115:3000/user/${recepientId}`
        );

        console.log(response.data);
        setRecepientData(response.data);
        console.log(recepientData);
        setDone(true);
      } catch (err) {
        console.log(err);
        Toast.show({
          type: "error",
          text1: "Internal Server Error",
          visibilityTime: 2000,
          text1Style: { fontSize: 15 },
        });
      }
    };
    fetchRec();
  }, []);
  const handleSend = (messageType, imageUri) => {
    try {
      if (message.trim(" ").length === 0) {
        return;
      }
      const formData = new FormData();
      formData.append("senderId", userId);
      formData.append("recepientId", recepientId);

      if (messageType === "image") {
        formData.append("messageType", "image");
        formData.append("imageFile", {
          uri: imageUri,
          name: "image.jpg",
          type: "image/jpeg",
        });
      } else {
        formData.append("messageType", "text");
        formData.append("messageText", message);
      }
      axios({
        method: "post",
        url: "http://192.168.85.115:3000/sendMessage",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          if (res.ok) {
            setMessage("");
            setSelectedImage("");
          }
        })
        .catch((err) => {
          console.log(err);
          console.log("Unable To send Message");
        });
    } catch (err) {
      console.log(err);
      console.log("Error in sending the message");
    }
  };
  useLayoutEffect(() => {
    try {
      navigation.setOptions({
        headerTitle: "",
        headerLeft: () => {
          return (
            <View
              style={{ flexDirection: "row", gap: 20, alignItems: "center" }}
            >
              <MaterialIcons
                name="arrow-back"
                size={30}
                color="#88A9C3"
              ></MaterialIcons>
              <Image
                source={{ uri: recepientData?.image }}
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  resizeMode: "cover",
                }}
              ></Image>
            </View>
          );
        },
      });
    } catch (err) {
      console.log(err);
    }
  }, [done]);
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView></ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderColor: "#dddddd",
          marginBottom: showEmojiSelector ? 0 : 10,
        }}
      >
        <MaterialIcons
          name={"mood"}
          size={30}
          color="#88A9C3"
          style={{ marginRight: 10 }}
          onPress={handleEmoji}
        ></MaterialIcons>
        <TextInput
          placeholder="Type your message!"
          placeholderTextColor={"grey"}
          value={message}
          onChangeText={(text) => {
            setMessage(text);
          }}
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#dddddd",
            borderRadius: 20,
            paddingHorizontal: 10,
            color: "black",
          }}
        ></TextInput>
        <MaterialIcons
          name={"photo-camera"}
          size={30}
          color="#88A9C3"
          style={{ marginLeft: 10 }}
        ></MaterialIcons>
        <MaterialIcons
          name={"mic"}
          size={30}
          color="#88A9C3"
          style={{ marginLeft: 10 }}
        ></MaterialIcons>
        <MaterialIcons
          name={"send"}
          size={30}
          color="#88A9C3"
          style={{ marginLeft: 10 }}
          onPress={handleSend}
        ></MaterialIcons>
      </View>
      {showEmojiSelector ? (
        <EmojiSelector
          style={{ height: 300, color: "black" }}
          onEmojiSelected={(emoji) => {
            setMessage((prev) => prev + emoji);
          }}
        />
      ) : (
        ""
      )}
    </KeyboardAvoidingView>
  );
};

export default ChatMessage;

const styles = StyleSheet.create({});
