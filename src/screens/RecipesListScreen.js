import React, { useLayoutEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { RecipeCard } from "../config/AppStyles";
import { View } from "../components";
import { ListWithWhere } from "../config/database";
import AppRenderIf from "../config/AppRenderIf";

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
