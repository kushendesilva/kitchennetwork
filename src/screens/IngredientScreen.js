import React, { useLayoutEffect } from "react";
import { FlatList, StyleSheet, Text, Image } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import {
  getIngredientUrl,
  getRecipesByIngredient,
  getCategoryName,
} from "../data/MockDataAPI";
import { RecipeCard } from "../config/AppStyles";
import { View } from "../components";

export default function IngredientScreen(props) {
  const { navigation, route } = props;

  const ingredientId = route.params?.ingredient;
  const ingredientUrl = getIngredientUrl(ingredientId);
  const ingredientName = route.params?.name;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.name,
    });
  }, []);

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
    <View isSafe style={styles.mainContainer}>
      <FlatList
        ListHeaderComponent={
          <>
            <View
              style={{
                borderBottomWidth: 0.4,
                marginBottom: 10,
                borderBottomColor: "grey",
              }}
            >
              <Image
                style={styles.photoIngredient}
                source={{ uri: "" + ingredientUrl }}
              />
            </View>
            <Text style={styles.ingredientInfo}>
              Recipes with {ingredientName}
            </Text>
          </>
        }
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={getRecipesByIngredient(ingredientId)}
        renderItem={renderRecipes}
        keyExtractor={(item) => `${item.recipeId}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleIngredient: {
    fontWeight: "bold",
    fontSize: 20,
  },
  photoIngredient: {
    width: "100%",
    height: 250,
    alignSelf: "center",
  },
  ingredientInfo: {
    color: "black",
    margin: "2%",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  container: RecipeCard.container,
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category,
});
