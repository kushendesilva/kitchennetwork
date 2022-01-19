import React from "react";
import { RecipeCard } from "../config/AppStyles";
import { FlatList, StyleSheet } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { recipes } from "../data/dataArrays";
import { getCategoryName } from "../data/MockDataAPI";
import { View } from "../components";
import { Appbar } from "react-native-paper";

export default function HomeScreen(props) {
  const { navigation } = props;

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
        <Appbar.Action
          icon="menu"
          onPress={() => {
            navigation.openDrawer();
          }}
        />
        <Appbar.Content title="Home" />
        <Appbar.Action
          icon="magnify"
          onPress={() => {
            navigation.navigate("Search");
          }}
        />
      </Appbar>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={recipes}
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
