import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabNavigator from './BottomTabNavigator';
import ProductScreen from '@/screens/ProductScreen';
import UserDetailScreen from '@/screens/UserDetailScreen';
import AllProductsScreen from '@/screens/AllProductsScreen';
import AllFriendsScreen from '@/screens/AllFriendsScreen';
import OrderDetailScreen from '@/screens/OrderDetailScreen';
import OrdersScreen from '@/screens/OrdersScreen';
import { Order } from '@/types/order';

export type RootStackParamList = {
  Main: undefined;
  Product: { productId: string };
  UserDetail: { userId: string };
  AllProducts: undefined;
  AllFriends: undefined;
  OrderDetail: { orderId: string };
  OrdersScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen name="Product" component={ProductScreen} />
      <Stack.Screen name="UserDetail" component={UserDetailScreen} />
      <Stack.Screen name="AllProducts" component={AllProductsScreen} />
      <Stack.Screen name="AllFriends" component={AllFriendsScreen} />
      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
      <Stack.Screen name="OrdersScreen" component={OrdersScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator; 