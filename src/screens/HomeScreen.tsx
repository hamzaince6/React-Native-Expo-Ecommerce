import React from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

import { RootStackParamList } from '@/navigation/AppNavigator';
import { useI18n } from '@/i18n/I18nProvider';
import ProductCard from '@/components/product/ProductCard';
import CategoryList from '@/components/category/CategoryList';
import { Banner, bannerData } from '@/components/banner';
import { HeaderGrid, headerGridData } from '@/components/header';
import { mockProducts } from '@/utils/mockData';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { t } = useI18n();

  const handleProductPress = (productId: string) => {
    navigation.navigate('Product', { productId });
  };

  const handleCategoryPress = (categoryId: string) => {
    // Handle category navigation here
    console.log(`Category pressed: ${categoryId}`);
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderGrid boxes={headerGridData} onBoxPress={handleCategoryPress} />
        <Banner banners={bannerData} />

        <SectionContainer>
          <SectionHeader>
            <SectionTitle>{t('home.categories')}</SectionTitle>
            <ViewAllButton>
              <ViewAllText>{t('home.viewAll')}</ViewAllText>
              <MaterialIcons name="chevron-right" size={20} color="#3498db" />
            </ViewAllButton>
          </SectionHeader>
          <CategoryList />
        </SectionContainer>

        <SectionContainer>
          <SectionHeader>
            <SectionTitle>{t('home.featured')}</SectionTitle>
            <ViewAllButton>
              <ViewAllText>{t('home.viewAll')}</ViewAllText>
              <MaterialIcons name="chevron-right" size={20} color="#3498db" />
            </ViewAllButton>
          </SectionHeader>
          <ProductGrid>
            {mockProducts.map((product) => (
              <ProductCardContainer key={product.id}>
                <ProductCard
                  product={product}
                  onPress={() => handleProductPress(product.id)}
                />
              </ProductCardContainer>
            ))}
          </ProductGrid>
        </SectionContainer>
      </ScrollView>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const SectionContainer = styled.View`
  margin: ${({ theme }) => theme.spacing.md}px;
`;

const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const SectionTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.lg}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

const ViewAllButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const ViewAllText = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  color: ${({ theme }) => theme.colors.primary};
  margin-right: ${({ theme }) => theme.spacing.xs}px;
`;

const ProductGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin: -${({ theme }) => theme.spacing.xs}px;
`;

const ProductCardContainer = styled.View`
  width: 50%;
  padding: ${({ theme }) => theme.spacing.xs}px;
`;

export default HomeScreen; 