import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import { mockCategories } from '@/utils/mockData';

function CategoryList() {
  return (
    <Container>
      <FlatList
        data={mockCategories}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <CategoryItem>
            <CategoryImageContainer>
              <CategoryImage source={{ uri: item.imageUrl }} resizeMode="cover" />
            </CategoryImageContainer>
            <CategoryName>{item.name}</CategoryName>
          </CategoryItem>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
    </Container>
  );
}

const Container = styled.View`
  margin-vertical: ${({ theme }) => theme.spacing.sm}px;
`;

const CategoryItem = styled.TouchableOpacity`
  align-items: center;
  width: 80px;
`;

const CategoryImageContainer = styled.View`
  width: 60px;
  height: 60px;
  border-radius: ${({ theme }) => theme.borderRadius.round}px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.card};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
  ${({ theme }) => theme.shadows.sm};
`;

const CategoryImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const CategoryName = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.xs}px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;

const Separator = styled.View`
  width: ${({ theme }) => theme.spacing.sm}px;
`;

export default CategoryList; 