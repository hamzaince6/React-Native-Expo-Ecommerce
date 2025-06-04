import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AdsBanner } from '@/components';

type Category = {
  id: string;
  name: string;
  image: string;
};

const categories: Category[] = [
  { 
    id: '1', 
    name: 'Electronics', 
    image: 'https://via.placeholder.com/100' 
  },
  { 
    id: '2', 
    name: 'Clothing', 
    image: 'https://via.placeholder.com/100' 
  },
  { 
    id: '3', 
    name: 'Home & Garden', 
    image: 'https://via.placeholder.com/100' 
  },
  { 
    id: '4', 
    name: 'Sports', 
    image: 'https://via.placeholder.com/100' 
  },
  { 
    id: '5', 
    name: 'Beauty', 
    image: 'https://via.placeholder.com/100' 
  },
  { 
    id: '6', 
    name: 'Toys', 
    image: 'https://via.placeholder.com/100' 
  },
];

const CategoriesScreen = () => {
  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity style={styles.categoryItem}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.categoryImage} 
      />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <AdsBanner />
      <Text style={styles.title}>Categories</Text>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
  },
  listContainer: {
    padding: 8,
  },
  categoryItem: {
    flex: 1,
    margin: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default CategoriesScreen; 