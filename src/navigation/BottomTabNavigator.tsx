// src/navigation/BottomTabNavigator.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../constants/colors';
import HomeScreen from '../screens/homescreen/HomeScreen';
import LibraryScreen from '../screens/libraryscreen/LibraryScreen';

export type RootBottomTabParamList = {
  Home: undefined;
  Library: undefined;
};

const Tab = createBottomTabNavigator<RootBottomTabParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.tabActive,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          //   tabBarIcon: renderGenerateIcon,
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          //   tabBarIcon: renderLibraryIcon,
          tabBarLabel: 'Library',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.tabBarBackground,
    borderTopColor: colors.tabBarBorder,
    borderTopWidth: 1,
    // height: TabBarHeight,
    // paddingBottom: Spacing.sm,
    // paddingTop: Spacing.xs,
  },
  tabLabel: {
    // fontSize: FontSize.xs,
    // fontWeight: FontWeight.semibold,
    letterSpacing: 0.5,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: colors.textOnPrimary,
    fontSize: 9,
    // fontWeight: FontWeight.black,
  },
});
