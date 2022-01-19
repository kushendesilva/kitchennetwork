import React, { useLayoutEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { getRecipes, getCategoryName } from "../data/MockDataAPI";
import { RecipeCard } from "../config/AppStyles";
import { View } from "../components";

export default function RecipesListScreen(props) {
  const { navigation, route } = props;

  const item = route?.params?.category;
  const recipesArray = getRecipes(item.id);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title,
      headerRight: () => <View />,
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
    <View isSafe>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={recipesArray}
        renderItem={renderRecipes}
        keyExtractor={(item) => `${item.recipeId}`}
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
