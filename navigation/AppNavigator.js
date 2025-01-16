// navigation/AppNavigator.js
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, ActivityIndicator, View} from "react-native";
import { StatusBar } from 'expo-status-bar';  // Change this import
import { usePrivy } from "@privy-io/expo";
import { useEffect } from "react";

// Importing Screens
import OnboardingPage from "../OnboardingScreen/OnboardingPage";
import HomePage from "../HomeScreen/HomePage";
import SearchPage from "../SearchScreen/SearchPage";
import SubscriptionsPage from "../SubscriptionsScreen/SubscriptionsPage";
// import WalletPage from "../WalletScreen/WalletPage";
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
import UploadPodcastScreen  from "../MyProfileScreen/UploadPodcastScreen";

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
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#727272",
      })}
    >
      <Bottomnav.Screen
        name="Home"
        component={HomePage}
        options={{ 
          headerShown: true, 
          title: "Explore", 
          headerStyle: { backgroundColor: '#121212' }, 
          headerTintColor: 'white',  
          headerTitleStyle: { color: 'white' },
        }}
        
      />
      <Bottomnav.Screen name="Search" component={SearchPage}
      options={{ 
        headerShown: true, 
        title: "Search", 
        headerStyle: { backgroundColor: '#121212' }, 
        headerTintColor: 'white',  
        headerTitleStyle: { color: 'white' },
      }}
      />
      <Bottomnav.Screen name="Subscriptions" component={SubscriptionsPage}
      options={{ 
        headerShown: true, 
        title: "My Subscriptions", 
        headerStyle: { backgroundColor: '#121212' }, 
        headerTintColor: 'white',  
        headerTitleStyle: { color: 'white' },
      }}
      />
      {/* <Bottomnav.Screen name="Wallet" component={WalletPage} /> */}
      <Bottomnav.Screen name="MyProfile" component={MyProfilePage}
      options={{ 
        headerShown: true, 
        title: "Profile", 
        headerStyle: { backgroundColor: '#121212' }, 
        headerTintColor: 'white',  
        headerTitleStyle: { color: 'white' },
      }}
      />
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
    <>
   <StatusBar style="light" />
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
          options={{ 
            headerShown: true, 
            title: null, 
            headerStyle: { backgroundColor: '#121212' }, 
            headerTintColor: 'white',  
            headerTitleStyle: { color: 'white' },
          }}
        />
        <Stack.Screen
          name="OrdersPage"
          component={OrdersPage}
          options={{ 
            headerShown: true, 
            title: null, 
            headerStyle: { backgroundColor: '#121212' }, 
            headerTintColor: 'white',  
            headerTitleStyle: { color: 'white' },
          }}
        />
        <Stack.Screen
          name="ViewProfilePage"
          component={ViewProfilePage}
          options={{ 
            headerShown: true, 
            title: null, 
            headerStyle: { backgroundColor: '#121212' }, 
            headerTintColor: 'white',  
            headerTitleStyle: { color: 'white' },
          }}
        />
        <Stack.Screen
          name="SettingsPage"
          component={SettingsPage}
          options={{ 
            headerShown: true, 
            title: null, 
            headerStyle: { backgroundColor: '#121212' }, 
            headerTintColor: 'white',  
            headerTitleStyle: { color: 'white' },
          }}
        />
        <Stack.Screen
          name="TrendingPage"
          component={TrendingPage}
          options={{ 
            headerShown: true, 
            title: "Trending", 
            headerStyle: { backgroundColor: '#121212' }, 
            headerTintColor: 'white',  
            headerTitleStyle: { color: 'white' },
          }}
        />
        <Stack.Screen
          name="MintSharesPage"
          component={MintSharesPage}
          ooptions={{ 
            headerShown: true, 
            title: "Mint Shares", 
            headerStyle: { backgroundColor: '#121212' }, 
            headerTintColor: 'white',  
            headerTitleStyle: { color: 'white' },
          }}
        />
        <Stack.Screen
          name="UploadPodcastScreen"
          component={UploadPodcastScreen}
          options={{ 
            headerShown: true, 
            title: "Upload New Podcast", 
            headerStyle: { backgroundColor: '#121212' }, 
            headerTintColor: 'white',  
            headerTitleStyle: { color: 'white' },
          }}
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
          options={{ 
            headerShown: true, 
            title: null, 
            headerStyle: { backgroundColor: '#121212' }, 
            headerTintColor: 'white',  
            headerTitleStyle: { color: 'white' },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#121212", // Semi-transparent dark background
    paddingBottom: 10,
    paddingTop: 10,
    height: 70,
    elevation: 0, // Removes the shadow for Android
    shadowOpacity: 0, // Removes the shadow for iOS
    borderTopWidth: 0, // Removes the top border
  },
  header: {
    backgroundColor: "white",
  },
});
