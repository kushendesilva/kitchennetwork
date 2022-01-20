import React, { useState } from "react";
import { Image, Dimensions, StyleSheet, FlatList } from "react-native";
import { Button, Text, Title, Paragraph } from "react-native-paper";
import { Icon, View } from "../components";
import { Colors } from "../config";
import AppRenderIf from "../config/AppRenderIf";
import { ListByName } from "../config/database";

export default function RecipeScreen(props) {
  const { route } = props;

  const [viewIngredients, setViewIngredients] = useState(false);
  const [viewInstructions, setViewInstructions] = useState(false);

  const item = route.params?.item;

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: item.photo_url }} />
            </View>
            <View style={styles.infoRecipeContainer}>
              <Text style={styles.infoRecipeName}>{item.title} </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  color: Colors.primary,
                  textAlign: "center",
                }}
              >
                ({item.category})
              </Text>
              <View style={styles.infoContainer}>
                <Icon name="timer" size={24} color={Colors.mediumGray}></Icon>

                <Text style={styles.infoRecipe}>{item.time} minutes </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                {AppRenderIf(
                  true == viewIngredients,
                  <Button
                    style={{
                      padding: "2%",
                      borderRadius: 10,
                      margin: "2%",
                    }}
                    color={Colors.blue}
                    mode="contained"
                    onPress={() => {
                      setViewIngredients(!viewIngredients);
                    }}
                  >
                    Hide Ingredients
                  </Button>
                )}
                {AppRenderIf(
                  false == viewIngredients,
                  <Button
                    style={{
                      padding: "2%",
                      borderRadius: 10,
                      margin: "2%",
                    }}
                    color={Colors.blue}
                    mode="contained"
                    onPress={() => {
                      setViewIngredients(!viewIngredients);
                    }}
                  >
                    View Ingredients
                  </Button>
                )}
                {AppRenderIf(
                  true == viewInstructions,
                  <Button
                    style={{
                      padding: "2%",
                      borderRadius: 10,
                      margin: "2%",
                    }}
                    color={Colors.green}
                    mode="contained"
                    onPress={() => {
                      setViewInstructions(!viewInstructions);
                    }}
                  >
                    Hide Instructions
                  </Button>
                )}
                {AppRenderIf(
                  false == viewInstructions,
                  <Button
                    style={{
                      padding: "2%",
                      borderRadius: 10,
                      margin: "2%",
                    }}
                    color={Colors.green}
                    mode="contained"
                    onPress={() => {
                      setViewInstructions(!viewInstructions);
                    }}
                  >
                    View Instructions
                  </Button>
                )}
              </View>
            </View>
          </>
        }
        numColumns={2}
        data={ListByName("recipes/" + item.recipeId + "/ingredients")}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => (
          <>
            {AppRenderIf(
              true == viewIngredients,
              <View style={styles.flatListContainer}>
                <Title style={styles.title}>{item.name}</Title>
                <Paragraph style={styles.category}>{item.qty}</Paragraph>
              </View>
            )}
          </>
        )}
        ListFooterComponent={
          <>
            {AppRenderIf(
              true == viewInstructions,
              <View style={styles.infoContainer}>
                <Text style={styles.infoDescriptionRecipe}>
                  {item.description}
                </Text>
              </View>
            )}
          </>
        }
      />
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const { width: viewportWidth } = Dimensions.get("window");

const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;

const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  image: {
    width: viewportWidth - 20,
    height: 230,
    borderRadius: 10,
    elevation: 10,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: viewportWidth - 20,
    height: 230,
    margin: 10,
    elevation: 10,
    borderRadius: 10,
  },
  infoRecipeContainer: {
    marginTop: "2%",
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 10,
    marginTop: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  infoPhoto: {
    height: 20,
    width: 20,
    marginRight: 0,
  },
  infoRecipe: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
    color: Colors.mediumGray,
  },
  infoDescriptionRecipe: {
    textAlign: "left",
    fontSize: 16,
    marginTop: 30,
    margin: 15,
  },
  infoRecipeName: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
    textAlign: "center",
  },
  flatListContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: RECIPE_ITEM_MARGIN,
    marginVertical: "2%",
    width:
      (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) /
      recipeNumColums,
    height: RECIPE_ITEM_HEIGHT - 90,
    elevation: 5,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: Colors.blue,
  },
  photo: {
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.blue,
  },
  category: { textAlign: "center", fontSize: 12, color: Colors.blue },
});
