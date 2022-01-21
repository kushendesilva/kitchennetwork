import React, { useEffect, useState } from "react";
import {
  Appbar,
  Button,
  Avatar,
  Text,
  Card,
  Title,
  Paragraph,
  IconButton,
} from "react-native-paper";
import { FlatList, StyleSheet, View } from "react-native";
import { getDoc, doc, deleteDoc } from "firebase/firestore/lite";
import AppRenderIf from "../config/AppRenderIf";
import { signOut } from "firebase/auth";
import { auth, Colors, db } from "../config";
import { View as SafeView } from "../components";
import { ListWithWhere } from "../config/database";
import { RecipeCard } from "../config/AppStyles";

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
    <SafeView isSafe>
      <Appbar>
        <Appbar.Action
          icon="menu"
          onPress={() => {
            navigation.openDrawer();
          }}
        />
        <Appbar.Content title="Account" />
        <Appbar.Action
          color={Colors.primary}
          style={{ backgroundColor: Colors.white }}
          icon="pen"
          onPress={() =>
            navigation.navigate("AccountEdit", {
              user: {
                name: user.name,
                email: userEmail.toLowerCase(),
                id: userID,
              },
            })
          }
        />
      </Appbar>
      <FlatList
        numColumns={2}
        ListHeaderComponent={
          <>
            <View
              style={{
                backgroundColor: Colors.primary,
                margin: 10,
                paddingVertical: 40,
                borderRadius: 10,
                elevation: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Avatar.Icon
                    size={60}
                    icon="account"
                    color={Colors.primary}
                    style={{ backgroundColor: Colors.white }}
                  />
                  <View style={{ marginLeft: 10 }}>
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
                  </View>
                </View>
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
            <Title
              style={{
                fontWeight: "bold",
                color: Colors.primary,
                fontSize: 20,
                textAlign: "center",
                marginBottom: 5,
              }}
            >
              My Recipes
            </Title>
          </>
        }
        data={ListWithWhere("recipes", "userId", userID)}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => (
          <Card
            style={styles.container}
            onPress={() => {
              navigation.navigate("Recipe", { item });
            }}
          >
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
                const userDoc = doc(db, "recipes", item.recipeId);
                await deleteDoc(userDoc);
              }}
            />
            {AppRenderIf(
              item.photo_url != "",
              <Card.Cover
                style={styles.photo}
                source={{ uri: item.photo_url }}
              />
            )}
            {AppRenderIf(
              item.photo_url == "",
              <Card.Cover
                style={styles.photo}
                source={{
                  uri: "https://firebasestorage.googleapis.com/v0/b/kitchennetwork-cw.appspot.com/o/default.jpg?alt=media&token=ddf4dc61-3261-4221-ab42-01f939a54059",
                }}
              />
            )}
            <Card.Content>
              <Title style={styles.title}>{item.title}</Title>
              <Paragraph style={styles.category}>{item.category}</Paragraph>
            </Card.Content>
          </Card>
        )}
      />
    </SafeView>
  );
};

const styles = StyleSheet.create({
  container: RecipeCard.container,
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category,
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
