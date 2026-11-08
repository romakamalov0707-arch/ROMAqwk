import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { formatPrice, getProduct } from '../data/products';
import { useStore } from '../context/StoreContext';
import { ProductImage } from '../components/ProductImage';
import { ScreenHeader } from '../components/ScreenHeader';
import { colors } from '../theme/colors';

export default function FavouriteScreen() {
  const navigation = useNavigation();
  const { favourites } = useStore();
  const items = favourites.map(getProduct).filter((p) => p !== undefined);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="Favourite" />
      <View style={styles.divider} />
      <FlatList
        data={items}
        keyExtractor={(p) => p.id}
        contentContainerStyle={{ paddingHorizontal: 25 }}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="heart-outline" size={56} color={colors.border} />
            <Text style={styles.emptyText}>Tap ♡ on a product to save it here</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.item}
            onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
          >
            <ProductImage product={item} size={50} style={{ width: 60 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.unit}>{item.unit}</Text>
            </View>
            <Text style={styles.price}>{formatPrice(item.price)}</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.text} />
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  divider: { height: 1, backgroundColor: colors.border },
  item: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 20 },
  name: { fontSize: 16, fontWeight: '700', color: colors.text },
  unit: { fontSize: 14, color: colors.textMuted, marginTop: 4 },
  price: { fontSize: 16, fontWeight: '600', color: colors.text },
  empty: { alignItems: 'center', marginTop: 100, gap: 12 },
  emptyText: { color: colors.textMuted, fontSize: 16 },
});
