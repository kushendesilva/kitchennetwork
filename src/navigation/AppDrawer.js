import * as React from "react";
import { AppStack } from "./AppStack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContainer from "../screens/DrawerContainer";

const Drawer = createDrawerNavigator();

export const AppDrawer = () => {
  return (
    <Drawer.Navigator
      drawerPosition="left"
      initialRouteName="Main"
      drawerStyle={{
        width: 250,
      }}
      screenOptions={{ headerShown: false }}
      drawerContent={({ navigation }) => (
        <DrawerContainer navigation={navigation} />
      )}
    >
      <Drawer.Screen name="Main" component={AppStack} />
    </Drawer.Navigator>
  );
};
