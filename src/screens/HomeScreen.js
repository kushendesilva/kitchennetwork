import React, { useState, useEffect } from "react";

import { Searchbar } from "react-native-paper";
import { collection, getDocs } from "firebase/firestore/lite";

import { signOut } from "firebase/auth";
import { auth, db, Colors } from "../config";
import { Button, View } from "../components";

export const HomeScreen = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleLogout = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  const [beaches, setBeaches] = useState([]);
  const beachesCollectionRef = collection(db, "beaches");

  useEffect(() => {
    const getBeaches = async () => {
      const data = await getDocs(beachesCollectionRef);
      setBeaches(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getBeaches();
  }, []);

  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <View
      isSafe
      style={{ flex: 1, backgroundColor: Colors.white, paddingHorizontal: 12 }}
    >
      <Searchbar
        selectionColor={Colors.primary}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{
          marginTop: "3%",
          marginBottom: "3%",
          padding: "1%",
        }}
      />
      <Button onPress={handleLogout} title="Logout" />
    </View>
  );
};
