import React, { useMemo } from 'react';
import { ScrollView, Alert } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

import { RootStackParamList } from '@/navigation/AppNavigator';
import { useI18n } from '@/i18n/I18nProvider';
import { mockProducts } from '@/utils/mockData';

type ProductScreenRouteProp = RouteProp<RootStackParamList, 'Product'>;
type ProductScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Product'>;

function ProductScreen() {
  const route = useRoute<ProductScreenRouteProp>();
  const navigation = useNavigation<ProductScreenNavigationProp>();
  const { t } = useI18n();
  
  const { productId } = route.params;
  
  const product = useMemo(() => {
    return mockProducts.find(p => p.id === productId);
  }, [productId]);

  if (!product) {
    return (
      <ErrorContainer>
        <ErrorText>{t('common.error')}</ErrorText>
      </ErrorContainer>
    );
  }

  const handleAddToCart = () => {
    Alert.alert('Success', `${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    navigation.navigate('Cart');
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageContainer>
          <ProductImage source={{ uri: product.imageUrl }} resizeMode="cover" />
          {!product.inStock && (
            <OutOfStockBadge>
              <OutOfStockText>{t('product.outOfStock')}</OutOfStockText>
            </OutOfStockBadge>
          )}
        </ImageContainer>

        <ContentContainer>
          <ProductName>{product.name}</ProductName>
          
          <RatingContainer>
            <MaterialIcons name="star" size={16} color="#f39c12" />
            <RatingText>{product.rating.toFixed(1)}</RatingText>
            <ReviewCount>({product.reviewCount} reviews)</ReviewCount>
          </RatingContainer>
          
          <PriceContainer>
            {product.discountPrice ? (
              <>
                <DiscountPrice>${product.discountPrice.toFixed(2)}</DiscountPrice>
                <OriginalPrice>${product.price.toFixed(2)}</OriginalPrice>
              </>
            ) : (
              <Price>${product.price.toFixed(2)}</Price>
            )}
          </PriceContainer>

          <Divider />
          
          <SectionTitle>{t('product.description')}</SectionTitle>
          <Description>{product.description}</Description>

          <Divider />
        </ContentContainer>
      </ScrollView>

      <ButtonContainer>
        <AddToCartButton 
          onPress={handleAddToCart}
          disabled={!product.inStock}
        >
          <ButtonText>{t('product.addToCart')}</ButtonText>
        </AddToCartButton>
        <BuyNowButton 
          onPress={handleBuyNow}
          disabled={!product.inStock}
        >
          <BuyNowText>{t('product.buyNow')}</BuyNowText>
        </BuyNowButton>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ErrorText = styled.Text`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.typography.fontSize.lg}px;
`;

const ImageContainer = styled.View`
  height: 300px;
  position: relative;
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const OutOfStockBadge = styled.View`
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: rgba(0, 0, 0, 0.7);
  padding: ${({ theme }) => `${theme.spacing.xs}px ${theme.spacing.sm}px`};
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
`;

const OutOfStockText = styled.Text`
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  font-weight: bold;
`;

const ContentContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const ProductName = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.xl}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const RatingText = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  color: ${({ theme }) => theme.colors.text};
  margin-left: ${({ theme }) => theme.spacing.xs}px;
`;

const ReviewCount = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  color: ${({ theme }) => theme.colors.textLight};
  margin-left: ${({ theme }) => theme.spacing.xs}px;
`;

const PriceContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const Price = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.xl}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

const DiscountPrice = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.xl}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;

const OriginalPrice = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  color: ${({ theme }) => theme.colors.textLight};
  text-decoration-line: line-through;
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  margin-vertical: ${({ theme }) => theme.spacing.md}px;
`;

const SectionTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.lg}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const Description = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  color: ${({ theme }) => theme.colors.text};
  line-height: ${({ theme }) => theme.typography.lineHeight.md}px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  padding: ${({ theme }) => theme.spacing.md}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border};
`;

const AddToCartButton = styled.TouchableOpacity<{ disabled: boolean }>`
  flex: 1;
  background-color: white;
  border: 1px solid ${({ theme, disabled }) => 
    disabled ? theme.colors.textLight : theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  padding: ${({ theme }) => theme.spacing.sm}px;
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing.sm}px;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  font-weight: bold;
`;

const BuyNowButton = styled.TouchableOpacity<{ disabled: boolean }>`
  flex: 1;
  background-color: ${({ theme, disabled }) => 
    disabled ? theme.colors.textLight : theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  padding: ${({ theme }) => theme.spacing.sm}px;
  align-items: center;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

const BuyNowText = styled.Text`
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  font-weight: bold;
`;

export default ProductScreen; 