import React, { useState } from 'react';
import { FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

import { RootStackParamList } from '@/navigation/AppNavigator';
import { useI18n } from '@/i18n/I18nProvider';
import { mockProducts, Product } from '@/utils/mockData';
import { AdsBanner } from '@/components';

type CartScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Cart'>;

// Mock cart items (in a real app, this would come from a cart context or store)
const initialCartItems = mockProducts.slice(0, 2).map(product => ({
  product,
  quantity: 1,
}));

function CartScreen() {
  const navigation = useNavigation<CartScreenNavigationProp>();
  const { t } = useI18n();
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleRemoveItem = (productId: string) => {
    setCartItems(items => items.filter(item => item.product.id !== productId));
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(items => 
      items.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product.discountPrice || item.product.price;
      return total + price * item.quantity;
    }, 0);
  };

  const handleCheckout = () => {
    Alert.alert('Success', 'Proceeding to checkout!');
  };

  if (cartItems.length === 0) {
    return (
      <EmptyContainer>
        <MaterialIcons name="shopping-cart" size={64} color="#ccc" />
        <EmptyText>{t('cart.empty')}</EmptyText>
        <ContinueShoppingButton onPress={() => navigation.navigate('Home')}>
          <ContinueShoppingText>{t('cart.continueShopping')}</ContinueShoppingText>
        </ContinueShoppingButton>
      </EmptyContainer>
    );
  }

  return (
    <Container>
      <AdsBanner />
      <FlatList
        data={cartItems}
        keyExtractor={item => item.product.id}
        renderItem={({ item }) => (
          <CartItemContainer>
            <ItemImageContainer>
              <ItemImage source={{ uri: item.product.imageUrl }} resizeMode="cover" />
            </ItemImageContainer>
            <ItemDetails>
              <ItemName>{item.product.name}</ItemName>
              <ItemPrice>
                ${(item.product.discountPrice || item.product.price).toFixed(2)}
              </ItemPrice>
              <QuantityContainer>
                <QuantityButton 
                  onPress={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                >
                  <MaterialIcons name="remove" size={20} color="#333" />
                </QuantityButton>
                <QuantityText>{item.quantity}</QuantityText>
                <QuantityButton 
                  onPress={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                >
                  <MaterialIcons name="add" size={20} color="#333" />
                </QuantityButton>
              </QuantityContainer>
            </ItemDetails>
            <RemoveButton onPress={() => handleRemoveItem(item.product.id)}>
              <MaterialIcons name="delete-outline" size={24} color="#e74c3c" />
            </RemoveButton>
          </CartItemContainer>
        )}
        ItemSeparatorComponent={() => <ItemSeparator />}
      />

      <SummaryContainer>
        <TotalContainer>
          <TotalLabel>{t('cart.total')}</TotalLabel>
          <TotalAmount>${calculateTotal().toFixed(2)}</TotalAmount>
        </TotalContainer>
        <CheckoutButton onPress={handleCheckout}>
          <CheckoutText>{t('cart.checkout')}</CheckoutText>
        </CheckoutButton>
      </SummaryContainer>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl}px;
`;

const EmptyText = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.lg}px;
  color: ${({ theme }) => theme.colors.textLight};
  margin-top: ${({ theme }) => theme.spacing.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const ContinueShoppingButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.lg}px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
`;

const ContinueShoppingText = styled.Text`
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  font-weight: bold;
`;

const CartItemContainer = styled.View`
  flex-direction: row;
  padding: ${({ theme }) => theme.spacing.md}px;
  background-color: white;
`;

const ItemImageContainer = styled.View`
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  overflow: hidden;
  margin-right: ${({ theme }) => theme.spacing.md}px;
`;

const ItemImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const ItemDetails = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const ItemName = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

const ItemPrice = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
`;

const QuantityContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const QuantityButton = styled.TouchableOpacity`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  justify-content: center;
  align-items: center;
`;

const QuantityText = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 ${({ theme }) => theme.spacing.sm}px;
  min-width: 20px;
  text-align: center;
`;

const RemoveButton = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.spacing.sm}px;
  align-self: center;
`;

const ItemSeparator = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
`;

const SummaryContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
  background-color: white;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border};
`;

const TotalContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const TotalLabel = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.lg}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

const TotalAmount = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.lg}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

const CheckoutButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  align-items: center;
`;

const CheckoutText = styled.Text`
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  font-weight: bold;
`;

export default CartScreen; 