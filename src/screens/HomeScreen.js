import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import {
  Searchbar,
  Card,
  Title,
  Paragraph,
  Caption,
  Appbar,
} from "react-native-paper";
import { db } from "../config";
import { collection, getDocs } from "firebase/firestore/lite";
import { RecipeCard } from "../config/AppStyles";
import { View } from "../components";

export default function HomeScreen(props) {
  const { navigation } = props;

  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    const getList = async () => {
      const data = await getDocs(collection(db, "recipes"));
      setFilteredDataSource(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      setMasterDataSource(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getList();
  }, []);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

  const renderRecipes = ({ item }) => (
    <Card style={styles.container} onPress={() => onPressRecipe(item)}>
      <Card.Cover style={styles.photo} source={{ uri: item.photo_url }} />
      <Card.Content>
        <Title style={styles.title}>{item.title}</Title>
        <Paragraph style={styles.category}>{item.category}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <View isSafe>
      <Appbar>
        <Appbar.Action
          icon="menu"
          onPress={() => {
            navigation.openDrawer();
          }}
        />
        <Appbar.Content title="Home" />
      </Appbar>

      <FlatList
        ListHeaderComponent={
          <Searchbar
            style={{
              marginTop: "2%",
              marginBottom: "2%",
              borderRadius: 10,
              marginLeft: "2%",
              marginRight: "2%",
            }}
            onChangeText={(text) => searchFilterFunction(text)}
            onClear={() => searchFilterFunction("")}
            value={search}
            placeholder="Search"
          />
        }
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={filteredDataSource}
        renderItem={renderRecipes}
        keyExtractor={(item) => `${item.recipeId}`}
        ListFooterComponent={<Caption>You Reached the end..</Caption>}
        ListFooterComponentStyle={{ alignItems: "center", margin: "2%" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: RecipeCard.container,
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category,
});
