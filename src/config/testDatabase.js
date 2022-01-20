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

function Test() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);

  const createUser = async () => {
    const testCollectionRef = doc(db, "test", newName);
    await setDoc(testCollectionRef, {
      name: doc(db, "test", newName),
      id: Number(newAge),
    });
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "categories", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "categories", id);
    await deleteDoc(userDoc);
  };

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "categories");
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  return (
    <ScrollView>
      <TextInput
        placeholder="Name..."
        onChangeText={(text) => setNewName(text)}
      />
      <TextInput
        type="number"
        placeholder="Age..."
        onChangeText={(text) => setNewAge(text)}
      />

      <Button onPress={createUser}> Create User</Button>
      {users.map((user) => {
        return (
          <View>
            <Text>Name: {user.name}</Text>
            <Text>Age: {user.age}</Text>
            <Button
              onPress={() => {
                updateUser(user.id, user.age);
              }}
            >
              Increase Age
            </Button>
            <Button
              onPress={() => {
                deleteUser(user.id);
              }}
            >
              Delete User
            </Button>
          </View>
        );
      })}
    </ScrollView>
  );
}

export default Test;
