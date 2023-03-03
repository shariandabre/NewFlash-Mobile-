import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions, ScrollView, ActivityIndicator,Image } from "react-native";
import ArticleList from "./feed/ArticleList";

export default function Feed({ content, setdata, settitle ,click_fetch}) {
  const [isLoading, setIsLoading] = useState(false);
  const [select_category, setselect_category] = useState(false);
  useEffect(() => {
    if(click_fetch){
      setIsLoading(content.length === 0);
      setselect_category(false);
    }
    else{
      setIsLoading(false);
      setselect_category(true);
    }
  }, [content,click_fetch]);



  return (
    <>
    { select_category &&
          <View style={[styles.contain, { height: Dimensions.get("window").height - 224 }]}>
          <View style={[styles.flex, { justifyContent: "center" }]}>
            <Text style={{color:"#555",fontSize:26,fontWeight:"600",marginBottom:10}} >Select or create a category</Text>
            <Image                 
            source={require("../assets/cat.png")}
                style={{
                  height: "40%",
                  aspectRatio:1/1,
                  borderRadius: 50,
                }} />
          </View>
        </View>
    }
      {isLoading ? (
        <View style={[styles.contain, { height: Dimensions.get("window").height - 224 }]}>
          <View style={[styles.flex, { justifyContent: "center" }]}>
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        </View>
      ) : (
        <ScrollView style={styles.contain}>
          {content.map((item, idx) => (
            <View key={idx}>
              <ArticleList list={item} setdata={setdata} settitle={settitle} />
            </View>
          ))}
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  contain: {
    display: "flex",
    width: "100%",
    backgroundColor: "#1a1b1f",
  },
  flex: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
});