// Import required polyfills first
import "fast-text-encoding";
import "react-native-get-random-values";
import "@ethersproject/shims";
import { StatusBar } from "expo-status-bar";
import AppNavigator from "./navigation/AppNavigator";
import React from "react";
import { PrivyProvider } from "@privy-io/expo";

const App = () => {
  return (
    <PrivyProvider
      appId={"cm0kil88x0471x4zrp3fus7ai"}
      clientId={"client-WY5axK2yKpNuT3nvYrHgYBGhSBUrRfHGtsntrPULY3BK8"}
    >
      <AppNavigator />
    </PrivyProvider>
  );
};

export default App;
