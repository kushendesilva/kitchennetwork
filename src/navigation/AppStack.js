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
} from "../screens";

const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="Recipe" component={RecipeScreen} />
      <Stack.Screen name="RecipesList" component={RecipesListScreen} />
      <Stack.Screen name="Ingredient" component={IngredientScreen} />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: "",
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
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};
