import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { DefaultTheme, Provider } from "react-native-paper";

import { RootNavigator } from "./src/navigation/RootNavigator";
import { AuthenticatedUserProvider } from "./src/providers";

const App = () => {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#ff3d71",
      accent: "#3dffcb",
    },
  };
  return (
    <AuthenticatedUserProvider>
      <Provider theme={theme}>
        <SafeAreaProvider>
          <RootNavigator />
        </SafeAreaProvider>
      </Provider>
    </AuthenticatedUserProvider>
  );
};

export default App;
