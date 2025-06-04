import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

import { useI18n } from '@/i18n/I18nProvider';
import CategoryList from '@/components/category/CategoryList';
import { DefaultTheme } from 'styled-components/native';

interface CategoriesSectionProps {
  onViewAllPress?: () => void;
}

function CategoriesSection({ onViewAllPress }: CategoriesSectionProps) {
  const { t } = useI18n();

  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>{t('home.categories')}</SectionTitle>
        <ViewAllButton onPress={onViewAllPress}>
          <ViewAllText>{t('home.viewAll')}</ViewAllText>
          <MaterialIcons name="chevron-right" size={20} color="#3498db" />
        </ViewAllButton>
      </SectionHeader>
      <CategoryList />
    </SectionContainer>
  );
}

const SectionContainer = styled.View`
  margin-bottom: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.md}px;
  padding-horizontal: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.md}px;
`;

const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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

export default CategoriesSection; 