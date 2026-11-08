import React, { useState } from 'react';
import { Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { formatPrice, getProduct } from '../data/products';
import { useStore } from '../context/StoreContext';
import { ProductImage } from '../components/ProductImage';
import { QuantityStepper } from '../components/QuantityStepper';
import { colors, radius } from '../theme/colors';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

function Row({
  title,
  open,
  onPress,
  right,
}: {
  title: string;
  open?: boolean;
  onPress: () => void;
  right?: React.ReactNode;
}) {
  return (
    <Pressable style={styles.rowHeader} onPress={onPress}>
      <Text style={styles.rowTitle}>{title}</Text>
      <View style={styles.rowRight}>
        {right}
        <Ionicons name={open ? 'chevron-down' : 'chevron-forward'} size={20} color={colors.text} />
      </View>
    </Pressable>
  );
}

export default function ProductDetailScreen({ route, navigation }: Props) {
  const product = getProduct(route.params.productId);
  const { addToCart, toggleFavourite, isFavourite } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState<'detail' | 'nutrition' | 'review' | null>('detail');

  if (!product) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={{ padding: 25 }}>Product not found</Text>
      </SafeAreaView>
    );
  }

  const fav = isFavourite(product.id);
  const toggle = (key: typeof open) => setOpen((cur) => (cur === key ? null : key));

  return (
    <View style={styles.safe}>
      <ScrollView contentContainerStyle={{ paddingBottom: 130 }} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <SafeAreaView edges={['top']}>
            <View style={styles.heroBar}>
              <Pressable onPress={() => navigation.goBack()} hitSlop={10} accessibilityLabel="Back">
                <Ionicons name="chevron-back" size={26} color={colors.text} />
              </Pressable>
              <Pressable
                onPress={() => Share.share({ message: `${product.name} — ${formatPrice(product.price)}` })}
                hitSlop={10}
                accessibilityLabel="Share"
              >
                <Ionicons name="share-outline" size={24} color={colors.text} />
              </Pressable>
            </View>
          </SafeAreaView>
          <ProductImage product={product} size={200} style={{ marginVertical: 10 }} />
          <View style={styles.dots}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{product.name}</Text>
              <Text style={styles.unit}>{product.unit}</Text>
            </View>
            <Pressable onPress={() => toggleFavourite(product.id)} hitSlop={10} accessibilityLabel="Favourite">
              <Ionicons name={fav ? 'heart' : 'heart-outline'} size={26} color={fav ? colors.danger : colors.textMuted} />
            </Pressable>
          </View>

          <View style={styles.priceRow}>
            <QuantityStepper value={quantity} onChange={setQuantity} />
            <Text style={styles.price}>{formatPrice(product.price * quantity)}</Text>
          </View>

          <View style={styles.divider} />
          <Row title="Product Detail" open={open === 'detail'} onPress={() => toggle('detail')} />
          {open === 'detail' && <Text style={styles.description}>{product.description}</Text>}

          <View style={styles.divider} />
          <Row
            title="Nutritions"
            open={open === 'nutrition'}
            onPress={() => toggle('nutrition')}
            right={
              <View style={styles.badge}>
                <Text style={styles.badgeText}>100gr</Text>
              </View>
            }
          />
          {open === 'nutrition' && (
            <Text style={styles.description}>Calories 52 kcal · Carbs 14 g · Fiber 2.4 g · Sugar 10 g</Text>
          )}

          <View style={styles.divider} />
          <Row
            title="Review"
            open={open === 'review'}
            onPress={() => toggle('review')}
            right={
              <View style={{ flexDirection: 'row', gap: 2 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Ionicons key={i} name="star" size={16} color={colors.star} />
                ))}
              </View>
            }
          />
          {open === 'review' && <Text style={styles.description}>“Very fresh and tasty!” — 4.9 / 5 (128 reviews)</Text>}
        </View>
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={styles.footer}>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && { backgroundColor: colors.primaryDark }]}
          onPress={() => {
            addToCart(product.id, quantity);
            navigation.goBack();
          }}
        >
          <Text style={styles.buttonText}>Add To Basket</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  hero: {
    backgroundColor: colors.surface,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingBottom: 20,
  },
  heroBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 4 },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: colors.border },
  dotActive: { width: 16, backgroundColor: colors.primary },
  body: { paddingHorizontal: 25, paddingTop: 30 },
  titleRow: { flexDirection: 'row', alignItems: 'flex-start' },
  name: { fontSize: 24, fontWeight: '700', color: colors.text },
  unit: { fontSize: 16, color: colors.textMuted, marginTop: 6, fontWeight: '500' },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 30,
  },
  price: { fontSize: 24, fontWeight: '700', color: colors.text },
  divider: { height: 1, backgroundColor: colors.border },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
  },
  rowTitle: { fontSize: 16, fontWeight: '600', color: colors.text },
  rowRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  description: { fontSize: 13, lineHeight: 21, color: colors.textMuted, marginBottom: 18 },
  badge: { backgroundColor: colors.surface, borderRadius: 5, paddingHorizontal: 6, paddingVertical: 3 },
  badgeText: { fontSize: 9, fontWeight: '600', color: colors.textMuted },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 25,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: colors.background,
  },
  button: {
    height: 67,
    borderRadius: radius.xl,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonText: { color: '#FFF9FF', fontSize: 18, fontWeight: '600' },
});
