import React, { useState, useEffect } from "react";
import { FlatList, Image, StyleSheet } from "react-native";
import { Searchbar, Card, Text, Caption } from "react-native-paper";
import { Colors, db, auth } from "../config";
import { collection, getDocs } from "firebase/firestore/lite";
import { View } from "../components";

export default function SelectCategory(props) {
  const { navigation } = props;

  const userId = auth.currentUser.uid;

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
    const category = item.name;
    const categoryId = item.id;
    navigation.navigate("NewRecipe", { category, categoryId, userId });
  };

  const renderCategory = ({ item }) => (
    <Card style={{ elevation: 0 }} onPress={() => onPressCategory(item)}>
      <View style={styles.categoriesItemContainer}>
        <Image
          style={styles.categoriesPhoto}
          source={{ uri: item.photo_url }}
        />
        <Text style={styles.categoriesName}>{item.name}</Text>
      </View>
    </Card>
  );

  return (
    <View isSafe>
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
    </View>
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
