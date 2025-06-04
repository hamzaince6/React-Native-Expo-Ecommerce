import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchInputProps {
  searchQuery: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const SearchInput = ({ 
  searchQuery, 
  onChangeText, 
  placeholder = 'Search products...' 
}: SearchInputProps) => {
  return (
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        value={searchQuery}
        onChangeText={onChangeText}
        autoCapitalize="none"
        underlineColorAndroid="transparent"
      />
      {searchQuery.length > 0 && (
        <Ionicons
          name="close-circle"
          size={20}
          color="#666"
          style={styles.clearIcon}
          onPress={() => onChangeText('')}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    margin: 16,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 46,
    fontSize: 16,
    backgroundColor: 'transparent',
    outlineStyle: 'none',
    shadowColor: 'transparent',
    borderWidth: 0,
    borderColor: 'transparent',
  },
  clearIcon: {
    marginLeft: 10,
  },
});

export default SearchInput; 