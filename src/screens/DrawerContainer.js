import React, { useEffect } from "react";
import { View, StyleSheet, Share, TouchableNativeFeedback } from "react-native";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import { Drawer, Divider, Caption, Avatar, Title } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore/lite";
import AppRenderIf from "../config/AppRenderIf";
import { auth, Colors, db } from "../config";

export default function DrawerContainer(props) {
  const { navigation } = props;

  const userEmail =
    auth.currentUser.email.charAt(0).toUpperCase() +
    auth.currentUser.email.slice(1);

  const userID = auth.currentUser.uid;
  const [user, setUser] = React.useState([]);

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

  const messageDetails =
    "Hey, \nGet Kitchen Network for free at https://github.com/kushenthimira/kitchennetwork";

  const shareMessage = () => {
    Share.share({
      message: messageDetails.toString(),
    });
  };
  const handleLogout = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <TouchableNativeFeedback
            onPress={() => {
              navigation.navigate("Account");
              navigation.closeDrawer();
            }}
          >
            <View style={styles.userInfoSection}>
              <View style={{ flexDirection: "row", marginTop: 15 }}>
                <Avatar.Icon size={50} icon="account" />
                {AppRenderIf(
                  user != "Empty",
                  <View style={{ marginLeft: 15, flexDirection: "column" }}>
                    <Title style={styles.title}>{user.name}</Title>
                    <Caption style={styles.caption}>{userEmail}</Caption>
                  </View>
                )}
                {AppRenderIf(
                  user == "Empty",
                  <Title
                    style={{
                      fontSize: 16,
                      alignSelf: "center",
                      marginLeft: "5%",
                    }}
                  >
                    {userEmail}
                  </Title>
                )}
              </View>
            </View>
          </TouchableNativeFeedback>
          <Drawer.Section style={styles.drawerSection}>
            <Divider />
            <DrawerItem
              labelStyle={{ color: Colors.black }}
              style={{ color: Colors.primary }}
              label="Recipes"
              onPress={() => {
                navigation.navigate("Home");
                navigation.closeDrawer();
              }}
              icon={({ size }) => (
                <MaterialCommunityIcons
                  name="chef-hat"
                  color={Colors.primary}
                  size={size}
                />
              )}
            />
            <DrawerItem
              labelStyle={{ color: Colors.black }}
              label="Categories"
              onPress={() => {
                navigation.navigate("Categories");
                navigation.closeDrawer();
              }}
              icon={({ size }) => (
                <MaterialCommunityIcons
                  name="layers"
                  color={Colors.primary}
                  size={size}
                />
              )}
            />
            {AppRenderIf(
              userEmail.toLowerCase() == "admin@kn.com",
              <DrawerItem
                labelStyle={{ color: Colors.black }}
                label="Ingredients"
                onPress={() => {
                  navigation.navigate("Ingredients");
                  navigation.closeDrawer();
                }}
                icon={({ size }) => (
                  <MaterialCommunityIcons
                    name="food-apple"
                    color={Colors.primary}
                    size={size}
                  />
                )}
              />
            )}
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          labelStyle={{ color: Colors.black }}
          label="Share"
          onPress={shareMessage}
          icon={({ size }) => (
            <MaterialCommunityIcons
              name="share-variant"
              color={Colors.primary}
              size={size}
            />
          )}
        />
        <DrawerItem
          labelStyle={{ color: Colors.black }}
          label="Logout"
          onPress={handleLogout}
          icon={({ size }) => (
            <MaterialCommunityIcons
              name="logout"
              color={Colors.primary}
              size={size}
            />
          )}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    paddingBottom: 15,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
    color: Colors.black,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: Colors.black,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};
