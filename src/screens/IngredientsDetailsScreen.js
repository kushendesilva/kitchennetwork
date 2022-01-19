import React, { useLayoutEffect } from "react";
import { FlatList, StyleSheet, Dimensions } from "react-native";
import { View } from "../components";
import { Card, Text } from "react-native-paper";
import { getIngredientName, getAllIngredients } from "../data/MockDataAPI";

const { width, height } = Dimensions.get("window");

const SCREEN_WIDTH = width < height ? width : height;

const numColumns = 3;

const RECIPE_ITEM_HEIGHT = 100;
const RECIPE_ITEM_OFFSET = 10;
const RECIPE_ITEM_MARGIN = RECIPE_ITEM_OFFSET * 2;

export default function IngredientsDetailsScreen(props) {
  const { navigation, route } = props;

  const item = route.params?.ingredients;
  const ingredientsArray = getAllIngredients(item);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title,
      headerTitleStyle: {
        fontSize: 16,
      },
    });
  }, []);

  const onPressIngredient = (item) => {
    let name = getIngredientName(item.ingredientId);
    let ingredient = item.ingredientId;
    navigation.navigate("Ingredient", { ingredient, name });
  };

  const renderIngredient = ({ item }) => (
    <Card style={styles.container} onPress={() => onPressIngredient(item[0])}>
      <Card.Cover style={styles.photo} source={{ uri: item[0].photo_url }} />
      <Card.Content>
        <Text style={styles.title}>{item[0].name}</Text>
        <Text style={{ color: "grey", fontSize: 10, textAlign: "center" }}>
          {item[1]}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <View isSafe>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={3}
        data={ingredientsArray}
        renderItem={renderIngredient}
        keyExtractor={(item) => `${item.recipeId}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    margin: RECIPE_ITEM_OFFSET,
    margin: "2%",
    width:
      (SCREEN_WIDTH - RECIPE_ITEM_MARGIN) / numColumns - RECIPE_ITEM_OFFSET,
    height: RECIPE_ITEM_HEIGHT + 50,
  },
  title: {
    margin: "2%",
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  photo: {
    width:
      (SCREEN_WIDTH - RECIPE_ITEM_MARGIN - 10) / numColumns -
      RECIPE_ITEM_OFFSET,
    height: RECIPE_ITEM_HEIGHT,
    borderRadius: 60,
  },
});
