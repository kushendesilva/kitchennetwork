import React, { useEffect, useState } from "react";
import { Appbar, Button, FAB, Avatar, Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import { getDoc, doc } from "firebase/firestore/lite";
import AppRenderIf from "../config/AppRenderIf";
import { signOut } from "firebase/auth";
import { auth, Colors, db } from "../config";
import { View } from "../components";

export const AccountScreen = (props) => {
  const { navigation } = props;

  const userEmail =
    auth.currentUser.email.charAt(0).toUpperCase() +
    auth.currentUser.email.slice(1);
  const userID = auth.currentUser.uid;

  const handleLogout = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  const [user, setUser] = useState([]);

  useEffect(() => {
    const getNote = async () => {
      const docSnap = await getDoc(doc(db, "users", userID));
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setUser(userData);
      } else {
        const userData = ["Empty"];
        setUser(userData);
      }
    };

    getNote();
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
        <FAB
          style={styles.fab}
          small
          icon="pencil"
          onPress={() =>
            navigation.navigate("AccountEdit", {
              user: {
                name: user.name,
                email: userEmail,
                id: userID,
              },
            })
          }
        />
        <Avatar.Icon
          size={80}
          icon="account"
          color={Colors.primary}
          style={{ backgroundColor: Colors.white }}
        />
        {AppRenderIf(
          user != "Empty",
          <Text
            style={{
              color: Colors.white,
              marginTop: "2%",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {user.name}
          </Text>
        )}
        {AppRenderIf(
          user == "Empty",
          <Button
            style={{
              padding: "1%",
              margin: "2%",
              marginTop: "4%",
              borderColor: Colors.white,
            }}
            color={Colors.white}
            mode="outlined"
            onPress={() =>
              navigation.navigate("AccountEdit", {
                user: {
                  name: "",
                  email: userEmail,
                  id: userID,
                },
              })
            }
          >
            Add Name
          </Button>
        )}

        <Text
          style={{
            color: Colors.white,
            margin: "2%",
            fontSize: 12,
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
