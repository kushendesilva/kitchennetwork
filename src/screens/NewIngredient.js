import React, { useState } from "react";
import { db } from "../config";
import { setDoc, doc } from "firebase/firestore/lite";
import { View, TextInput, Button } from "../components";

export default function NewIngredient(props) {
  const { navigation } = props;

  const id = Date.now().toString();

  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [unit1, setUnit1] = useState("");

  const createDoc = async () => {
    const testCollectionRef = doc(db, "ingredients", id);
    await setDoc(testCollectionRef, {
      id,
      name,
      unit,
      unit1,
    });
    navigation.goBack();
  };

  return (
    <View isSafe>
      <TextInput
        autoCapitalize="words"
        left="chef-hat"
        label="Item Name"
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        left="thermometer-low"
        label="Default Unit"
        onChangeText={(text) => setUnit(text)}
      />
      <TextInput
        label="Second Unit"
        left="thermometer-high"
        onChangeText={(text) => setUnit1(text)}
      />
      <Button onPress={createDoc} title="Create" />
    </View>
  );
}
