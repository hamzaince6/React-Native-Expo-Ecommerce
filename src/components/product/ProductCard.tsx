import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

import { Product } from '@/utils/mockData';
import { spacing, borderRadius, shadows, colors } from '@/styles/globalStyles';
import { useI18n } from '@/i18n/I18nProvider';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

function ProductCard({ product, onPress }: ProductCardProps) {
  const { name, price, discountPrice, imageUrl, rating, inStock } = product;
  const { t } = useI18n();

  return (
    <CardContainer onPress={onPress}>
      <ImageContainer>
        <ProductImage source={{ uri: imageUrl }} resizeMode="cover" />
        {!inStock && (
          <OutOfStockBadge>
            <OutOfStockText>{t('product.outOfStock')}</OutOfStockText>
          </OutOfStockBadge>
        )}
      </ImageContainer>
      <ContentContainer>
        <ProductName numberOfLines={2}>{name}</ProductName>
        <RatingContainer>
          <MaterialIcons name="star" size={14} color={colors.secondary[500]} />
          <RatingText>{rating.toFixed(1)}</RatingText>
        </RatingContainer>
        <PriceContainer>
          {discountPrice ? (
            <>
              <DiscountPrice>${discountPrice.toFixed(2)}</DiscountPrice>
              <OriginalPrice>${price.toFixed(2)}</OriginalPrice>
            </>
          ) : (
            <Price>${price.toFixed(2)}</Price>
          )}
        </PriceContainer>
      </ContentContainer>
    </CardContainer>
  );
}

const CardContainer = styled.TouchableOpacity`
  background-color: ${colors.background[50]};
  border-radius: ${borderRadius.lg}px;
  overflow: hidden;
  border-width: 1px;
  border-color: ${colors.background[300]};
  elevation: ${shadows.sm.elevation};
  shadow-color: ${shadows.sm.shadowColor};
  shadow-offset: ${shadows.sm.shadowOffset.width}px ${shadows.sm.shadowOffset.height}px;
  shadow-opacity: ${shadows.sm.shadowOpacity};
  shadow-radius: ${shadows.sm.shadowRadius}px;
`;

const ImageContainer = styled.View`
  position: relative;
  height: 140px;
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const OutOfStockBadge = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  padding: ${spacing.xs}px ${spacing.sm}px;
  border-bottom-left-radius: ${borderRadius.sm}px;
`;

const OutOfStockText = styled.Text`
  color: white;
  font-size: 10px;
  font-weight: bold;
`;

const ContentContainer = styled.View`
  padding: ${spacing.sm}px;
`;

const ProductName = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.text[600]};
  margin-bottom: ${spacing.xs}px;
  height: 40px;
`;

const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${spacing.xs}px;
`;

const RatingText = styled.Text`
  font-size: 12px;
  color: ${colors.textLight[500]};
  margin-left: ${spacing.xs}px;
`;

const PriceContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Price = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: ${colors.text[600]};
`;

const DiscountPrice = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: ${colors.primary[500]};
  margin-right: ${spacing.xs}px;
`;

const OriginalPrice = styled.Text`
  font-size: 12px;
  color: ${colors.textLight[500]};
  text-decoration-line: line-through;
`;

export default ProductCard; 