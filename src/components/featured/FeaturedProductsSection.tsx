import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

import { useI18n } from '@/i18n/I18nProvider';
import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/utils/mockData';
import { spacing, borderRadius, shadows, colors, globalStyles } from '@/styles/globalStyles';

interface FeaturedProductsSectionProps {
  products: Product[];
  onViewAllPress?: () => void;
  onProductPress: (productId: string) => void;
}

function FeaturedProductsSection({
  products,
  onViewAllPress,
  onProductPress,
}: FeaturedProductsSectionProps) {
  const { t } = useI18n();

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
        {products.map((product) => (
          <ProductCardContainer key={product.id}>
            <ProductCard
              product={product}
              onPress={() => onProductPress(product.id)}
            />
          </ProductCardContainer>
        ))}
      </ProductGrid>
    </SectionContainer>
  );
}

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