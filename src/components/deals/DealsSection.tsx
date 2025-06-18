import React from 'react';
import { FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

import { useI18n } from '@/i18n/I18nProvider';
import { spacing, borderRadius, shadows, colors, globalStyles } from '@/styles/globalStyles';
import { useSpecialDeals, Product as ApiProduct } from '@/services/SpecialDealsServices';

interface DealsSectionProps {
  onViewAllPress?: () => void;
  onProductPress?: (productId: number) => void;
}

const DealsSection: React.FC<DealsSectionProps> = ({ 
  onViewAllPress,
  onProductPress 
}) => {
  const { t } = useI18n();
  const { products, isLoading, error } = useSpecialDeals();
  
  const handleProductPress = (productId: number) => {
    if (onProductPress) {
      onProductPress(productId);
    }
  };

  const renderDealItem = ({ item }: { item: ApiProduct }) => (
    <DealItem onPress={() => handleProductPress(item.id)}>
      <DealImageContainer>
        <DealImage 
          source={{ uri: item.images[0] }} 
          resizeMode="cover" 
        />
        <DiscountBadge>
          <DiscountText>-{Math.floor(Math.random() * 40 + 10)}%</DiscountText>
        </DiscountBadge>
      </DealImageContainer>
      <DealInfo>
        <DealName numberOfLines={2}>{item.title}</DealName>
        <PriceContainer>
          <CurrentPrice>${item.price.toFixed(2)}</CurrentPrice>
          <OriginalPrice>${(item.price * 1.3).toFixed(2)}</OriginalPrice>
        </PriceContainer>
      </DealInfo>
    </DealItem>
  );

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

  return (
    <Container>
      <SectionHeader>
        <SectionTitle>{t('home.deals')}</SectionTitle>
      </SectionHeader>

      <FlatList
        data={products}
        renderItem={renderDealItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: spacing.md }}
        ItemSeparatorComponent={() => <Separator />}
      />
    </Container>
  );
};

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

const Container = styled.View`
  background-color: ${colors.background[50]};
  padding: ${spacing.lg}px;
  border-radius: ${borderRadius.lg}px;
  margin-bottom: ${spacing.lg}px;
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

const DealItem = styled(TouchableOpacity)`
  width: 160px;
  background-color: ${colors.background[50]};
  border-radius: ${borderRadius.lg}px;
  overflow: hidden;
  border-width: 1px;
  border-color: ${colors.background[300]};
`;

const DealImageContainer = styled.View`
  height: 160px;
  width: 100%;
  position: relative;
`;

const DealImage = styled.Image`
  height: 100%;
  width: 100%;
`;

const DiscountBadge = styled.View`
  position: absolute;
  top: ${spacing.xs}px;
  left: ${spacing.xs}px;
  background-color: ${colors.primary[500]};
  padding-horizontal: ${spacing.xs}px;
  padding-vertical: 2px;
  border-radius: ${borderRadius.sm}px;
`;

const DiscountText = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: bold;
`;

const DealInfo = styled.View`
  padding: ${spacing.sm}px;
`;

const DealName = styled.Text`
  font-size: 14px;
  color: ${colors.text[600]};
  margin-bottom: ${spacing.xs}px;
  height: 40px;
`;

const PriceContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CurrentPrice = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.primary[500]};
  margin-right: ${spacing.xs}px;
`;

const OriginalPrice = styled.Text`
  font-size: 12px;
  color: ${colors.textLight[500]};
  text-decoration-line: line-through;
`;

const Separator = styled.View`
  width: ${spacing.md}px;
`;

export default DealsSection; 