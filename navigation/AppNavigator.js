// navigation/AppNavigator.js
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import { usePrivy } from "@privy-io/expo";
import { useEffect } from "react";

// Importing Screens
import OnboardingPage from "../OnboardingScreen/OnboardingPage";
import HomePage from "../HomeScreen/HomePage";
import SearchPage from "../SearchScreen/SearchPage";
import SubscriptionsPage from "../SubscriptionsScreen/SubscriptionsPage";
import WalletPage from "../WalletScreen/WalletPage";
import MyProfilePage from "../MyProfileScreen/MyProfilePage";
import ChooseUsernamePage from "../OnboardingScreen/ChooseUsernamePage";
import PodcastItemPage from "../PodcastItemScreen/PodcastItemPage";
import OrdersPage from "../OrdersScreen/OrdersPage";
import ViewProfilePage from "../ViewProfileScreen/ViewProfilePage";
import SettingsPage from "../SettingsScreen/SettingsPage";
import TrendingPage from "../TrendingScreen/TrendingPage";
import MintSharesPage from "../MintSharesScreen.js/MintSharesPage";
import IWantToSellPage from "../IWantToSellScreen/IWantToSellPage";
import IWantToBuyPage from "../IWantToBuyScreen/IWantToBuyPage";
import OtpPage from "../OnboardingScreen/OtpPage";

const Bottomnav = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomNavigationGroup() {
  return (
    <Bottomnav.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Subscriptions") {
            iconName = focused ? "albums" : "albums-outline";
          } else if (route.name === "Wallet") {
            iconName = focused ? "wallet" : "wallet-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "grey",
      })}
    >
      <Bottomnav.Screen
        name="Home"
        component={HomePage}
        options={{ headerShown: true, title: "Explore" }}
      />
      {/* <Bottomnav.Screen name="Search" component={SearchPage} /> */}
      {/* <Bottomnav.Screen name="Subscriptions" component={SubscriptionsPage} /> */}
      {/* <Bottomnav.Screen name="Wallet" component={WalletPage} /> */}
      <Bottomnav.Screen name="Profile" component={MyProfilePage} />
    </Bottomnav.Navigator>
  );
}

export default function AppNavigator() {
  const { isReady, user } = usePrivy()
  let initialRoute;  
  
  if (isReady){
    if(!user){
      initialRoute = "OnboardingPage"
    }
    else{
      initialRoute = "HomePage"
    }
    console.log(initialRoute)
  }
  else{
    return 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
      >
        <Stack.Screen
          name="OnboardingPage"
          component={OnboardingPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChooseUsernamePage"
          component={ChooseUsernamePage}
          options={{
            title: null,
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "white" },
          }}
        />
        <Stack.Screen
          name="HomePage"
          component={BottomNavigationGroup}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="PodcastItemScreen"
          component={PodcastItemPage}
          options={{ headerShown: true, title: null }}
        />
        <Stack.Screen
          name="OrdersPage"
          component={OrdersPage}
          options={{ headerShown: true, title: null }}
        />
        <Stack.Screen
          name="ViewProfilePage"
          component={ViewProfilePage}
          options={{ headerShown: true, title: null }}
        />
        <Stack.Screen
          name="SettingsPage"
          component={SettingsPage}
          options={{ headerShown: true, title: null }}
        />
        <Stack.Screen
          name="TrendingPage"
          component={TrendingPage}
          options={{ headerShown: true, title: "Trending" }}
        />
        <Stack.Screen
          name="MintSharesPage"
          component={MintSharesPage}
          options={{ headerShown: true, title: "Mint Your Shares" }}
        />
        <Stack.Screen
          name="IWantToSellPage"
          component={IWantToSellPage}
          options={{ headerShown: true, title: null }}
        />
        <Stack.Screen
          name="IWantToBuyPage"
          component={IWantToBuyPage}
          options={{ headerShown: true, title: null }}
        />
        <Stack.Screen
          name="OtpPage"
          component={OtpPage}
          options={{ headerShown: true, title: null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "white",
    paddingBottom: 10,
    paddingTop: 10,
    height: 70,
  },
  header: {
    backgroundColor: "white",
  },
});
