import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { DefaultTheme } from 'styled-components/native';

import { useI18n } from '@/i18n/I18nProvider';
import { Product, mockProducts } from '@/utils/mockData';

interface DealsSectionProps {
  onViewAllPress?: () => void;
  onProductPress?: (productId: string) => void;
}

const DealsSection: React.FC<DealsSectionProps> = ({ 
  onViewAllPress,
  onProductPress 
}) => {
  const { t } = useI18n();
  
  // Normalde API'den indirimli ürünleri alırdık, şimdilik mock veri kullanıyoruz
  const deals = mockProducts.slice(0, 6);

  const handleProductPress = (productId: string) => {
    if (onProductPress) {
      onProductPress(productId);
    }
  };

  const renderDealItem = ({ item }: { item: Product }) => (
    <DealItem onPress={() => handleProductPress(item.id)}>
      <DealImageContainer>
        <DealImage source={{ uri: item.imageUrl }} resizeMode="cover" />
        <DiscountBadge>
          <DiscountText>-{Math.floor(Math.random() * 40 + 10)}%</DiscountText>
        </DiscountBadge>
      </DealImageContainer>
      <DealInfo>
        <DealName numberOfLines={2}>{item.name}</DealName>
        <PriceContainer>
          <CurrentPrice>${item.price.toFixed(2)}</CurrentPrice>
          <OriginalPrice>${(item.price * (1 + Math.random() * 0.5)).toFixed(2)}</OriginalPrice>
        </PriceContainer>
      </DealInfo>
    </DealItem>
  );

  return (
    <Container>
      <SectionHeader>
        <SectionTitle>{t('home.deals') || 'Günün Fırsatları'}</SectionTitle>
        <ViewAllButton onPress={onViewAllPress}>
          <ViewAllText>{t('home.viewAll') || 'Tümünü Gör'}</ViewAllText>
          <MaterialIcons name="chevron-right" size={20} color="#3498db" />
        </ViewAllButton>
      </SectionHeader>

      <FlatList
        data={deals}
        renderItem={renderDealItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ItemSeparatorComponent={() => <Separator />}
      />
    </Container>
  );
};

const Container = styled.View`
  margin-bottom: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.md}px;
`;

const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.md}px;
  margin-bottom: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.sm}px;
`;

const SectionTitle = styled.Text`
  font-size: ${({ theme }: { theme: DefaultTheme }) => theme.typography.fontSize.lg}px;
  font-weight: bold;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text};
`;

const ViewAllButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
`;

const ViewAllText = styled.Text`
  font-size: ${({ theme }: { theme: DefaultTheme }) => theme.typography.fontSize.sm}px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  margin-right: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.xs}px;
`;

const DealItem = styled(TouchableOpacity)`
  width: 160px;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.card};
  border-radius: ${({ theme }: { theme: DefaultTheme }) => theme.borderRadius.md}px;
  overflow: hidden;
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
  top: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.xs}px;
  left: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.xs}px;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.error};
  padding-horizontal: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.xs}px;
  padding-vertical: 2px;
  border-radius: ${({ theme }: { theme: DefaultTheme }) => theme.borderRadius.sm}px;
`;

const DiscountText = styled.Text`
  color: white;
  font-size: ${({ theme }: { theme: DefaultTheme }) => theme.typography.fontSize.xs}px;
  font-weight: bold;
`;

const DealInfo = styled.View`
  padding: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.sm}px;
`;

const DealName = styled.Text`
  font-size: ${({ theme }: { theme: DefaultTheme }) => theme.typography.fontSize.sm}px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text};
  margin-bottom: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.xs}px;
  height: 40px;
`;

const PriceContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CurrentPrice = styled.Text`
  font-size: ${({ theme }: { theme: DefaultTheme }) => theme.typography.fontSize.md}px;
  font-weight: bold;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  margin-right: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.xs}px;
`;

const OriginalPrice = styled.Text`
  font-size: ${({ theme }: { theme: DefaultTheme }) => theme.typography.fontSize.xs}px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.textLight};
  text-decoration-line: line-through;
`;

const Separator = styled.View`
  width: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.sm}px;
`;

export default DealsSection; 