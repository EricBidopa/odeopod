// navigation/AppNavigator.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

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
        options={{ headerShown: true, title: 'Explore' }}
      />
      <Bottomnav.Screen name="Search" component={SearchPage} />
      <Bottomnav.Screen name="Subscriptions" component={SubscriptionsPage} />
      <Bottomnav.Screen name="Wallet" component={WalletPage} />
      <Bottomnav.Screen name="Profile" component={MyProfilePage} />
    </Bottomnav.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnboardingPage">
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
