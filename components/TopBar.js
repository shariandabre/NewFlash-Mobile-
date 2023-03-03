import { Image, ScrollView, StyleSheet, Text, View ,TouchableOpacity,Dimensions} from "react-native";
import Feed from "./Feed";
import QuickOptions from "./QuickOptions";
import { Ionicons } from '@expo/vector-icons'; 
import { useState } from "react";
export default function TopBar({
  add,
  setoptions,
  options,
  setadd,
  setdata,
  settitle,
  setFeedId,
}) {
  const [content, setContent] = useState([]);
  const [click_fetch, setclick_fetch] = useState(false);
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  async function  fetch_feeddata (index){
    setContent([])
    const articles = [];
    const feedUrls = options[index].feed_id.map(
      (feedUrl) =>
        `https://api.feedly.com/v3/streams/contents?streamId=${feedUrl}&count=50&ranked=newest&locale=en`
    );
    const responses = await Promise.all(
      feedUrls.map((url) => fetch(url, requestOptions))
    );
    const articleData = await Promise.all(
      responses.map((response) => response.json())
    );
    articleData.forEach((data) => {
      articles.push(...data.items);
    });
    setContent(
      articles.sort((a, b) => new Date(b.published) - new Date(a.published))
    );

  }
  return (
    <View>
      <ScrollView stickyHeaderIndices={[1]}>
        <View style={styles.contain}>
          <View style={[styles.head,{}]}>
            
              <Image
                source={require("../assets/logo.png")}
                style={{
                  height: 45,
                  width: 45,
                }}
              />

            <Text     numberOfLines={2}
    adjustsFontSizeToFit style={{ color: "#fff", fontWeight: "900", fontSize:34}}>
  Your daily dose of news, all in one place.
</Text>
          </View>
        </View>
        <View>
          <QuickOptions
          setoptions={setoptions}
          setclick_fetch={setclick_fetch}
          fetch_feeddata={fetch_feeddata}
            content={content}
            setContent={setContent}
            setFeedId={setFeedId}
            add={add}
            options={options}
            setadd={setadd}
          />
        </View>
        <Feed content={content} setdata={setdata} settitle={settitle} click_fetch={click_fetch} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  contain: {
    display: "flex",
    height: 150,
    width: "100%",
    alignItems:"center",
    justifyContent: "space-between",
    position: "relative",
    top: 0,
  },
  head: {
    paddingTop: 10,
    paddingBottom: 20,
    display:"flex",
    justifyContent:"space-between",
    alignItems:"flex-start",
    width:"93%",
    height:"100%"
  },
  input: {
    height: "20%",
    width: "80%",
    paddingLeft: 10,
  },
});
