import React from "react";
import { ScrollView, Text, Image, Dimensions, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { Icon, View } from "../components";
import { Colors } from "../config";

const { width: viewportWidth } = Dimensions.get("window");

export default function RecipeScreen(props) {
  const { navigation, route } = props;

  const item = route.params?.item;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.carouselContainer}>
        <View style={styles.carousel}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: item.photo_url }} />
          </View>
        </View>
      </View>
      <View style={styles.infoRecipeContainer}>
        <Text style={styles.infoRecipeName}>{item.title}</Text>
        <Button
          uppercase={false}
          style={{ borderRadius: 10, margin: "1%" }}
          mode="text"
        >
          {item.category}
        </Button>

        <View style={styles.infoContainer}>
          <Icon name="timer" size={24} color="black"></Icon>

          <Text style={styles.infoRecipe}>{item.time} minutes </Text>
        </View>
        <Button
          style={{
            padding: "2%",
            borderRadius: 10,
            margin: "3%",
            borderColor: Colors.primary,
          }}
          mode="outlined"
          onPress={() => {
            let title = item.title;
            let ingredientList = item.ingredients;
            navigation.navigate("IngredientsDetails", {
              ingredientList,
              title,
            });
          }}
        >
          View Ingredients
        </Button>
        <View style={styles.infoContainer}>
          <Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  carouselContainer: {
    minHeight: 250,
  },

  image: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: 250,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    width: viewportWidth,
    height: 250,
  },
  paginationContainer: {
    flex: 1,
    position: "absolute",
    alignSelf: "center",
    paddingVertical: 8,
    marginTop: 200,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 0,
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
  },
  category: {
    fontSize: 14,
    fontWeight: "bold",
    margin: 10,
    color: "#2cd18a",
  },
  infoDescriptionRecipe: {
    textAlign: "left",
    fontSize: 16,
    marginTop: 30,
    margin: 15,
  },
  infoRecipeName: {
    fontSize: 28,

    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
});
