import React from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';
import { DefaultTheme } from 'styled-components/native';

import { RootStackParamList } from '@/navigation/AppNavigator';
import { mockProducts } from '@/utils/mockData';
import { 
  Banner, 
  bannerData,
  HeaderGrid, 
  headerGridData,
  CategoriesSection,
  FeaturedProductsSection,
  DealsSection,
  AdsBanner
} from '@/components';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleProductPress = (productId: string) => {
    navigation.navigate('Product', { productId });
  };

  const handleCategoryPress = (categoryId: string) => {
    // Handle category navigation here
    console.log(`Category pressed: ${categoryId}`);
  };

  const handleViewAllCategories = () => {
    navigation.navigate('Categories');
  };

  const handleViewAllProducts = () => {
    // Navigate to all products screen
    console.log('View all products');
  };

  const handleViewAllDeals = () => {
    // Navigate to deals screen
    console.log('View all deals');
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Ads Banner */}
        <AdsBanner/>

        {/* Header 3x2 Grid */}
        <HeaderGrid boxes={headerGridData} onBoxPress={handleCategoryPress} />

        {/* Banner Slider*/}
        <Banner banners={bannerData} />

        {/* Categories */}
        <CategoriesSection onViewAllPress={handleViewAllCategories} />

        {/* Deals Section */}
        <DealsSection 
          onProductPress={handleProductPress}
          onViewAllPress={handleViewAllDeals}
        />

        {/* Featured Products */}
        <FeaturedProductsSection 
          products={mockProducts} 
          onProductPress={handleProductPress}
          onViewAllPress={handleViewAllProducts}
        />
      </ScrollView>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.background};
`;

export default HomeScreen; 