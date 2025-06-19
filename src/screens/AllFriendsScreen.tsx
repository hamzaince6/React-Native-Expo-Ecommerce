import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Image, SafeAreaView, Dimensions, RefreshControl } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useI18n } from '@/i18n/I18nProvider';
import { usePaginatedUsers } from '@/services';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { colors, spacing } from '@/styles/globalStyles';

type AllFriendsScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const ORANGE_COLOR = '#FF6000';
const ITEMS_PER_PAGE = 20;

// Get screen dimensions for better layout calculations
const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - spacing.md * 4) / 2;

const AllFriendsScreen = () => {
  const { t } = useI18n();
  const navigation = useNavigation<AllFriendsScreenNavigationProp>();
  const [refreshing, setRefreshing] = useState(false);
  const { 
    users, 
    isLoading, 
    error, 
    totalUsers, 
    currentPage, 
    totalPages,
    loadNextPage,
    loadPreviousPage,
    goToPage
  } = usePaginatedUsers(ITEMS_PER_PAGE);

  const handleUserPress = (userId: number) => {
    navigation.navigate('UserDetail', { userId });
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await goToPage(currentPage);
    } catch (error) {
      console.error('Error refreshing:', error);
    } finally {
      setRefreshing(false);
    }
  }, [currentPage, goToPage]);

  if (isLoading && users.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={24} color={ORANGE_COLOR} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('profile.friends')}</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={ORANGE_COLOR} />
        </View>
      </SafeAreaView>
    );
  }

  if (error && users.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={24} color={ORANGE_COLOR} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('profile.friends')}</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => goToPage(1)}
          >
            <Text style={styles.retryButtonText}>{t('common.retry')}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust startPage if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <TouchableOpacity
          key={i}
          style={[
            styles.pageNumberButton,
            currentPage === i && styles.activePageButton
          ]}
          onPress={() => goToPage(i)}
        >
          <Text style={[
            styles.pageNumberText,
            currentPage === i && styles.activePageText
          ]}>
            {i}
          </Text>
        </TouchableOpacity>
      );
    }
    
    return pageNumbers;
  };

  const renderPagination = () => {
    return (
      <View style={styles.paginationContainer}>
        <View style={styles.paginationControls}>
          <TouchableOpacity 
            style={[styles.paginationButton, currentPage === 1 && styles.disabledButton]}
            onPress={loadPreviousPage}
            disabled={currentPage === 1}
          >
            <MaterialIcons name="chevron-left" size={24} color={currentPage === 1 ? '#ccc' : ORANGE_COLOR} />
          </TouchableOpacity>
          
          <View style={styles.pageNumbersContainer}>
            {renderPageNumbers()}
          </View>
          
          <TouchableOpacity 
            style={[styles.paginationButton, currentPage === totalPages && styles.disabledButton]}
            onPress={loadNextPage}
            disabled={currentPage === totalPages}
          >
            <MaterialIcons name="chevron-right" size={24} color={currentPage === totalPages ? '#ccc' : ORANGE_COLOR} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.pageInfoContainer}>
          <Text style={styles.totalText}>
            {totalUsers} {t('profile.friends').toLowerCase()}
          </Text>
        </View>
      </View>
    );
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.userCard}
      onPress={() => handleUserPress(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.avatarContainer}>
        <Image 
          source={{ uri: item.avatar }} 
          style={styles.avatar}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.userName} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
      <Text style={styles.userRole} numberOfLines={1} ellipsizeMode="tail">{item.role}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color={ORANGE_COLOR} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('profile.friends')}</Text>
        <View style={{ width: 24 }} />
      </View>

      {isLoading && users.length > 0 && !refreshing && (
        <ActivityIndicator style={styles.loadingOverlay} size="small" color={ORANGE_COLOR} />
      )}

      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={renderPagination}
        showsVerticalScrollIndicator={true}
        initialNumToRender={6}
        maxToRenderPerBatch={10}
        windowSize={10}
        columnWrapperStyle={styles.columnWrapper}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[ORANGE_COLOR]}
            tintColor={ORANGE_COLOR}
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background[100],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    backgroundColor: colors.background[50],
    borderBottomWidth: 1,
    borderBottomColor: colors.background[200],
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text[600],
  },
  backButton: {
    padding: spacing.xs,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background[100],
  },
  loadingOverlay: {
    padding: spacing.md,
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
    zIndex: 1000,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.background[100],
  },
  errorText: {
    color: '#DC2626',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  retryButton: {
    backgroundColor: ORANGE_COLOR,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  listContainer: {
    padding: spacing.md,
    paddingBottom: spacing.xl * 2,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  userCard: {
    width: CARD_WIDTH,
    padding: spacing.md,
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarContainer: {
    marginBottom: spacing.sm,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: ORANGE_COLOR,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text[600],
    textAlign: 'center',
    marginBottom: 2,
    width: '100%',
  },
  userRole: {
    fontSize: 14,
    color: colors.text[500],
    textAlign: 'center',
    textTransform: 'capitalize',
    width: '100%',
  },
  paginationContainer: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    marginTop: spacing.lg,
  },
  paginationControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageNumbersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: spacing.sm,
  },
  pageNumberButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    backgroundColor: colors.background[50],
  },
  activePageButton: {
    backgroundColor: ORANGE_COLOR,
  },
  pageNumberText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text[600],
  },
  activePageText: {
    color: 'white',
    fontWeight: '700',
  },
  paginationButton: {
    padding: spacing.sm,
    borderRadius: 8,
    backgroundColor: colors.background[50],
  },
  disabledButton: {
    opacity: 0.5,
  },
  pageInfoContainer: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  pageInfoText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text[600],
  },
  totalText: {
    fontSize: 14,
    color: colors.text[500],
    marginTop: 4,
  },
});

export default AllFriendsScreen; 