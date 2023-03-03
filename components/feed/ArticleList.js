import { Image, ScrollView, StyleSheet, Text, View,TouchableOpacity } from "react-native";
import React, { useState } from "react";


const ArticleList = ({ list,setdata,settitle }) => {

  var prop = 'visual';
  var visual={
    'url':"https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
  };
  if (!list.hasOwnProperty(prop)) {
    list['visual']=visual;
  }

  var prop2='content'
  if(!list.hasOwnProperty(prop2)){
    list['content']=list['summary']
    
  }
  return (<>
  
    <TouchableOpacity onPress={()=>{settitle(list.title),setdata(list.content.content)}}>
    <View style={styles.flex}>
      <View style={styles.contain}>

      <Image
          source={{ uri: list.visual.url }}
          style={{
            height: "100%",
            flex:1,
            borderRadius: 15,
            borderColor: "rgba(255, 255, 255, 0.05)",
            borderWidth: 0.7,
          }}/>
        
        <View style={{ height: "100%",display:"flex",flex:2,justifyContent:"space-between",alignItems:"flex-end" }}>
        <View style={{width:"95%",flex:2}}>
          <Text numberOfLines={2} style={{fontWeight:"400",fontSize:20,color:"white"}}>{list.title}</Text>
          </View>
          <View  style={{width:"95%",flex:1}}>
          <Text numberOfLines={1} style={{fontWeight:"600",fontSize:14,color:"gray",}}>~ {list.author}</Text>
          </View>
        </View>
      </View>
    </View>
    </TouchableOpacity>
    </>
  )
}

export default ArticleList

const styles = StyleSheet.create({
    flex: {
      width: "100%",
      display: "flex",
      alignItems: "center",
    },
    contain: {
      height: 120,
      width: "93%",
      padding:10,
      borderRadius: 15,
      marginVertical:6,
      backgroundColor: "rgba(255, 255, 255, 0.10)",
      display: "flex",
      justifyContent:"space-between",
      flexDirection: "row",
    },
  });
  