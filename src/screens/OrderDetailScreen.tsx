import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { theme } from '@/styles/theme';
import { Order } from '@/types/order';
import { getOrderById } from '@/services/OrderServices';
import { useI18n } from '@/i18n/I18nProvider';

type OrderDetailRouteProp = RouteProp<RootStackParamList, 'OrderDetail'>;
type OrderDetailNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const OrderDetailScreen = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const route = useRoute<OrderDetailRouteProp>();
  const navigation = useNavigation<OrderDetailNavigationProp>();
  const { orderId } = route.params;
  const { t } = useI18n();

  useEffect(() => {
    const loadOrder = async () => {
      try {
        setLoading(true);
        const data = await getOrderById(orderId);
        if (data) {
          setOrder(data);
          setError(null);
        } else {
          setError(t('common.error'));
        }
      } catch (err) {
        setError(t('common.error'));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId, t]);

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

  const getStatusColor = (status: Order['status']) => {
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

  const getStatusText = (status: Order['status']) => {
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

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error || !order) {
    return (
      <View style={styles.centered}>
        <Ionicons name="alert-circle" size={48} color={theme.colors.error} />
        <Text style={styles.errorText}>{error || t('common.error')}</Text>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>{t('common.back')}</Text>
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
        <Text style={styles.headerTitle}>{t('orders.details')}</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.orderInfo}>
          <View style={styles.orderHeader}>
            <View>
              <Text style={styles.orderNumber}>{t('orders.orderNumber')}{order.orderNumber}</Text>
              <Text style={styles.orderDate}>{formatDate(order.date)}</Text>
            </View>
            <View 
              style={[
                styles.statusBadge, 
                { backgroundColor: getStatusColor(order.status) }
              ]}
            >
              <Text style={styles.statusText}>{getStatusText(order.status)}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('orders.items')}</Text>
            {order.items.map((item) => (
              <View key={item.id} style={styles.itemRow}>
                <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemMeta}>
                    {formatPrice(item.price)} x {item.quantity}
                  </Text>
                </View>
                <Text style={styles.itemPrice}>
                  {formatPrice(item.price * item.quantity)}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('orders.orderSummary')}</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>{t('orders.subtotal')}</Text>
              <Text style={styles.summaryValue}>
                {formatPrice(order.totalAmount * 0.82)} {/* Example tax calculation */}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>{t('orders.tax')} (%18)</Text>
              <Text style={styles.summaryValue}>
                {formatPrice(order.totalAmount * 0.18)} {/* Example tax calculation */}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>{t('orders.shipping')}</Text>
              <Text style={styles.summaryValue}>{t('cart.free')}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>{t('orders.total')}</Text>
              <Text style={[styles.totalValue, { color: theme.colors.primary }]}>
                {formatPrice(order.totalAmount)}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('orders.shippingAddress')}</Text>
            <Text style={styles.addressText}>
              Örnek Mahallesi, Örnek Sokak No:123{'\n'}
              Örnek İlçe / İstanbul{'\n'}
              Türkiye
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('orders.paymentMethod')}</Text>
            <View style={styles.paymentMethod}>
              <Ionicons name="card-outline" size={24} color={theme.colors.text} />
              <Text style={styles.paymentText}>Kredi Kartı ile Ödeme</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
          >
            <Ionicons name="chatbubble-outline" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>{t('orders.support')}</Text>
          </TouchableOpacity>
          
          {order.status === 'delivered' && (
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: theme.colors.secondary }]}
            >
              <Ionicons name="star-outline" size={20} color="#fff" />
              <Text style={styles.actionButtonText}>{t('orders.review')}</Text>
            </TouchableOpacity>
          )}
          
          {order.status === 'processing' && (
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: theme.colors.error }]}
            >
              <Ionicons name="close-circle-outline" size={20} color="#fff" />
              <Text style={styles.actionButtonText}>{t('orders.cancel')}</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  headerRight: {
    width: 40,
  },
  orderInfo: {
    padding: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    ...theme.shadows.sm,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  orderDate: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    ...theme.shadows.sm,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  itemMeta: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 14,
    color: '#1F2937',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addressText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#1F2937',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentText: {
    fontSize: 14,
    color: '#1F2937',
    marginLeft: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 120,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  errorText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OrderDetailScreen; 