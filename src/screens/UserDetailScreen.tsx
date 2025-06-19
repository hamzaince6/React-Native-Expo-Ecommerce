import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from 'styled-components/native';

import { useI18n } from '@/i18n/I18nProvider';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { useUserProfile } from '@/services/ProfileScreenServices';
import { colors, spacing } from '@/styles/globalStyles';

type UserDetailScreenRouteProp = RouteProp<RootStackParamList, 'UserDetail'>;
type UserDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UserDetail'>;

interface UserDetailScreenProps {
  route: UserDetailScreenRouteProp;
  navigation: UserDetailScreenNavigationProp;
}

const UserDetailScreen: React.FC<UserDetailScreenProps> = ({ route, navigation }) => {
  const { userId } = route.params;
  const { t } = useI18n();
  const { user, isLoading, error } = useUserProfile(userId);
  const theme = useTheme();

  const ORANGE_COLOR = '#FF6000';

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={ORANGE_COLOR} />
      </View>
    );
  }

  if (error || !user) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'User not found'}</Text>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.backButtonText, { color: ORANGE_COLOR }]}>{t('common.back')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color={ORANGE_COLOR} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('profile.userDetails')}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.avatarContainer}>
          <Image 
            source={{ uri: user.avatar }} 
            style={[styles.avatar, { borderColor: ORANGE_COLOR }]} 
            resizeMode="cover"
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.role}>{user.role}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <DetailItem 
            icon="email" 
            label={t('auth.email')} 
            value={user.email} 
            iconColor={ORANGE_COLOR}
          />
          <DetailItem 
            icon="person" 
            label="ID" 
            value={`#${user.id}`} 
            iconColor={ORANGE_COLOR}
          />
          <DetailItem 
            icon="calendar-today" 
            label={t('profile.memberSince')} 
            value={formatDate(user.creationAt)} 
            iconColor={ORANGE_COLOR}
          />
          <DetailItem 
            icon="update" 
            label={t('profile.lastUpdated')} 
            value={formatDate(user.updatedAt)} 
            iconColor={ORANGE_COLOR}
          />
        </View>
      </ScrollView>
    </View>
  );
};

interface DetailItemProps {
  icon: string;
  label: string;
  value: string;
  iconColor: string;
}

const DetailItem: React.FC<DetailItemProps> = ({ icon, label, value, iconColor }) => {
  return (
    <View style={styles.detailItem}>
      <MaterialIcons name={icon as any} size={24} color={iconColor} style={styles.detailIcon} />
      <View style={styles.detailTextContainer}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
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
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background[100],
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
  avatarContainer: {
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FF6000',
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text[600],
    marginBottom: spacing.xs,
  },
  role: {
    fontSize: 16,
    color: colors.textLight[500],
    textTransform: 'capitalize',
  },
  detailsContainer: {
    backgroundColor: colors.background[50],
    borderRadius: 12,
    margin: spacing.md,
    padding: spacing.md,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.background[200],
  },
  detailIcon: {
    marginRight: spacing.md,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.textLight[500],
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: colors.text[600],
    fontWeight: '500',
  },
  backButton: {
    padding: spacing.xs,
  },
  backButtonText: {
    color: '#FF6000',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default UserDetailScreen; 