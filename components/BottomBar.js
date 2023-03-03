import { StyleSheet, Text, View,Dimensions } from "react-native";
import React from "react";

export default function BottomBar() {
  return (
    <View>
      <View style={styles.contain} >

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    contain:{
        display:'flex',
        height: 120,
        width:'100%',
        position:"absolute",
        bottom:0,
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
        backgroundColor:"rgba(26, 27, 31, 0.95)"
        
    }
});
