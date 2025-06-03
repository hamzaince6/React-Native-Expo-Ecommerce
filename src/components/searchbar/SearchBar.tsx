import React, { useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

interface SearchBarProps {
  placeholder: string;
  onSearch?: (query: string) => void;
}

function SearchBar({ placeholder, onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (onSearch && query.trim()) {
      onSearch(query);
    }
  };

  const handleClear = () => {
    setQuery('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <Container>
      <SearchIcon>
        <MaterialIcons name="search" size={24} color="#999" />
      </SearchIcon>
      <Input
        placeholder={placeholder}
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
      {query.length > 0 && (
        <ClearButton onPress={handleClear}>
          <MaterialIcons name="close" size={20} color="#999" />
        </ClearButton>
      )}
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  padding: 0 ${({ theme }) => theme.spacing.sm}px;
  height: 48px;
`;

const SearchIcon = styled.View`
  padding-right: ${({ theme }) => theme.spacing.sm}px;
`;

const Input = styled.TextInput`
  flex: 1;
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  color: ${({ theme }) => theme.colors.text};
`;

const ClearButton = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.spacing.xs}px;
`;

export default SearchBar; 