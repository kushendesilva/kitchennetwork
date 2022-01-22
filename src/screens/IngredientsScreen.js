import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, FlatList, RefreshControl } from "react-native";
import {
  Title,
  Paragraph,
  Appbar,
  IconButton,
  Snackbar,
} from "react-native-paper";
import { View } from "../components";
import { Colors, auth, db } from "../config";
import { deleteDoc, doc, getDocs, collection } from "firebase/firestore/lite";
import AppRenderIf from "../config/AppRenderIf";

export default function IngredientsScreen(props) {
  const { navigation } = props;

  const checkAdmin = auth.currentUser.email;

  const [refreshing, setRefreshing] = useState(true);
  const [visibleSnack, setVisibleSnack] = useState(false);

  const onToggleSnackBar = () => setVisibleSnack(!visibleSnack);
  const onDismissSnackBar = () => setVisibleSnack(false);

  const [list, setList] = useState([]);
  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const data = await getDocs(collection(db, "ingredients"));
    setList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setRefreshing(false);
  };

  return (
    <View isSafe>
      <Appbar>
        <Appbar.Action
          icon="menu"
          onPress={() => {
            navigation.openDrawer();
          }}
        />
        <Appbar.Content title="Ingredients" />
        <Appbar.Action
          color={Colors.primary}
          style={{ backgroundColor: Colors.white }}
          icon="plus"
          onPress={() => {
            navigation.navigate("NewIngredient");
          }}
        />
      </Appbar>
      <Snackbar
        duration={500}
        visible={visibleSnack}
        onDismiss={onDismissSnackBar}
        style={{
          width: 150,
          alignSelf: "center",
        }}
      >
        Deleted Successfully
      </Snackbar>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getList} />
        }
        numColumns={2}
        data={list}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => (
          <>
            <View style={styles.flatListContainer}>
              {AppRenderIf(
                checkAdmin == "admin@kn.com",
                <>
                  <IconButton
                    icon="delete"
                    color={Colors.white}
                    size={16}
                    style={{
                      backgroundColor: Colors.blue,
                      position: "absolute",
                      right: 0,
                      bottom: 0,
                    }}
                    onPress={async () => {
                      const userDoc = doc(db, "recipes", item.recipeId);
                      await deleteDoc(userDoc);
                      onToggleSnackBar();
                      getList();
                    }}
                  />
                </>
              )}
              <Title style={styles.title}>{item.name}</Title>
              <Paragraph style={styles.category}>
                {item.unit} {"  "} {item.unit1}
              </Paragraph>
            </View>
          </>
        )}
      />
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
});
