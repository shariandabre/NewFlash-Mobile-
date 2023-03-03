import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

export default function TopicList({
  setFeedImg,
  setFeedName,
  setadd_categories,
  list,
  feedId,
  setfeedId,
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        setfeedId(list.feedId),  setFeedImg(list.visualUrl ),
        setFeedName(list.title), setadd_categories(true);
      }}
    >
      <View style={styles.flex}>
        <View style={styles.contain}>
          <Image
            source={{ uri: list.visualUrl }}
            style={{
              height: "100%",
              flex: 1,
              borderRadius: 15,
              borderColor: "rgba(255, 255, 255, 0.05)",
              borderWidth: 0.7,
            }}
          />

          <View
            style={{
              height: "100%",
              display: "flex",
              flex: 4,
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <View style={{flex:1, width: "95%" }}>
              <Text
                numberOfLines={1}
                style={{ fontWeight: "600", fontSize: 18, color: "white" }}
              >
                {list.title}
              </Text>
            </View>
            <View style={{flex:2, width: "95%" }}>
              <Text
                numberOfLines={2}
                style={{ fontWeight: "400", fontSize: 14, color: "gray" }}
              >
                {list.description}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  flex: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  contain: {
    height: 96,
    width: "100%",
    padding: 7,
    borderRadius: 10,
    marginVertical: 2,
    backgroundColor: "rgba(255, 255, 255, 0.10)",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
