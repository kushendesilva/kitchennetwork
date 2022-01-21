import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, FlatList, View } from "react-native";
import {
  DataTable,
  TextInput,
  Button,
  Snackbar,
  Appbar,
  Searchbar,
  Caption,
} from "react-native-paper";
import { Colors } from "../config";
import { db } from "../config";
import {
  setDoc,
  doc,
  getDocs,
  collection,
  deleteDoc,
} from "firebase/firestore/lite";
import AppRenderIf from "../config/AppRenderIf";

export default function SelectIngredients(props) {
  const { navigation, route } = props;

  const recipeId = route.params?.recipeId;
  const itemId = Date.now().toString();

  const [quantity, setQuantity] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [newName, setNewName] = useState("");

  const [visibleSnack, setVisibleSnack] = useState(false);

  const onToggleSnackBar = () => setVisibleSnack(!visibleSnack);
  const onDismissSnackBar = () => setVisibleSnack(false);

  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    const getList = async () => {
      const data = await getDocs(collection(db, "ingredients"));
      setFilteredDataSource(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      setMasterDataSource(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getList();
  }, []);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar>
        <Appbar.Action
          icon="arrow-left"
          onPress={async () => {
            const userDoc = doc(db, "recipes", recipeId);
            await deleteDoc(userDoc);
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Select Ingredients" />
        <Appbar.Action
          icon="content-save"
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
      </Appbar>
      <Snackbar
        duration={500}
        visible={visibleSnack}
        onDismiss={onDismissSnackBar}
      >
        Added Successfully
      </Snackbar>
      <DataTable>
        <FlatList
          ListHeaderComponent={
            <>
              <DataTable.Row style={{ marginVertical: 5 }}>
                <DataTable.Cell
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Caption style={styles.caption}>New Item</Caption>
                </DataTable.Cell>
                <DataTable.Cell
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <TextInput
                    placeholder="Item Name"
                    mode="outlined"
                    autoCapitalize="words"
                    onChangeText={(text) => {
                      setNewName(text);
                    }}
                    style={{
                      backgroundColor: Colors.white,
                      height: 25,
                    }}
                  ></TextInput>
                </DataTable.Cell>
                <DataTable.Cell
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <TextInput
                    placeholder="Quantity"
                    mode="outlined"
                    onChangeText={(text) => {
                      setNewQuantity(text);
                    }}
                    style={{
                      backgroundColor: Colors.white,
                      height: 25,
                    }}
                  ></TextInput>
                </DataTable.Cell>
                <DataTable.Cell style={{ justifyContent: "center" }}>
                  <Button
                    color={Colors.blue}
                    uppercase={false}
                    mode="contained"
                    icon="plus-box"
                    onPress={async () => {
                      const docRef = doc(
                        db,
                        "recipes/" + recipeId + "/ingredients",
                        itemId
                      );
                      await setDoc(docRef, {
                        id: itemId,
                        name: newName,
                        qty: newQuantity,
                      });
                      onToggleSnackBar();
                      setQuantity("");
                    }}
                  >
                    Add
                  </Button>
                </DataTable.Cell>
              </DataTable.Row>
              <Searchbar
                style={{
                  marginTop: "2%",
                  marginBottom: "2%",
                  borderRadius: 10,
                  marginLeft: "2%",
                  marginRight: "2%",
                }}
                onChangeText={(text) => searchFilterFunction(text)}
                onClear={() => searchFilterFunction("")}
                value={search}
                placeholder="Search"
              />
            </>
          }
          data={filteredDataSource}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => (
            <>
              <DataTable.Row style={{ marginVertical: 5 }}>
                <DataTable.Cell
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Caption style={styles.caption}>{item.name}</Caption>
                </DataTable.Cell>
                <DataTable.Cell
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <TextInput
                    placeholder={"Quantity"}
                    mode="outlined"
                    onChangeText={(text) => {
                      setQuantity(text);
                    }}
                    keyboardType="number-pad"
                    style={{
                      backgroundColor: Colors.white,
                      height: 25,
                    }}
                  ></TextInput>
                </DataTable.Cell>
                <DataTable.Cell
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Button
                    color={Colors.blue}
                    uppercase={false}
                    mode="contained"
                    icon="plus-box"
                    onPress={async () => {
                      const docRef = doc(
                        db,
                        "recipes/" + recipeId + "/ingredients",
                        item.id
                      );
                      await setDoc(docRef, {
                        id: item.id,
                        name: item.name,
                        qty: quantity + " " + item.unit,
                      });
                      onToggleSnackBar();
                      setQuantity("");
                    }}
                  >
                    {item.unit}
                  </Button>
                </DataTable.Cell>
                <DataTable.Cell style={{ justifyContent: "center" }}>
                  {AppRenderIf(
                    item.unit1 != null,
                    <Button
                      color={Colors.green}
                      uppercase={false}
                      mode="contained"
                      icon="plus-box"
                      onPress={async () => {
                        const docRef = doc(
                          db,
                          "recipes/" + recipeId + "/ingredients",
                          item.id
                        );
                        await setDoc(docRef, {
                          id: item.id,
                          name: item.name,
                          qty: quantity + " " + item.unit1,
                        });
                        onToggleSnackBar();
                        setQuantity("");
                      }}
                    >
                      {item.unit1}
                    </Button>
                  )}
                </DataTable.Cell>
              </DataTable.Row>
            </>
          )}
        />
      </DataTable>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;

const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;

const styles = StyleSheet.create({
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.blue,
  },
  category: { textAlign: "center", fontSize: 12, color: Colors.blue },
  caption: { fontWeight: "bold", color: Colors.mediumGray, fontSize: 14 },
});
