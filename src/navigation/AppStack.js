import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  AccountScreen,
  HomeScreen,
  CategoriesScreen,
  RecipeScreen,
  RecipesListScreen,
  AccountEditScreen,
  NewRecipe,
  SelectCategory,
  IngredientsScreen,
  NewIngredient,
  SelectIngredients,
  NewCategory,
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
      <Stack.Screen
        name="Ingredients"
        component={IngredientsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Recipe" component={RecipeScreen} />
      <Stack.Screen name="NewRecipe" component={NewRecipe} />
      <Stack.Screen name="NewCategory" component={NewCategory} />
      <Stack.Screen name="NewIngredient" component={NewIngredient} />
      <Stack.Screen
        name="SelectIngredients"
        component={SelectIngredients}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SelectCategory"
        component={SelectCategory}
        options={{
          title: "Select Category",
        }}
      />
      <Stack.Screen name="RecipesList" component={RecipesListScreen} />

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
