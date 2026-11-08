import React from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { formatPrice } from '../data/products';
import { useStore } from '../context/StoreContext';
import { ProductImage } from '../components/ProductImage';
import { QuantityStepper } from '../components/QuantityStepper';
import { ScreenHeader } from '../components/ScreenHeader';
import { colors, radius } from '../theme/colors';

export default function CartScreen() {
  const { cart, cartTotal, setQuantity, removeFromCart, clearCart } = useStore();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="My Cart" />
      <View style={styles.divider} />
      <FlatList
        data={cart}
        keyExtractor={(i) => i.product.id}
        contentContainerStyle={{ paddingHorizontal: 25, paddingBottom: 120 }}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="cart-outline" size={56} color={colors.border} />
            <Text style={styles.emptyText}>Your basket is empty</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <ProductImage product={item.product} size={70} style={{ width: 80 }} />
            <View style={{ flex: 1, gap: 4 }}>
              <View style={styles.itemTop}>
                <Text style={styles.name}>{item.product.name}</Text>
                <Pressable onPress={() => removeFromCart(item.product.id)} hitSlop={10}>
                  <Ionicons name="close" size={22} color={colors.textMuted} />
                </Pressable>
              </View>
              <Text style={styles.unit}>{item.product.unit}</Text>
              <View style={styles.itemBottom}>
                <QuantityStepper
                  value={item.quantity}
                  min={0}
                  onChange={(q) => setQuantity(item.product.id, q)}
                />
                <Text style={styles.price}>{formatPrice(item.product.price * item.quantity)}</Text>
              </View>
            </View>
          </View>
        )}
      />
      {cart.length > 0 && (
        <Pressable
          style={({ pressed }) => [styles.checkout, pressed && { backgroundColor: colors.primaryDark }]}
          onPress={() =>
            Alert.alert('Order placed', `Total: ${formatPrice(cartTotal)}`, [{ text: 'OK', onPress: clearCart }])
          }
        >
          <Text style={styles.checkoutText}>Go to Checkout</Text>
          <View style={styles.totalBadge}>
            <Text style={styles.totalText}>{formatPrice(cartTotal)}</Text>
          </View>
        </Pressable>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  divider: { height: 1, backgroundColor: colors.border },
  item: { flexDirection: 'row', gap: 16, paddingVertical: 24, alignItems: 'center' },
  itemTop: { flexDirection: 'row', justifyContent: 'space-between' },
  itemBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  name: { fontSize: 16, fontWeight: '700', color: colors.text, flex: 1 },
  unit: { fontSize: 14, color: colors.textMuted },
  price: { fontSize: 18, fontWeight: '700', color: colors.text },
  empty: { alignItems: 'center', marginTop: 100, gap: 12 },
  emptyText: { color: colors.textMuted, fontSize: 16 },
  checkout: {
    position: 'absolute',
    left: 25,
    right: 25,
    bottom: 20,
    height: 67,
    borderRadius: radius.xl,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  totalBadge: {
    position: 'absolute',
    right: 20,
    backgroundColor: '#489E67',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  totalText: { color: '#FCFCFC', fontSize: 12, fontWeight: '600' },
});
