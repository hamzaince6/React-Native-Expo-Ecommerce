import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

import { Product } from '@/utils/mockData';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

function ProductCard({ product, onPress }: ProductCardProps) {
  const { name, price, discountPrice, imageUrl, rating, inStock } = product;

  return (
    <CardContainer onPress={onPress}>
      <ImageContainer>
        <ProductImage source={{ uri: imageUrl }} resizeMode="cover" />
        {!inStock && (
          <OutOfStockBadge>
            <OutOfStockText>Out of Stock</OutOfStockText>
          </OutOfStockBadge>
        )}
      </ImageContainer>
      <ContentContainer>
        <ProductName numberOfLines={2}>{name}</ProductName>
        <RatingContainer>
          <MaterialIcons name="star" size={16} color="#f39c12" />
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
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  overflow: hidden;
  ${({ theme }) => theme.shadows.sm};
`;

const ImageContainer = styled.View`
  position: relative;
  height: 150px;
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
  padding: ${({ theme }) => `${theme.spacing.xs}px ${theme.spacing.sm}px`};
  border-bottom-left-radius: ${({ theme }) => theme.borderRadius.sm}px;
`;

const OutOfStockText = styled.Text`
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSize.xs}px;
  font-weight: bold;
`;

const ContentContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.sm}px;
`;

const ProductName = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const RatingText = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  color: ${({ theme }) => theme.colors.textLight};
  margin-left: ${({ theme }) => theme.spacing.xs}px;
`;

const PriceContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Price = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

const DiscountPrice = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-right: ${({ theme }) => theme.spacing.xs}px;
`;

const OriginalPrice = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  color: ${({ theme }) => theme.colors.textLight};
  text-decoration-line: line-through;
`;

export default ProductCard; 