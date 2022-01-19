import React from "react";
import { View, StyleSheet, Share, TouchableNativeFeedback } from "react-native";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import { Drawer, Divider, Caption, Avatar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { signOut } from "firebase/auth";
import { auth, Colors } from "../config";

export default function DrawerContainer(props) {
  const { navigation } = props;

  const userEmail =
    auth.currentUser.email.charAt(0).toUpperCase() +
    auth.currentUser.email.slice(1);

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
                <Avatar.Icon size={50} icon="account-outline" />
                <Caption style={styles.caption}>{userEmail}</Caption>
              </View>
            </View>
          </TouchableNativeFeedback>
          <Drawer.Section style={styles.drawerSection}>
            <Divider />
            <DrawerItem
              labelStyle={{ color: Colors.black }}
              style={{ color: Colors.primary }}
              label="Home"
              onPress={() => {
                navigation.navigate("Home");
                navigation.closeDrawer();
              }}
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="home-outline"
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
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="layers-outline"
                  color={Colors.primary}
                  size={size}
                />
              )}
            />
            <DrawerItem
              labelStyle={{ color: Colors.black }}
              label="Search"
              onPress={() => {
                navigation.navigate("Search");
                navigation.closeDrawer();
              }}
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="magnify"
                  color={Colors.primary}
                  size={size}
                />
              )}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          labelStyle={{ color: Colors.black }}
          label="Share"
          onPress={shareMessage}
          icon={({ color, size }) => (
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
          icon={({ color, size }) => (
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
    fontWeight: "bold",
    color: Colors.black,
    alignSelf: "center",
    margin: "3%",
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
