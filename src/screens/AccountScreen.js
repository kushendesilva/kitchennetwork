import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore/lite";
import { Appbar, Button, FAB, Avatar, Text } from "react-native-paper";
import { StyleSheet } from "react-native";

import { signOut } from "firebase/auth";
import { auth, Colors, db } from "../config";
import { View } from "../components";

export const AccountScreen = (props) => {
  const { navigation } = props;

  const userEmail =
    auth.currentUser.email.charAt(0).toUpperCase() +
    auth.currentUser.email.slice(1);

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

  return (
    <View isSafe>
      <Appbar>
        <Appbar.Action
          icon="menu"
          onPress={() => {
            navigation.openDrawer();
          }}
        />
        <Appbar.Content title="Account" />
      </Appbar>
      <View style={styles.accountTop}>
        <FAB style={styles.fab} small icon="pen" />
        <Avatar.Icon
          size={80}
          icon="account"
          color={Colors.primary}
          style={{ backgroundColor: Colors.white }}
        />
        <Text
          style={{
            color: Colors.white,
            margin: "2%",
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          {userEmail}
        </Text>
        <Button
          style={{ padding: "1%", margin: "2%" }}
          color={Colors.white}
          mode="contained"
          onPress={handleLogout}
          icon="logout"
        >
          Logout
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  accountTop: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    margin: "3%",
    padding: "3%",
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: Colors.white,
  },
});
