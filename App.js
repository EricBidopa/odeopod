// Import required polyfills first
import "fast-text-encoding";
import "react-native-get-random-values";
import "@ethersproject/shims";
import { StatusBar } from "expo-status-bar";
import AppNavigator from "./navigation/AppNavigator";
import React from "react";
import { PrivyProvider } from "@privy-io/expo";
import {Inter_400Regular, Inter_500Medium, Inter_600SemiBold} from '@expo-google-fonts/inter';
import {useFonts} from 'expo-font';

const App = () =>   {
  useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });
  
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
