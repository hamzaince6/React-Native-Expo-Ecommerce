import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AdsBanner, SearchInput, SearchResults } from '@/components';

type SearchResult = {
  id: string;
  name: string;
};

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  // Mock search function - in a real app, this would connect to your API
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Mock data for demonstration
    if (query.length > 0) {
      setResults([
        { id: '1', name: 'Product 1' },
        { id: '2', name: 'Product 2' },
        { id: '3', name: 'Product 3' },
      ]);
    } else {
      setResults([]);
    }
  };

  return (  
    <SafeAreaView style={styles.container}>
      <AdsBanner />

      <SearchInput 
        searchQuery={searchQuery}
        onChangeText={handleSearch}
      />

      <SearchResults 
        results={results}
        searchQuery={searchQuery}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default SearchScreen; 