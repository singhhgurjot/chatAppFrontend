import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Pressable,
} from "react-native";
import Toast from "react-native-toast-message";
import FastImage from "react-native-fast-image";
import axios from "axios";
import React, { useState, useContext, useLayoutEffect, useEffect } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons.js";
import EmojiSelector from "react-native-emoji-selector";
import { UserType } from "../contexts/userContext";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import image from "./image.jpg";
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
  const [messages, setMessages] = useState([]);
  const [source, setSource] = useState("");
  const handleEmoji = () => {
    setShowEmojiSelector(!showEmojiSelector);
  };
  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `http://192.168.85.115:3000/messages/${userId}/${recepientId}`
      );

      if (response.status === 200) {
        console.log("Okk");
        setMessages(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchMessages();
  }, []);
  useEffect(() => {
    const fetchRec = async () => {
      try {
        const response = await axios.get(
          `http://192.168.85.115:3000/user/${recepientId}`
        );

        setRecepientData(response.data);

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
    console.log("Inside");
    try {
      if (message.trim(" ").length === 0 && messageType != "image") {
        return;
      }
      const formData = new FormData();
      formData.append("senderId", userId);
      formData.append("recepientId", recepientId);

      if (messageType === "image") {
        console.log("Hello");
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
          if (res.status === 200) {
            setMessage("");
            setSelectedImage("");
            fetchMessages();
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
  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };
  const onCamera = async () => {
    launchImageLibrary({ mediaType: "mixed", quality: 1 });
    const result = await launchImageLibrary();

    if (!result.didCancel) {
      handleSend("image", result.assets[0].uri);
    }
  };
  useLayoutEffect(() => {
    try {
      navigation.setOptions({
        headerTitle: "",
        headerLeft: () => {
          return (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons
                name="arrow-back"
                size={30}
                color="#88A9C3"
                onPress={() => {
                  navigation.goBack();
                }}
              ></MaterialIcons>
              <Image
                source={{ uri: recepientData?.image }}
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  resizeMode: "cover",
                  marginLeft: 20,
                }}
              ></Image>
              <Text
                style={{
                  color: "black",
                  marginLeft: 20,
                  fontWeight: "bold",
                  fontStyle: "italic",
                  fontSize: 16,
                }}
              >
                {recepientData?.name}
              </Text>
            </View>
          );
        },
      });
    } catch (err) {
      console.log(err);
    }
  }, [recepientData]);
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView>
        {messages.map((item, key) => {
          if (item.messageType === "text") {
            return (
              <Pressable
                key={key}
                style={[
                  item?.senderId._id === userId
                    ? {
                        alignSelf: "flex-end",
                        backgroundColor: "#88A9C3",
                        padding: 8,
                        maxWidth: "60%",
                        borderRadius: 7,
                        margin: 10,
                      }
                    : {
                        alignSelf: "flex-start",
                        backgroundColor: "#88A9C3",
                        padding: 8,

                        maxWidth: "60%",
                        borderRadius: 7,
                        margin: 10,
                      },
                ]}
              >
                <Text
                  style={{ fontSize: 13, textAlign: "left", color: "white" }}
                >
                  {item.messageText}
                </Text>
                <Text
                  style={{
                    textAlign: "right",
                    fontSize: 9,
                    color: "#ECECEC",
                    marginTop: 5,
                  }}
                >
                  {formatTime(item.timeStamp)}
                </Text>
              </Pressable>
            );
          } else {
            const baseUrl =
              "D:\\Projects\\React Native Chat App\\Backend\\files\\";
            // const imageUrl = item.imageUrl.split("\\").pop();
            // const source1 = require(`./files/${imageUrl}`);
            const localImagePath =
              "D:/Projects/React Native Chat App/Frontend/chatApp/screens/files/image.jpg";

            // Convert local file path to URI with proper encoding for spaces
            const uri =
              "file:///" +
              localImagePath.replace(/\\/g, "/").replace(/ /g, "%20");
            console.log(uri);
            return (
              <Pressable
                key={key}
                style={[
                  item?.senderId._id === userId
                    ? {
                        alignSelf: "flex-end",
                        backgroundColor: "#88A9C3",
                        padding: 8,
                        maxWidth: "60%",
                        borderRadius: 7,
                        margin: 10,
                      }
                    : {
                        alignSelf: "flex-start",
                        backgroundColor: "#88A9C3",
                        padding: 8,

                        maxWidth: "60%",
                        borderRadius: 7,
                        margin: 10,
                      },
                ]}
              >
                <View>
                  <FastImage
                    style={{ height: 200, width: 200 }}
                    source={{
                      uri: item.imageUrl,
                    }}
                  ></FastImage>
                </View>
              </Pressable>
            );
          }
        })}
      </ScrollView>
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
          onPress={onCamera}
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
