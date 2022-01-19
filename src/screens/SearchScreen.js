import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import {
  getCategoryName,
  getRecipesByRecipeName,
  getRecipesByCategoryName,
} from "../data/MockDataAPI";
import { Searchbar, Card, Title, Paragraph, Caption } from "react-native-paper";
import { RecipeCard } from "../config/AppStyles";
import { View, MenuImage } from "../components";

export default function SearchScreen(props) {
  const { navigation } = props;

  const [value, setValue] = useState("");
  const [data, setData] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ flexDirection: "row", width: "100%" }}>
          <MenuImage
            onPress={() => {
              navigation.openDrawer();
            }}
          />
          <Searchbar
            placeholder="Search"
            onChangeText={handleSearch}
            value={value}
            style={{ width: "85%", elevation: 0 }}
          />
        </View>
      ),
    });
  }, [value]);

  useEffect(() => {}, [value]);

  const handleSearch = (text) => {
    setValue(text);
    var recipeArray1 = getRecipesByRecipeName(text);
    var recipeArray2 = getRecipesByCategoryName(text);
    var aux = recipeArray1.concat(recipeArray2);
    var recipeArray = [...new Set(aux)];

    if (text == "") {
      setData([]);
    } else {
      setData(recipeArray);
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
        <Paragraph style={styles.category}>
          {getCategoryName(item.categoryId)}
        </Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <View isSafe>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={data}
        renderItem={renderRecipes}
        keyExtractor={(item) => `${item.recipeId}`}
        ListFooterComponent={<Caption>Search Recipes & Categories</Caption>}
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
  btnIcon: {
    height: 14,
    width: 14,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDEDED",
    borderRadius: 10,
    width: 250,
    justifyContent: "space-around",
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: "grey",
  },
  searchInput: {
    backgroundColor: "#EDEDED",
    color: "black",
    width: 180,
    height: 50,
  },
});
