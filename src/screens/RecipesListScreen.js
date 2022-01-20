import React, { useLayoutEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { RecipeCard } from "../config/AppStyles";
import { View } from "../components";
import { ListWithWhere } from "../config/database";

export default function RecipesListScreen(props) {
  const { navigation, route } = props;

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
        <Paragraph style={styles.category}>{item.category}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <View isSafe>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={ListWithWhere("recipes", "categoryId", route.params?.category)}
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
