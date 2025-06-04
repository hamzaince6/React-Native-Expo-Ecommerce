import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

type SearchResult = {
  id: string;
  name: string;
};

interface SearchResultsProps {
  results: SearchResult[];
  searchQuery: string;
}

const SearchResults = ({ results, searchQuery }: SearchResultsProps) => {
  return (
    <FlatList
      data={results}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.resultItem}>
          <Text>{item.name}</Text>
        </View>
      )}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {searchQuery.length > 0
              ? 'No products found'
              : 'Search for products'}
          </Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  resultItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default SearchResults; 