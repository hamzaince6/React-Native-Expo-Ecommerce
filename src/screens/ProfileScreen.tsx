import React from 'react';
import { ScrollView, Alert, Image, FlatList, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { DefaultTheme } from 'styled-components/native';

import { useI18n } from '@/i18n/I18nProvider';
import { AdsBanner } from '@/components';

// Define friend status type
type FriendStatus = 'online' | 'offline';

// Mock user data
const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://via.placeholder.com/150',
};

// Mock friends data
const friends = [
  { id: '1', name: 'Emma Wilson', avatar: 'https://randomuser.me/api/portraits/women/1.jpg', status: 'online' as FriendStatus },
  { id: '2', name: 'Michael Brown', avatar: 'https://randomuser.me/api/portraits/men/2.jpg', status: 'offline' as FriendStatus },
  { id: '3', name: 'Sophia Davis', avatar: 'https://randomuser.me/api/portraits/women/3.jpg', status: 'online' as FriendStatus },
  { id: '4', name: 'James Miller', avatar: 'https://randomuser.me/api/portraits/men/4.jpg', status: 'offline' as FriendStatus },
  { id: '5', name: 'Olivia Wilson', avatar: 'https://randomuser.me/api/portraits/women/5.jpg', status: 'online' as FriendStatus },
];

interface MenuItemProps {
  icon: string;
  title: string;
  onPress: () => void;
}

interface FriendItemProps {
  friend: {
    id: string;
    name: string;
    avatar: string;
    status: FriendStatus;
  };
  onPress: (id: string) => void;
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

function FriendItem({ friend, onPress }: FriendItemProps) {
  return (
    <FriendItemContainer onPress={() => onPress(friend.id)}>
      <FriendAvatarContainer>
        <FriendAvatar source={{ uri: friend.avatar }} />
        <StatusIndicator status={friend.status} />
      </FriendAvatarContainer>
      <FriendName>{friend.name}</FriendName>
    </FriendItemContainer>
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

  const handleFriendPress = (friendId: string) => {
    const friend = friends.find(f => f.id === friendId);
    Alert.alert('Friend', `You selected ${friend?.name}`);
  };

  const handleViewAllFriends = () => {
    Alert.alert('Friends', 'View all your friends');
  };

  return (
    <Container>
      <AdsBanner />
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

        <SectionTitle>{t('profile.additional')}</SectionTitle>

        <MenuSection>
          <MenuItem 
            icon="local-offer" 
            title={t('profile.coupons')} 
            onPress={() => Alert.alert('Coupons', 'View your coupons')} 
          />
          <Divider />
          <MenuItem 
            icon="credit-card" 
            title={t('profile.paymentMethods')} 
            onPress={() => Alert.alert('Payment Methods', 'Manage your payment methods')} 
          />
          <Divider />
          <MenuItem 
            icon="notifications" 
            title={t('profile.notifications')} 
            onPress={() => Alert.alert('Notifications', 'Manage your notifications')} 
          />
          <Divider />
          <MenuItem 
            icon="help-outline" 
            title={t('profile.helpSupport')} 
            onPress={() => Alert.alert('Help & Support', 'Get help and support')} 
          />
        </MenuSection>

        <SectionHeader>
          <SectionTitle>{t('profile.friends')}</SectionTitle>
          <ViewAllButton onPress={handleViewAllFriends}>
            <ViewAllText>{t('home.viewAll')}</ViewAllText>
          </ViewAllButton>
        </SectionHeader>

        <FriendsContainer>
          <FlatList
            data={friends}
            renderItem={({ item }) => <FriendItem friend={item} onPress={handleFriendPress} />}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            ItemSeparatorComponent={() => <FriendSeparator />}
          />
        </FriendsContainer>

        <LogoutButton onPress={handleLogout}>
          <LogoutText>{t('profile.logout')}</LogoutText>
        </LogoutButton>
      </ScrollView>
    </Container>
  );
}

// Styled components with proper typing
const Container = styled.SafeAreaView<{ theme?: DefaultTheme }>`
  flex: 1;
  background-color: ${({ theme }) => theme?.colors.background};
`;

const ProfileHeader = styled.View<{ theme?: DefaultTheme }>`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme?.spacing.lg}px;
  background-color: white;
`;

const AvatarContainer = styled.View<{ theme?: DefaultTheme }>`
  margin-right: ${({ theme }) => theme?.spacing.md}px;
`;

const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

const ProfileInfo = styled.View`
  flex: 1;
`;

const ProfileName = styled.Text<{ theme?: DefaultTheme }>`
  font-size: ${({ theme }) => theme?.typography.fontSize.lg}px;
  font-weight: bold;
  color: ${({ theme }) => theme?.colors.text};
  margin-bottom: ${({ theme }) => theme?.spacing.xs}px;
`;

const ProfileEmail = styled.Text<{ theme?: DefaultTheme }>`
  font-size: ${({ theme }) => theme?.typography.fontSize.md}px;
  color: ${({ theme }) => theme?.colors.textLight};
`;

const SectionTitle = styled.Text<{ theme?: DefaultTheme }>`
  font-size: ${({ theme }) => theme?.typography.fontSize.md}px;
  font-weight: bold;
  color: ${({ theme }) => theme?.colors.textLight};
  margin: ${({ theme }) => theme?.spacing.md}px;
`;

const MenuSection = styled.View<{ theme?: DefaultTheme }>`
  background-color: white;
  border-radius: ${({ theme }) => theme?.borderRadius.md}px;
  margin: 0 ${({ theme }) => theme?.spacing.md}px;
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme?.spacing.md}px;
`;

const MenuItemContainer = styled.TouchableOpacity<{ theme?: DefaultTheme }>`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme?.spacing.md}px;
`;

const MenuItemIcon = styled.View<{ theme?: DefaultTheme }>`
  margin-right: ${({ theme }) => theme?.spacing.md}px;
`;

const MenuItemTitle = styled.Text<{ theme?: DefaultTheme }>`
  flex: 1;
  font-size: ${({ theme }) => theme?.typography.fontSize.md}px;
  color: ${({ theme }) => theme?.colors.text};
`;

const Divider = styled.View<{ theme?: DefaultTheme }>`
  height: 1px;
  background-color: ${({ theme }) => theme?.colors.border};
  margin-left: ${({ theme }) => theme?.spacing.lg}px;
`;

const LogoutButton = styled.TouchableOpacity<{ theme?: DefaultTheme }>`
  margin: ${({ theme }) => theme?.spacing.xl}px ${({ theme }) => theme?.spacing.md}px;
  padding: ${({ theme }) => theme?.spacing.md}px;
  background-color: ${({ theme }) => theme?.colors.error};
  border-radius: ${({ theme }) => theme?.borderRadius.md}px;
  align-items: center;
`;

const LogoutText = styled.Text<{ theme?: DefaultTheme }>`
  color: white;
  font-size: ${({ theme }) => theme?.typography.fontSize.md}px;
  font-weight: bold;
`;

const SectionHeader = styled.View<{ theme?: DefaultTheme }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: ${({ theme }) => theme?.spacing.md}px;
`;

const ViewAllButton = styled.TouchableOpacity<{ theme?: DefaultTheme }>`
  padding: ${({ theme }) => theme?.spacing.xs}px ${({ theme }) => theme?.spacing.sm}px;
`;

const ViewAllText = styled.Text<{ theme?: DefaultTheme }>`
  color: ${({ theme }) => theme?.colors.primary[500]};
  font-size: ${({ theme }) => theme?.typography.fontSize.sm}px;
  font-weight: 500;
`;

const FriendsContainer = styled.View<{ theme?: DefaultTheme }>`
  margin-bottom: ${({ theme }) => theme?.spacing.md}px;
`;

const FriendItemContainer = styled.TouchableOpacity<{ theme?: DefaultTheme }>`
  align-items: center;
  width: 80px;
`;

const FriendAvatarContainer = styled.View`
  position: relative;
`;

const FriendAvatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;

const StatusIndicator = styled.View<{ status: FriendStatus; theme?: DefaultTheme }>`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 14px;
  height: 14px;
  border-radius: 7px;
  background-color: ${({ status }) => status === 'online' ? '#4CAF50' : '#9E9E9E'};
  border: 2px solid white;
`;

const FriendName = styled.Text<{ theme?: DefaultTheme }>`
  font-size: ${({ theme }) => theme?.typography.fontSize.sm}px;
  color: ${({ theme }) => theme?.colors.text};
  margin-top: ${({ theme }) => theme?.spacing.xs}px;
  text-align: center;
`;

const FriendSeparator = styled.View<{ theme?: DefaultTheme }>`
  width: ${({ theme }) => theme?.spacing.md}px;
`;

export default ProfileScreen; 