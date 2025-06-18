import React from 'react';
import { TouchableOpacity, View, FlatList, ActivityIndicator, Text } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

import { useI18n } from '@/i18n/I18nProvider';
import { useCategories } from '@/hooks';
import { spacing, borderRadius, shadows, colors, globalStyles } from '@/styles/globalStyles';

interface CategoriesSectionProps {
  onViewAllPress?: () => void;
}

function CategoriesSection({ onViewAllPress }: CategoriesSectionProps) {
  const { t } = useI18n();
  const { categories, loading, error } = useCategories();

  const renderCategoryList = () => {
    if (loading) {
      return (
        <LoadingContainer>
          <ActivityIndicator size="large" color="#FF7600" /> {/* primary.500 */}
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
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <Separator />}
        contentContainerStyle={{ paddingHorizontal: spacing.xs }}
        renderItem={({ item }) => (
          <CategoryItem>
            <CategoryCard>
              <CategoryImage source={{ uri: item.imageUrl }} resizeMode="cover" />
            </CategoryCard>
            <CategoryName>{item.name}</CategoryName>
          </CategoryItem>
        )}
      />
    );
  };

  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>{t('home.categories')}</SectionTitle>
        <ViewAllButton onPress={onViewAllPress}>
          <ViewAllText>{t('home.viewAll')}</ViewAllText>
          <MaterialIcons name="chevron-right" size={18} color="#F4B400" /> {/* secondary.500 */}
        </ViewAllButton>
      </SectionHeader>
      {renderCategoryList()}
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

const CategoryItem = styled.TouchableOpacity`
  width: 90px;
  align-items: center;
  margin-right: ${spacing.sm}px;
`;

const CategoryCard = styled.View`
  width: 80px;
  height: 80px;
  border-radius: ${borderRadius.lg}px;
  overflow: hidden;
  background-color: ${colors.background[50]};
  elevation: ${shadows.lg.elevation};
  shadow-color: ${shadows.lg.shadowColor};
  shadow-offset: ${shadows.lg.shadowOffset.width}px ${shadows.lg.shadowOffset.height}px;
  shadow-opacity: ${shadows.lg.shadowOpacity};
  shadow-radius: ${shadows.lg.shadowRadius}px;
  border-width: 1px;
  border-color: ${colors.background[300]};
`;

const CategoryImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const CategoryName = styled.Text`
  margin-top: ${spacing.xs + 2}px;
  font-size: 12px;
  font-weight: 500;
  color: ${colors.textLight[500]};
  text-align: center;
  letter-spacing: -0.1px;
`;

const LoadingContainer = styled.View`
  padding: ${spacing.md + 4}px;
  justify-content: center;
  align-items: center;
`;

const ErrorContainer = styled.View`
  padding: ${spacing.md + 4}px;
  justify-content: center;
  align-items: center;
`;

const ErrorText = styled.Text`
  color: ${colors.primary[900]};
  font-size: 14px;
  text-align: center;
`;

const Separator = styled.View`
  width: ${spacing.md - 4}px;
`;

export default CategoriesSection;