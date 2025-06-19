import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProductScreen from '@/screens/ProductScreen';
import AllProductsScreen from '@/screens/AllProductsScreen';
import UserDetailScreen from '@/screens/UserDetailScreen';
import AllFriendsScreen from '@/screens/AllFriendsScreen';
import BottomTabNavigator from './BottomTabNavigator';

export type RootStackParamList = {
  Main: undefined;
  Product: { productId: string };
  Categories: undefined;
  AllProducts: undefined;
  UserDetail: { userId: number };
  AllFriends: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="Main" 
        component={BottomTabNavigator} 
      />
      <Stack.Screen 
        name="Product" 
        component={ProductScreen} 
        options={({ route }) => ({ 
          headerShown: true,
          title: `Product ${route.params.productId}`,
          headerStyle: {
            backgroundColor: '#3498db',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })} 
      />
      <Stack.Screen
        name="AllProducts"
        component={AllProductsScreen}
      />
      <Stack.Screen
        name="UserDetail"
        component={UserDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AllFriends"
        component={AllFriendsScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator; 