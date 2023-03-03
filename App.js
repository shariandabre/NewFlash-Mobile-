import { useEffect, useState } from "react";
import { StyleSheet, Text, View, StatusBar, ScrollView,ActivityIndicator } from "react-native";
import Categories from "./components/Categories";
import TopBar from "./components/TopBar";
import Webview from "./components/Webview";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [add, setadd] = useState(false);
  const [data, setdata] = useState();
  const [title, settitle] = useState();
  const [feedId, setFeedId] = useState();


  const [options, setoptions] = useState([]);
  const Push_Option = async (categoriesName, FeedName, feedId) => {
    if (categoriesName.trim() !== "") {
      const existingCategory = options.find(
        (category) => category.name === categoriesName
      );
      setadd(false);
      if (existingCategory) {
        const updatedCategories = options.map((category) => {
          if (category.name === existingCategory.name) {
            return {
              ...category,
              feed_name: [...category.feed_name, FeedName],
              feed_id: [...category.feed_id, feedId],
            };
          } else {
            return category;
          }
        });
        setoptions(updatedCategories);
        await AsyncStorage.setItem('options', JSON.stringify(updatedCategories));
      } else {
        const newCategory = {
          name: categoriesName,
          feed_name: [FeedName],
          feed_id: [feedId],
        };
        setoptions([...options, newCategory]);
        await AsyncStorage.setItem('options', JSON.stringify([...options, newCategory]));
      }
    }
  };


  useEffect(() => {
    // Load options array from AsyncStorage
    AsyncStorage.getItem('options').then((storedOptions) => {
      if (storedOptions) {
        setoptions(JSON.parse(storedOptions));
      }
    });
  }, []);


  return (
    <View style={styles.contain}>
        {data !== undefined && (
        <Webview
          data={data}
          automaticallyAdjustContentInsets={true}
          setdata={setdata}
          settitle={settitle}
          Title={title}
        />
      )}
      <TopBar
      setoptions={setoptions}
        setFeedId={setFeedId}
        add={add}
        options={options}
        setadd={setadd}
        setdata={setdata}
        settitle={settitle}
        data={data}
        title={title}
      />
      {add && (
        <Categories
          Push_Option={Push_Option}
          options={options}
          setoptions={setoptions}
          add={add}
          setadd={setadd}
          feedId={feedId}
          setfeedId={setFeedId}
        />
      )}
      <StatusBar backgroundColor={"#1a1b1f"} />
    </View>
  );
}

const styles = StyleSheet.create({
  contain: {
    display: "flex",
    height: "100%",
    width: "100%",
    backgroundColor: "#1a1b1f",
  },
});
