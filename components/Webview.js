import { View, Text,StyleSheet,TouchableOpacity,Image, ScrollView } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'
import { useWindowDimensions,Dimensions } from 'react-native';
export default function Webview({data,setdata,settitle,Title}) {
  const { width } = useWindowDimensions();
    const html=`
    <html>
        <head>
            <title>Page Title</title>
            <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400&display=swap" rel="stylesheet">
            <style>
            * {
              overflow: scroll;
              font-family: 'Quicksand', sans-serif;
              color: #fff;
              padding: 10px;
              font-size: 35px;
              margin: 15px 0px;
              box-sizing: border-box;
              line-height: 1.5;
              font-weight: 400;
              text-align: justify;
            }
    
            h1 {
              font-size: 1.7em;
              font-weight: 900;
            }
    
            h2 {
              font-size: 1.8em;
              font-weight: bold;
            }
    
            h3 {
              font-size: 1.6em;
              font-weight: bold;
            }
    
            h4 {
              font-size: 1.4em;
              font-weight: bold;
            }
    
            h5 {
              font-size: 1.2em;
              font-weight: bold;
            }
    
            h6 {
              font-size: 1em;
              font-weight: bold;
            }
    
            a {
              color: #0972d3;
              outline: 0;
              background-color: transparent;
              text-decoration: none;
            }
            iframe {
              width: 100%;
              height: auto;
            }
            img {
              width: 100%;
              height: auto;
            }
    
            #contain {
              display: flex;
              flex-direction: column;
              margin: 0;
              padding: 0;
            }
    
            tr {
              display: inline-flex;
              flex-direction: column;
            }
    
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 15px 0px;
            }
    
            table th,
            table td {
              border: 1px solid #fff;
              padding: 10px;
              text-align: left;
              font-size: 24px;
            }
    
            blockquote {
              font-size: 28px;
              font-style: italic;
              padding: 10px;
              margin: 15px 0px;
              border-left: 3px solid #fff;
            }
          </style>
        </head>
        <body>
          <div id="contain">
            <h1 style="text-align:left;">${Title}</h1>
            ${data}
            </div>
            </body>
            </html>
            ` 
  return (
    
    <View style={styles.container}>
    <View style={styles.nav}>
      <TouchableOpacity onPress={()=>{setdata(),settitle()}}>
      <Image
        source={require("../assets/back.png")}
        style={{ height: "80%", width: "5%",marginLeft:20 }}
      />
      </TouchableOpacity>
    </View>
    <WebView  style={{backgroundColor:"#1a1b1f"}}
  originWhitelist={['*']}
  source={{html: html}}      
  javaScriptEnabled={true}
  domStorageEnabled={true}/> 
  </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    height:"100%",
  },
  nav: {
    width: "100%",
    height: 48,
    display:"flex",
    justifyContent:"center"
  },
});
