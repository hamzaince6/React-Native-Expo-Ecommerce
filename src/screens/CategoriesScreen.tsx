import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { AdsBanner } from '@/components';
import { CategoryService } from '@/services';
import { Category } from '@/types/category';
import { spacing, borderRadius, shadows, colors, globalStyles } from '@/styles/globalStyles';

const CategoriesScreen = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await CategoryService.getAllCategories();
        setCategories(data);
        setError(null);
      } catch (err) {
        console.error('Kategoriler yüklenirken hata:', err);
        setError('Kategoriler yüklenemedi. Lütfen daha sonra tekrar deneyin.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <CategoryItemContainer>
      <CategoryImageWrapper>
        <CategoryImage 
          source={{ uri: item.imageUrl }} 
          onError={(e: { nativeEvent: { error: string } }) => console.log('Image error:', item.name, item.imageUrl, e.nativeEvent.error)}
        />
      </CategoryImageWrapper>
      <CategoryName>{item.name}</CategoryName>
    </CategoryItemContainer>
  );

  if (loading) {
    return (
      <Container>
        <AdsBanner />
        <LoadingContainer>
          <ActivityIndicator size="large" color={colors.primary[500]} />
        </LoadingContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <AdsBanner />
        <ErrorContainer>
          <ErrorText>{error}</ErrorText>
        </ErrorContainer>
      </Container>
    );
  }

  return (
    <Container>
      <AdsBanner />
      <HeaderContainer>
        <PageTitle>Kategoriler</PageTitle>
      </HeaderContainer>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: spacing.md }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
    </Container>
  );
};

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.background[100]};
`;

const HeaderContainer = styled.View`
  padding: ${spacing.md}px;
  padding-bottom: ${spacing.sm}px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.background[200]};
  background-color: ${colors.background[50]};
`;

const PageTitle = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${colors.text[600]};
  letter-spacing: -0.5px;
`;

const CategoryItemContainer = styled.TouchableOpacity`
  width: 48%;
  margin-bottom: ${spacing.md}px;
  background-color: ${colors.background[50]};
  border-radius: ${borderRadius.lg}px;
  padding: ${spacing.md}px;
  align-items: center;
  elevation: ${shadows.md.elevation};
  shadow-color: ${shadows.md.shadowColor};
  shadow-offset: ${shadows.md.shadowOffset.width}px ${shadows.md.shadowOffset.height}px;
  shadow-opacity: ${shadows.md.shadowOpacity};
  shadow-radius: ${shadows.md.shadowRadius}px;
  border-width: 1px;
  border-color: ${colors.background[300]};
`;

const CategoryImageWrapper = styled.View`
  width: 90px;
  height: 90px;
  border-radius: ${borderRadius.round}px;
  overflow: hidden;
  margin-bottom: ${spacing.sm}px;
  elevation: ${shadows.sm.elevation};
  shadow-color: ${shadows.sm.shadowColor};
  shadow-offset: ${shadows.sm.shadowOffset.width}px ${shadows.sm.shadowOffset.height}px;
  shadow-opacity: ${shadows.sm.shadowOpacity};
  shadow-radius: ${shadows.sm.shadowRadius}px;
  background-color: ${colors.background[50]};
`;

const CategoryImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const CategoryName = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.text[600]};
  text-align: center;
  margin-top: ${spacing.xs}px;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${spacing.lg}px;
`;

const ErrorText = styled.Text`
  color: ${colors.primary[900]};
  font-size: 16px;
  text-align: center;
  font-weight: 500;
`;

export default CategoriesScreen; 