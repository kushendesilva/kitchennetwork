import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import {
  getCategoryName,
  getRecipesByRecipeName,
  getRecipesByCategoryName,
} from "../data/MockDataAPI";
import {
  Searchbar,
  Card,
  Title,
  Paragraph,
  Caption,
  Appbar,
} from "react-native-paper";
import { RecipeCard } from "../config/AppStyles";
import { View } from "../components";
import { Colors } from "../config";

export default function SearchScreen(props) {
  const { navigation } = props;

  const [value, setValue] = useState("");
  const [data, setData] = useState([]);

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
      <Appbar>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />

        <Searchbar
          autoFocus={true}
          selectionColor={Colors.white}
          placeholder="Search"
          placeholderTextColor={Colors.white}
          onChangeText={handleSearch}
          value={value}
          inputStyle={{ backgroundColor: Colors.primary, color: Colors.white }}
          style={{
            width: "85%",
            elevation: 0,
            backgroundColor: Colors.primary,
          }}
          iconColor={Colors.white}
        />
      </Appbar>
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
