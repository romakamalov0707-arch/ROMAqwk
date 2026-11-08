import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { formatPrice, Product } from '../data/products';
import { useStore } from '../context/StoreContext';
import { colors, radius } from '../theme/colors';
import { ProductImage } from './ProductImage';

interface Props {
  product: Product;
  width?: number | `${number}%`;
}

export function ProductCard({ product, width = 173 }: Props) {
  const navigation = useNavigation();
  const { addToCart } = useStore();

  return (
    <Pressable
      style={({ pressed }) => [styles.card, { width }, pressed && styles.pressed]}
      onPress={() => navigation.navigate('ProductDetail', { productId: product.id })}
    >
      <ProductImage product={product} size={80} style={styles.image} />
      <Text style={styles.name} numberOfLines={2}>
        {product.name}
      </Text>
      <Text style={styles.unit}>{product.unit}</Text>
      <View style={styles.footer}>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
        <Pressable
          style={({ pressed }) => [styles.add, pressed && { backgroundColor: colors.primaryDark }]}
          onPress={() => addToCart(product.id)}
          hitSlop={8}
          accessibilityLabel={`Add ${product.name} to basket`}
        >
          <Ionicons name="add" size={22} color="#fff" />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: 15,
    backgroundColor: colors.background,
  },
  pressed: { opacity: 0.85 },
  image: { marginTop: 10, marginBottom: 20 },
  name: { fontSize: 16, fontWeight: '700', color: colors.text, minHeight: 40 },
  unit: { fontSize: 14, color: colors.textMuted, marginTop: 4 },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  price: { fontSize: 18, fontWeight: '700', color: colors.text },
  add: {
    width: 45,
    height: 45,
    borderRadius: 17,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
