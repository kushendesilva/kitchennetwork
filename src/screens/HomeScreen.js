import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import {
  Searchbar,
  Card,
  Title,
  Paragraph,
  Caption,
  Appbar,
  IconButton,
} from "react-native-paper";
import { Colors, db, auth } from "../config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore/lite";
import AppRenderIf from "../config/AppRenderIf";
import { RecipeCard } from "../config/AppStyles";
import { View } from "../components";

export default function HomeScreen(props) {
  const { navigation } = props;

  const checkAdmin = auth.currentUser.email;

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
      {AppRenderIf(
        checkAdmin == "admin@kn.com",
        <>
          <IconButton
            icon="delete"
            color={Colors.primary}
            size={20}
            style={{
              backgroundColor: Colors.white,
              position: "absolute",
              right: 0,
              bottom: 0,
            }}
            onPress={async () => {
              const userDoc = doc(db, "recipes", item.recipeId);
              await deleteDoc(userDoc);
            }}
          />
        </>
      )}
      {AppRenderIf(
        item.photo_url != "",
        <Card.Cover style={styles.photo} source={{ uri: item.photo_url }} />
      )}
      {AppRenderIf(
        item.photo_url == "",
        <Card.Cover
          style={styles.photo}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/kitchennetwork-cw.appspot.com/o/default.jpg?alt=media&token=ddf4dc61-3261-4221-ab42-01f939a54059",
          }}
        />
      )}
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
        <Appbar.Content title="Recipes" />
        <Appbar.Action
          color={Colors.primary}
          style={{ backgroundColor: Colors.white }}
          icon="plus"
          onPress={() => {
            navigation.navigate("SelectCategory");
          }}
        />
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
