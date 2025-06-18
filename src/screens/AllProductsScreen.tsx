import React, { useState } from 'react';
import { FlatList, ActivityIndicator, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useI18n } from '@/i18n/I18nProvider';
import { spacing, borderRadius, colors, shadows } from '@/styles/globalStyles';
import { usePaginatedProducts } from '@/services/FeaturedProductsServices';
import { Product as UIProduct } from '@/utils/mockData';
import ProductCard from '@/components/product/ProductCard';
import { RootStackParamList } from '@/navigation/AppNavigator';
import AdsBanner from '@/components/ads/AdsBanner';

type AllProductsScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const AllProductsScreen = () => {
  const { t } = useI18n();
  const navigation = useNavigation<AllProductsScreenNavigationProp>();
  const {
    products,
    isLoading,
    error,
    currentPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    goToNextPage,
    goToPreviousPage,
    goToPage
  } = usePaginatedProducts(1, 10);

  // Handle product press
  const handleProductPress = (productId: number) => {
    navigation.navigate('Product', { productId: productId.toString() });
  };

  // Map API products to UI products
  const mappedProducts: UIProduct[] = products.map(product => ({
    id: product.id.toString(),
    name: product.title,
    description: product.description,
    price: product.price,
    imageUrl: product.images[0],
    rating: 4.5,
    reviewCount: 10,
    category: product.category?.name || 'Other',
    inStock: true
  }));

  // Render pagination controls
  const renderPagination = () => {
    return (
      <PaginationContainer>
        <PaginationButton 
          disabled={!hasPreviousPage} 
          onPress={goToPreviousPage}
          style={{ opacity: hasPreviousPage ? 1 : 0.5 }}
        >
          <MaterialIcons name="chevron-left" size={24} color={colors.primary[500]} />
        </PaginationButton>
        
        <PaginationInfo>
          {currentPage} / {totalPages}
        </PaginationInfo>
        
        <PaginationButton 
          disabled={!hasNextPage} 
          onPress={goToNextPage}
          style={{ opacity: hasNextPage ? 1 : 0.5 }}
        >
          <MaterialIcons name="chevron-right" size={24} color={colors.primary[500]} />
        </PaginationButton>
      </PaginationContainer>
    );
  };

  // Render a product item
  const renderProductItem = ({ item }: { item: UIProduct }) => (
    <ProductItemContainer>
      <ProductCard product={item} onPress={() => handleProductPress(parseInt(item.id))} />
    </ProductItemContainer>
  );

  if (isLoading && currentPage === 1) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color={colors.primary[500]} />
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <ErrorText>{error}</ErrorText>
      </ErrorContainer>
    );
  }

  return (
    <Container>

      <AdsBanner />

      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={colors.text[600]} />
        </BackButton>
        <HeaderTitle>{t('home.allProducts')}</HeaderTitle>
        <View style={{ width: 24 }} />
      </Header>

      <FlatList
        data={mappedProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={ListContainer}
        ListFooterComponent={renderPagination}
        ListFooterComponentStyle={{ marginTop: spacing.lg }}
        refreshing={isLoading}
        onRefresh={() => goToPage(currentPage)}
      />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.background[100]};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.md}px;
  background-color: ${colors.background[50]};
  border-bottom-width: 1px;
  border-bottom-color: ${colors.background[200]};
`;

const BackButton = styled.TouchableOpacity`
  padding: ${spacing.xs}px;
`;

const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${colors.text[600]};
`;

const ListContainer = {
  padding: spacing.md,
  paddingBottom: spacing.xl * 2,
};

const ProductItemContainer = styled.View`
  width: 50%;
  padding: ${spacing.xs}px;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.background[100]};
`;

const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${spacing.xl}px;
  background-color: ${colors.background[100]};
`;

const ErrorText = styled.Text`
  color: #DC2626;
  font-size: 16px;
  text-align: center;
`;

const PaginationContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${spacing.lg}px;
  padding: ${spacing.md}px;
  background-color: ${colors.background[50]};
  border-radius: ${borderRadius.lg}px;
`;

const PaginationButton = styled.TouchableOpacity`
  padding: ${spacing.sm}px;
  border-radius: ${borderRadius.md}px;
  background-color: ${colors.background[200]};
`;

const PaginationInfo = styled.Text`
  margin: 0 ${spacing.md}px;
  font-size: 14px;
  font-weight: 600;
  color: ${colors.text[600]};
`;

export default AllProductsScreen; 