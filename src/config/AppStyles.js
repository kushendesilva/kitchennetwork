import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;

const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;

export const RecipeCard = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: RECIPE_ITEM_MARGIN,
    marginVertical: "2%",
    width:
      (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) /
      recipeNumColums,
    height: RECIPE_ITEM_HEIGHT + 75,
  },
  photo: {
    width:
      (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) /
      recipeNumColums,
    height: RECIPE_ITEM_HEIGHT,
    overflow: "hidden",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  category: { textAlign: "center", fontSize: 12 },
});
