import React, { useState } from "react";
import { db } from "../config";
import { setDoc, doc } from "firebase/firestore/lite";
import { View, TextInput, Button } from "../components";

export default function NewRecipe(props) {
  const { route, navigation } = props;

  const category = route.params?.category;
  const categoryId = route.params?.categoryId;
  const userId = route.params?.userId;
  const recipeId = Date.now().toString();

  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");

  const createUser = async () => {
    const testCollectionRef = doc(db, "recipes", recipeId);
    await setDoc(testCollectionRef, {
      category,
      categoryId,
      userId,
      recipeId,
      title,
      time,
      description,
      photo_url: "",
    });
    navigation.navigate("SelectImage", { recipeId, title, category });
  };

  return (
    <View isSafe>
      <TextInput
        left="chef-hat"
        placeholder="Recipe Name"
        autoCapitalize="words"
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        left="timer"
        placeholder="Estimated Time"
        onChangeText={(text) => setTime(text)}
        keyboardType="number-pad"
      />
      <TextInput
        multiline={true}
        numberOfLines={15}
        label="Instructions"
        autoCapitalize="sentences"
        onChangeText={(text) => setDescription(text)}
      />
      <Button onPress={createUser} title="Create" />
    </View>
  );
}
