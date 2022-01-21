import React, { useState } from "react";
import { db } from "../config";
import { setDoc, doc } from "firebase/firestore/lite";
import { View, TextInput, Button } from "../components";

export default function NewCategory(props) {
  const { navigation } = props;

  const id = Date.now().toString();

  const [name, setName] = useState("");
  const [photo_url, setPhotoUrl] = useState("");

  const createDoc = async () => {
    const testCollectionRef = doc(db, "categories", id);
    await setDoc(testCollectionRef, {
      id,
      name,
      photo_url,
    });
    navigation.goBack();
  };

  return (
    <View isSafe>
      <TextInput
        autoCapitalize="words"
        left="layers"
        label="Category Name"
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        left="camera-image"
        label="Image"
        onChangeText={(text) => setPhotoUrl(text)}
      />
      <Button onPress={createDoc} title="Create" />
    </View>
  );
}
