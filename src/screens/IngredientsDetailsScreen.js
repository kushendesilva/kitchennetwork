import React from "react";
import { View } from "react-native";
import { Icon, View as SafeView } from "../components";
import { Text, Appbar } from "react-native-paper";
import { Colors } from "../config";

export default function IngredientsDetailsScreen(props) {
  const { navigation, route } = props;

  const item = route.params?.ingredientList;

  return (
    <SafeView style={{ alignItems: "center" }} isSafe>
      <Appbar>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Ingredients" subtitle={route.params?.title} />
      </Appbar>
      {item.map((data) => {
        return (
          <View
            style={{
              width: "75%",
              alignItems: "center",
              backgroundColor: Colors.blue,
              padding: "3%",
              marginTop: "2%",
              borderRadius: 5,
            }}
            key={data}
          >
            <View
              style={{
                width: "40%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              key={data}
            >
              <Icon name="package-variant" color={Colors.white}></Icon>
              <Text
                style={{
                  marginLeft: 15,
                  fontSize: 16,
                  color: Colors.white,
                  fontWeight: "bold",
                }}
              >
                {data}
              </Text>
            </View>
          </View>
        );
      })}
    </SafeView>
  );
}
