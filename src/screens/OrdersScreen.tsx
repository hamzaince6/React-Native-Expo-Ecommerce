import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/styles/theme';
import { Order } from '@/types/order';
import { getOrders } from '@/services/OrderServices';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { useI18n } from '@/i18n/I18nProvider';

type OrdersNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const OrderStatusBadge = ({ status }: { status: Order['status'] }) => {
  const { t } = useI18n();
  
  const getStatusColor = () => {
    switch (status) {
      case 'processing':
        return theme.colors.warning;
      case 'shipped':
        return theme.colors.secondary;
      case 'delivered':
        return theme.colors.success;
      case 'cancelled':
        return theme.colors.error;
      default:
        return theme.colors.textLight;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'processing':
        return t('orders.processing');
      case 'shipped':
        return t('orders.shipped');
      case 'delivered':
        return t('orders.delivered');
      case 'cancelled':
        return t('orders.cancelled');
      default:
        return status;
    }
  };

  return (
    <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
      <Text style={styles.statusText}>{getStatusText()}</Text>
    </View>
  );
};

const OrderCard = ({ order }: { order: Order }) => {
  const navigation = useNavigation<OrdersNavigationProp>();
  const { t } = useI18n();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString(undefined, {
      style: 'currency',
      currency: 'TRY'
    });
  };

  const handleOrderPress = () => {
    navigation.navigate('OrderDetail', { orderId: order.id });
  };

  return (
    <TouchableOpacity 
      style={[styles.orderCard, { shadowColor: theme.colors.primary }]}
      onPress={handleOrderPress}
      activeOpacity={0.7}
    >
      <View style={styles.orderHeader}>
        <View>
          <Text style={styles.orderNumber}>{t('orders.orderNumber')}{order.orderNumber}</Text>
          <Text style={styles.orderDate}>{formatDate(order.date)}</Text>
        </View>
        <OrderStatusBadge status={order.status} />
      </View>
      
      <View style={styles.orderItems}>
        {order.items.slice(0, 3).map((item, index) => (
          <View key={item.id} style={styles.itemRow}>
            <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.itemQuantity}>{item.quantity} {t('cart.quantity')}</Text>
            </View>
            <Text style={styles.itemPrice}>{formatPrice(item.price * item.quantity)}</Text>
          </View>
        ))}
        
        {order.items.length > 3 && (
          <Text style={styles.moreItems}>+{order.items.length - 3} {t('orders.items')}</Text>
        )}
      </View>
      
      <View style={styles.orderFooter}>
        <Text style={styles.totalLabel}>{t('orders.total')}:</Text>
        <Text style={[styles.totalAmount, { color: theme.colors.primary }]}>
          {formatPrice(order.totalAmount)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const OrdersScreen = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useI18n();
  const navigation = useNavigation<OrdersNavigationProp>();

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const data = await getOrders();
        setOrders(data);
        setError(null);
      } catch (err) {
        setError(t('common.error'));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [t]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Ionicons name="alert-circle" size={48} color={theme.colors.error} />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={[styles.retryButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => setLoading(true)}
        >
          <Text style={styles.retryButtonText}>{t('common.retry')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={styles.centered}>
        <Ionicons name="cart-outline" size={64} color={theme.colors.textLight} />
        <Text style={styles.emptyText}>{t('orders.noOrders')}</Text>
        <TouchableOpacity 
          style={[styles.shopButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => navigation.navigate('Main')}
        >
          <Text style={styles.shopButtonText}>{t('orders.startShopping')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>{t('orders.title')}</Text>
        <View style={styles.headerRight} />
      </View>
      
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OrderCard order={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
  },
  headerRight: {
    width: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  listContent: {
    padding: 16,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  orderDate: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  orderItems: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
    paddingVertical: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemImage: {
    width: 40,
    height: 40,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  itemQuantity: {
    fontSize: 12,
    color: '#6B7280',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
  },
  moreItems: {
    fontSize: 13,
    color: '#6B7280',
    fontStyle: 'italic',
    marginTop: 4,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 12,
  },
  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 16,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 12,
  },
  shopButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 16,
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OrdersScreen; 