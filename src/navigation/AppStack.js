import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  AccountScreen,
  HomeScreen,
  CategoriesScreen,
  RecipeScreen,
  RecipesListScreen,
  IngredientScreen,
  SearchScreen,
  IngredientsDetailsScreen,
  AccountEditScreen,
} from "../screens";
import { Colors } from "../config";

const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: Colors.white,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Recipe" component={RecipeScreen} />
      <Stack.Screen name="RecipesList" component={RecipesListScreen} />
      <Stack.Screen name="Ingredient" component={IngredientScreen} />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="IngredientsDetails"
        component={IngredientsDetailsScreen}
      />
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AccountEdit"
        component={AccountEditScreen}
        options={{
          title: "Edit Information",
        }}
      />
    </Stack.Navigator>
  );
};
