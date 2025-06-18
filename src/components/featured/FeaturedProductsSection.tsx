import React from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

import { useI18n } from '@/i18n/I18nProvider';
import ProductCard from '@/components/product/ProductCard';
import { spacing, borderRadius, shadows, colors, globalStyles } from '@/styles/globalStyles';
import { useFeaturedProducts } from '@/services/FeaturedProductsServices';
import { Product as ApiProduct } from '@/services/SpecialDealsServices';
import { Product as UIProduct } from '@/utils/mockData';

interface FeaturedProductsSectionProps {
  onViewAllPress?: () => void;
  onProductPress: (productId: number) => void;
}

function FeaturedProductsSection({
  onViewAllPress,
  onProductPress,
}: FeaturedProductsSectionProps) {
  const { t } = useI18n();
  const { products, isLoading, error } = useFeaturedProducts();

  if (isLoading) {
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

  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>{t('home.featured')}</SectionTitle>
        <ViewAllButton onPress={onViewAllPress}>
          <ViewAllText>{t('home.viewAll')}</ViewAllText>
          <MaterialIcons name="chevron-right" size={18} color={colors.secondary[500]} />
        </ViewAllButton>
      </SectionHeader>
      <ProductGrid>
        {mappedProducts.map((product) => (
          <ProductCardContainer key={product.id}>
            <ProductCard
              product={product}
              onPress={() => onProductPress(parseInt(product.id))}
            />
          </ProductCardContainer>
        ))}
      </ProductGrid>
    </SectionContainer>
  );
}

const LoadingContainer = styled.View`
  padding: ${spacing.xl}px;
  align-items: center;
  justify-content: center;
`;

const ErrorContainer = styled.View`
  padding: ${spacing.xl}px;
  align-items: center;
  justify-content: center;
`;

const ErrorText = styled.Text`
  color: #DC2626;
  font-size: 14px;
`;

const SectionContainer = styled.View`
  background-color: ${colors.background[50]};
  padding: ${spacing.lg}px;
  border-radius: ${borderRadius.lg}px;
  elevation: ${shadows.md.elevation};
  shadow-color: ${shadows.md.shadowColor};
  shadow-offset: ${shadows.md.shadowOffset.width}px ${shadows.md.shadowOffset.height}px;
  shadow-opacity: ${shadows.md.shadowOpacity};
  shadow-radius: ${shadows.md.shadowRadius}px;
  margin-bottom: ${spacing.xl}px;
`;

const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${spacing.md}px;
`;

const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: ${colors.text[600]};
  letter-spacing: -0.2px;
`;

const ViewAllButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: ${spacing.xs}px ${spacing.sm + 2}px;
  border-radius: ${borderRadius.lg}px;
  background-color: ${colors.primary[50]};
`;

const ViewAllText = styled.Text`
  font-size: 13px;
  font-weight: 500;
  color: ${colors.secondary[500]};
  margin-right: ${spacing.xs}px;
`;

const ProductGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin: -${spacing.sm}px;
`;

const ProductCardContainer = styled.View`
  width: 50%;
  padding: ${spacing.sm}px;
`;

export default FeaturedProductsSection; 