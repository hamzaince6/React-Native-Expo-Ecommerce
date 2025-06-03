import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProductScreen from '@/screens/ProductScreen';
import BottomTabNavigator from './BottomTabNavigator';

export type RootStackParamList = {
  Main: undefined;
  Product: { productId: string };
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
    </Stack.Navigator>
  );
}

export default AppNavigator; 