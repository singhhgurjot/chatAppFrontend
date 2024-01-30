import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const UserChat = ({ item }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={{
        flexDirection: "row",
        borderWidth: 0.5,
        borderTopWidth: 0,
        borderColor: "grey",
        padding: 10,
      }}
      onPress={() => {
        navigation.navigate("ChatMessage", {
          recepientId: item._id,
        });
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={{ height: 50, width: 50, borderRadius: 50 }}
      ></Image>
      <View style={{ marginLeft: 10, flex: 1 }}>
        <Text style={{ color: "black", fontWeight: "bold", fontSize: 15 }}>
          {item?.name}
        </Text>
        <Text style={{ color: "gray" }}>Last Message Shows Here</Text>
      </View>
      <View style={{}}>
        <Text style={{ color: "black", fontSize: 11, color: "#585858" }}>
          {" "}
          3:00 pm
        </Text>
      </View>
    </Pressable>
  );
};

export default UserChat;

const styles = StyleSheet.create({});
