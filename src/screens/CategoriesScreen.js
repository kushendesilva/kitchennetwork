import React from "react";
import { FlatList, Image, StyleSheet } from "react-native";
import { Card, Text, Caption } from "react-native-paper";
import { View } from "../components";
import { categories } from "../data/dataArrays";
import { getNumberOfRecipes } from "../data/MockDataAPI";
import { Appbar } from "react-native-paper";

export default function CategoriesScreen(props) {
  const { navigation } = props;

  const onPressCategory = (item) => {
    const title = item.name;
    const category = item;
    navigation.navigate("RecipesList", { category, title });
  };

  const renderCategory = ({ item }) => (
    <Card style={{ elevation: 0 }} onPress={() => onPressCategory(item)}>
      <View style={styles.categoriesItemContainer}>
        <Image
          style={styles.categoriesPhoto}
          source={{ uri: item.photo_url }}
        />
        <Text style={styles.categoriesName}>{item.name}</Text>
        <Text style={styles.categoriesInfo}>
          {getNumberOfRecipes(item.id)} recipes
        </Text>
      </View>
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
        <Appbar.Content title="Categories" />
      </Appbar>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => `${item.id}`}
        ListFooterComponent={<Caption>You Reached the End</Caption>}
        ListFooterComponentStyle={{ alignItems: "center", margin: "2%" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  categoriesItemContainer: {
    flex: 1,
    margin: "3%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "grey",
    borderWidth: 0.5,
    borderRadius: 5,
    overflow: "hidden",
  },
  categoriesPhoto: {
    width: "100%",
    height: 155,
  },
  categoriesName: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    marginTop: 8,
  },
  categoriesInfo: {
    marginBottom: 8,
  },
});
