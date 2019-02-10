import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import MyFridgeScreen from '../screens/MyFridgeScreen';
import ProductScreen from '../screens/ProductScreen';
import AddProductScreen from '../screens/AddProductScreen';

import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Add: {
    screen: AddProductScreen,
    navigationOptions: {
      headerTitle: "Add Product"
    }
  }
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios' ? 'ios-add' : 'md-add'
      }
    />
  ),
};

const MyFridge = createStackNavigator({
  MyFridge: MyFridgeScreen,
  Product: {
    screen: ProductScreen,
    navigationOptions: {
      header: null
    }
  },
});

MyFridge.navigationOptions = {
  tabBarLabel: 'My Fridge',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Stats',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({

  MyFridge,
  HomeStack,
  SettingsStack,
}, {
  initialRouteName: 'HomeStack'
});
