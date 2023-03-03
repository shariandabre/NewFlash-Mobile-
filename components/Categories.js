import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { Animated, Easing } from 'react-native';
import { FlatGrid } from "react-native-super-grid";
import React, { useEffect, useState } from "react";
import Dis_feed from "./discover/Dis_feed";
import { MaterialIcons } from "@expo/vector-icons";

export default function Categories({
  setadd,
  Push_Option,
  feedId,
  setfeedId,
}) {
  const [add_categories, setadd_categories] = useState(false);
  const [categoriesName, setcategoriesName] = useState("");
  const [FeedImg, setFeedImg] = useState();
  const [FeedName, setFeedName] = useState();
  const [search, setsearch] = useState("");
  const [topic_data, setTopic_data] = useState([]);

  const fadeIn = new Animated.Value(0);

  const fadeInAnimation = () => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 350,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeInAnimation();
  }, [])

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    if (search !== "" && search[0] === "#" && search.length > 1) {
      const search_str =
        search.substring(0, 1 - 1) + search.substring(1, search.length);

      fetch(
        `https://api.feedly.com/v3/recommendations/topics/${search_str}?locale=en&count=20`,
        requestOptions
      )
        .then((Response) => Response.json())
        .then((data) => {
          setTopic_data(data.feedInfos);
        });
    } else if (search !== "" && search[0] !== "#") {
      fetch(
        `https://api.feedly.com/v3/search/feeds?query=${search}&count=20&locale=en`,
        requestOptions
      )
        .then((Response) => Response.json())
        .then((data) => {
          setTopic_data(data.results);
        });
    }
  }, [search]);

  const handlePress = () => {
    Push_Option(categoriesName, FeedName, feedId);
    setsearch("");
    setcategoriesName("");
  };
  return (
    <KeyboardAvoidingView style={styles.contain} enabled>
      {!add_categories && (
      <Animated.View style={[styles.window,{ opacity: fadeIn }]}>      
          <View style={styles.nav}>
            <View
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "500",
                  fontSize: 24,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Discover
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setadd(false);
                setsearch("");
              }}
            >
              <EvilIcons name="close" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <View style={styles.search}>
              <View
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "rgba(255, 255, 255, 0.10)",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextInput
                  style={[
                    styles.input,
                    { color: "#fff", fontWeight: "500", fontSize: 18 },
                  ]}
                  onChangeText={setsearch}
                  value={search}
                  placeholder="Search"
                  placeholderTextColor="#888"
                />
              </View>
            </View>
            <View style={styles.topic}>
              {search === "" && (
                <View style={styles.btn}>
                  <FlatGrid
                    data={[
                      "tech",
                      "news",
                      "science",
                      "sports",
                      "media",
                      "culture",
                      "food",
                      "open source",
                    ]}
                    style={styles.gridView}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        key={item}
                        onPress={() => {
                          setsearch(`#${item}`);
                        }}
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.10)",
                          borderRadius: 10,
                          height: 100,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: 24,
                            fontWeight: "400",
                          }}
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}
              {search !== "" && (
                <View>
                  <Dis_feed
                    setFeedImg={setFeedImg}
                    setFeedName={setFeedName}
                    setadd_categories={setadd_categories}
                    topic_data={topic_data}
                    setTopic_data={setTopic_data}
                    feedId={feedId}
                    setfeedId={setfeedId}
                  />
                </View>
              )}
            </View>
          </View>
          </Animated.View>
      )}
      {add_categories && (
        <View style={[styles.window, { height: "50%"}]}>
          <View style={[styles.nav, { height: "15%" }]}>
            <View
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "500",
                  fontSize: 24,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Add Feed
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setadd(false);
                setsearch("");
              }}
            >
              <EvilIcons name="close" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <View style={styles.form}>
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  flex: 1,
                }}
              >
                <Image
                  source={{ uri: FeedImg }}
                  style={{
                    height: "70%",
                    resizeMode: "center",
                    aspectRatio: 1 / 1,
                    borderRadius: 15,
                    borderColor: "rgba(255, 255, 255, 0.05)",
                    borderWidth: 0.7,
                  }}
                />
              </View>
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  flex: 1,
                  paddingTop: 10,
                }}
              >
                <View style={[styles.search, { flex: 1 }]}>
                  <View
                    style={{
                      height: "100%",
                      width: "100%",
                      backgroundColor: "rgba(255, 255, 255, 0.10)",
                      borderRadius: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={[
                        styles.input,
                        {
                          color: "#fff",
                          fontWeight: "500",
                          fontSize: 18,
                          textAlignVertical: "center",
                        },
                      ]}
                    >
                      {FeedName}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.search,
                    {
                      flex: 1,
                      justifyContent: "space-between",
                      flexDirection: "row",
                    },
                  ]}
                >
                  <View
                    style={{
                      height: "100%",
                      width: "100%",
                      backgroundColor: "rgba(255, 255, 255, 0.10)",
                      borderRadius:10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TextInput
                      style={[
                        styles.input,
                        { color: "#fff", fontWeight: "500", fontSize: 18 },
                      ]}
                      value={categoriesName}
                      onChangeText={setcategoriesName}
                      placeholder="Category"
                      placeholderTextColor="#888"
                    />
                  </View>

                </View>
                <View
                  style={[
                    styles.search,
                    { flex: 1, marginBottom: 0, alignItems: "flex-end" },
                  ]}
                >
                  <TouchableOpacity
                    style={{
                      height: "90%",
                      paddingHorizontal: 20,
                      backgroundColor: "#0a95ff",
                      borderRadius: 10,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={handlePress}
                  >
                    <MaterialIcons name="playlist-add" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  contain: {
    position: "absolute",
    left: 0,
    top: 0,
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.70)",
  },
  window: {
    position: "relative",
    backgroundColor: "#1a1b1f",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    height: "70%",
    borderRadius: 20,
  },
  gridView: {},
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "100%",
    borderRadius: 10,
    // backgroundColor: "rgba(255, 255, 255, 0.70)",
    padding: 10,
  },
  nav: {
    position: "relative",
    width: "100%",
    height: "10%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.20)",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    justifyContent: "space-between",
  },
  search: {
    width: "100%",
    height: "8.5%",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  topic: {
    height: "84.9%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  form: {
    flexDirection: "column",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-around",
    width: "100%",
    flex: 1,
  },
  btn: {
    height: "100%",
    width: "100%",
  },
  input: {
    height: "90%",
    width: "90%",
  },
});
