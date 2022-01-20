import React, { useState, useEffect } from "react";
import { db } from ".";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  setDoc,
  doc,
} from "firebase/firestore/lite";
import { View } from "../components";
import { ScrollView } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";

function NewRecipe(props) {
  const [name, setName] = useState("");

  const createUser = async () => {
    const testCollectionRef = doc(db, "test", name);
    await setDoc(testCollectionRef, {
      name: doc(db, "test", name),
      id: String(name),
    });
  };
  return <View isSafe></View>;
}

export default NewRecipe;
