import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, Text, View, Image, TouchableHighlight } from "react-native";
import styles from "./styles";
import MenuImage from "../../components/MenuImage/MenuImage";
import {
  getCategoryName,
  getRecipesByRecipeName,
  getRecipesByCategoryName,
} from "../../data/MockDataAPI";
import { Searchbar } from "react-native-paper";

export default function SearchScreen(props) {
  const { navigation } = props;

  const [value, setValue] = useState("");
  const [data, setData] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => (
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Search"
            onChangeText={handleSearch}
            value={value}
          />
        </View>
      ),
    });
  }, [value]);

  useEffect(() => {}, [value]);

  const handleSearch = (text) => {
    setValue(text);
    var recipeArray1 = getRecipesByRecipeName(text);
    var recipeArray2 = getRecipesByCategoryName(text);
    var aux = recipeArray1.concat(recipeArray2);
    var recipeArray = [...new Set(aux)];

    if (text == "") {
      setData([]);
    } else {
      setData(recipeArray);
    }
  };

  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

  const renderRecipes = ({ item }) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,0.9)"
      onPress={() => onPressRecipe(item)}
    >
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={data}
        renderItem={renderRecipes}
        keyExtractor={(item) => `${item.recipeId}`}
      />
    </View>
  );
}
