import React from 'react';
import { View, StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import { theme as themeType } from '@/styles/theme';

import HomeScreen from '@/screens/HomeScreen';
import SearchScreen from '@/screens/SearchScreen';
import CartScreen from '@/screens/CartScreen';
import CategoriesScreen from '@/screens/CategoriesScreen';
import ProfileScreen from '@/screens/ProfileScreen';

type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Cart: undefined;
  Categories: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const CartButton = ({ onPress }: { onPress?: (e: GestureResponderEvent) => void }) => {
  const theme = useTheme() as typeof themeType;
  
  return (
    <TouchableOpacity
      style={styles.cartButton}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.cartButtonInner, { backgroundColor: theme.colors.primary }]}>
        <Ionicons name="cart" size={24} color="#fff" />
      </View>
    </TouchableOpacity>
  );
};

const BottomTabNavigator = () => {
  const theme = useTheme() as typeof themeType;

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: '#999',
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarButton: (props) => <CartButton {...props} onPress={props.onPress} />,
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    position: 'absolute',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    paddingHorizontal: 10,
  },
  cartButton: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartButtonInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default BottomTabNavigator;