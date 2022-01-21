import React, { useState, useEffect } from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";
import {
  Searchbar,
  Card,
  Text,
  Caption,
  Appbar,
  IconButton,
} from "react-native-paper";
import { Colors, db, auth } from "../config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore/lite";
import { View as SafeView } from "../components";
import AppRenderIf from "../config/AppRenderIf";

export default function CategoriesScreen(props) {
  const { navigation } = props;

  const checkAdmin = auth.currentUser.email;

  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    const getList = async () => {
      const data = await getDocs(collection(db, "categories"));
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

  const onPressCategory = (item) => {
    const title = item.name;
    const category = item.id;
    navigation.navigate("RecipesList", { category, title });
  };

  const renderCategory = ({ item }) => (
    <Card style={{ elevation: 0 }} onPress={() => onPressCategory(item)}>
      <View style={styles.categoriesItemContainer}>
        {AppRenderIf(
          checkAdmin == "admin@kn.com",
          <>
            <IconButton
              icon="delete"
              color={Colors.primary}
              size={20}
              style={{
                backgroundColor: Colors.white,
                position: "absolute",
                right: 0,
                bottom: 0,
              }}
              onPress={async () => {
                const userDoc = doc(db, "categories", item.id);
                await deleteDoc(userDoc);
              }}
            />
          </>
        )}
        {AppRenderIf(
          item.photo_url != "",
          <Image
            style={styles.categoriesPhoto}
            source={{ uri: item.photo_url }}
          />
        )}
        {AppRenderIf(
          item.photo_url == "",
          <Image
            style={styles.categoriesPhoto}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/kitchennetwork-cw.appspot.com/o/default.jpg?alt=media&token=ddf4dc61-3261-4221-ab42-01f939a54059",
            }}
          />
        )}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.categoriesName}>{item.name}</Text>
        </View>
      </View>
    </Card>
  );

  return (
    <SafeView isSafe>
      <Appbar>
        <Appbar.Action
          icon="menu"
          onPress={() => {
            navigation.openDrawer();
          }}
        />
        <Appbar.Content title="Categories" />
        {AppRenderIf(
          checkAdmin == "admin@kn.com",
          <Appbar.Action
            color={Colors.primary}
            style={{ backgroundColor: Colors.white }}
            icon="plus"
            onPress={() => {
              navigation.navigate("NewCategory");
            }}
          />
        )}
      </Appbar>
      <FlatList
        ListHeaderComponent={
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
        }
        data={filteredDataSource}
        renderItem={renderCategory}
        keyExtractor={(item) => `${item.id}`}
        ListFooterComponent={<Caption>You Reached the End</Caption>}
        ListFooterComponentStyle={{ alignItems: "center", margin: "2%" }}
      />
    </SafeView>
  );
}

const styles = StyleSheet.create({
  categoriesItemContainer: {
    flex: 1,
    marginHorizontal: "5%",
    marginVertical: "2%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "grey",
    borderWidth: 0.5,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: Colors.primary,
    elevation: 5,
  },
  categoriesPhoto: {
    width: "100%",
    height: 155,
  },
  categoriesName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.white,
    margin: "3%",
  },
  categoriesInfo: {
    marginBottom: 8,
  },
});
