import React from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

import { RootStackParamList } from '@/navigation/AppNavigator';
import { useI18n } from '@/i18n/I18nProvider';
import ProductCard from '@/components/product/ProductCard';
import CategoryList from '@/components/category/CategoryList';
import { mockProducts } from '@/utils/mockData';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { t } = useI18n();

  const handleProductPress = (productId: string) => {
    navigation.navigate('Product', { productId });
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BannerContainer>
          <BannerImage
            source={{ uri: 'https://placehold.co/600x400' }}
            resizeMode="cover"
          />
          <BannerOverlay>
            <BannerTitle>Hamza Ecommerce</BannerTitle>
            <BannerSubtitle>Premium Mobile Experience</BannerSubtitle>
          </BannerOverlay>
        </BannerContainer>

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

const BannerContainer = styled.View`
  height: 200px;
  margin: 0 ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const BannerImage = styled.Image`
  width: 100%;
  height: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  margin-top: ${({ theme }) => theme.spacing.sm}px;
`;

const BannerOverlay = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${({ theme }) => theme.spacing.md}px;
  background-color: rgba(0, 0, 0, 0.4);
`;

const BannerTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.xl}px;
  font-weight: bold;
  color: white;
`;

const BannerSubtitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  color: white;
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