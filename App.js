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
      config={{
        "appearance": {
          "accentColor": "#6A6FF5",
          "theme": "#FFFFFF",
          "showWalletLoginFirst": false,
          "logo": "https://pub-dc971f65d0aa41d18c1839f8ab426dcb.r2.dev/privy.png"
        },
        "loginMethods": [
          "email",
          "wallet",
          "google",
          "apple",
          "github",
          "discord"
        ],
        "fundingMethodConfig": {
          "moonpay": {
            "useSandbox": true
          }
        },
        "embeddedWallets": {
          "createOnLogin": "users-without-wallets",
          "requireUserPasswordOnCreate": false
        },
        "mfa": {
          "noPromptOnMfaRequired": false
        }
      }}
    >
      <AppNavigator />
    </PrivyProvider>
  );
};

export default App;
