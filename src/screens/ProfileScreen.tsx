import React from 'react';
import { ScrollView, Alert } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

import { useI18n } from '@/i18n/I18nProvider';

// Mock user data
const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://via.placeholder.com/150',
};

interface MenuItemProps {
  icon: string;
  title: string;
  onPress: () => void;
}

function MenuItem({ icon, title, onPress }: MenuItemProps) {
  return (
    <MenuItemContainer onPress={onPress}>
      <MenuItemIcon>
        <MaterialIcons name={icon as any} size={24} color="#3498db" />
      </MenuItemIcon>
      <MenuItemTitle>{title}</MenuItemTitle>
      <MaterialIcons name="chevron-right" size={24} color="#999" />
    </MenuItemContainer>
  );
}

function ProfileScreen() {
  const { t } = useI18n();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: t('common.cancel'),
        style: 'cancel',
      },
      {
        text: t('profile.logout'),
        onPress: () => {
          // Handle logout logic here
          Alert.alert('Success', 'You have been logged out!');
        },
      },
    ]);
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader>
          <AvatarContainer>
            <Avatar source={{ uri: user.avatar }} />
          </AvatarContainer>
          <ProfileInfo>
            <ProfileName>{user.name}</ProfileName>
            <ProfileEmail>{user.email}</ProfileEmail>
          </ProfileInfo>
        </ProfileHeader>

        <SectionTitle>{t('profile.title')}</SectionTitle>

        <MenuSection>
          <MenuItem 
            icon="shopping-bag" 
            title={t('profile.orders')} 
            onPress={() => Alert.alert('Orders', 'View your orders')} 
          />
          <Divider />
          <MenuItem 
            icon="favorite-border" 
            title={t('profile.wishlist')} 
            onPress={() => Alert.alert('Wishlist', 'View your wishlist')} 
          />
          <Divider />
          <MenuItem 
            icon="location-on" 
            title={t('profile.addresses')} 
            onPress={() => Alert.alert('Addresses', 'Manage your addresses')} 
          />
          <Divider />
          <MenuItem 
            icon="settings" 
            title={t('profile.settings')} 
            onPress={() => Alert.alert('Settings', 'Manage your settings')} 
          />
        </MenuSection>

        <LogoutButton onPress={handleLogout}>
          <LogoutText>{t('profile.logout')}</LogoutText>
        </LogoutButton>
      </ScrollView>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const ProfileHeader = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg}px;
  background-color: white;
`;

const AvatarContainer = styled.View`
  margin-right: ${({ theme }) => theme.spacing.md}px;
`;

const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

const ProfileInfo = styled.View`
  flex: 1;
`;

const ProfileName = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.lg}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const ProfileEmail = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  color: ${({ theme }) => theme.colors.textLight};
`;

const SectionTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textLight};
  margin: ${({ theme }) => theme.spacing.md}px;
`;

const MenuSection = styled.View`
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  margin: 0 ${({ theme }) => theme.spacing.md}px;
  overflow: hidden;
`;

const MenuItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const MenuItemIcon = styled.View`
  margin-right: ${({ theme }) => theme.spacing.md}px;
`;

const MenuItemTitle = styled.Text`
  flex: 1;
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  color: ${({ theme }) => theme.colors.text};
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  margin-left: ${({ theme }) => theme.spacing.lg}px;
`;

const LogoutButton = styled.TouchableOpacity`
  margin: ${({ theme }) => theme.spacing.xl}px ${({ theme }) => theme.spacing.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  background-color: ${({ theme }) => theme.colors.error};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  align-items: center;
`;

const LogoutText = styled.Text`
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  font-weight: bold;
`;

export default ProfileScreen; 