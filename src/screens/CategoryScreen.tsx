import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { byCategory } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ScreenHeader } from '../components/ScreenHeader';
import { colors } from '../theme/colors';
import type { ExploreStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<ExploreStackParamList, 'Category'>;
type Sort = 'default' | 'priceAsc' | 'priceDesc';

const sortLabels: Record<Sort, string> = {
  default: 'Default',
  priceAsc: 'Price: Low → High',
  priceDesc: 'Price: High → Low',
};

/** Used for "Beverages" and every other category from the Explore grid. */
export default function CategoryScreen({ route, navigation }: Props) {
  const { categoryId, title } = route.params;
  const { width } = useWindowDimensions();
  const cardWidth = (width - 25 * 2 - 15) / 2;
  const [sort, setSort] = useState<Sort>('default');

  const data = useMemo(() => {
    const list = [...byCategory(categoryId)];
    if (sort === 'priceAsc') list.sort((a, b) => a.price - b.price);
    if (sort === 'priceDesc') list.sort((a, b) => b.price - a.price);
    return list;
  }, [categoryId, sort]);

  const nextSort = () =>
    setSort((s) => (s === 'default' ? 'priceAsc' : s === 'priceAsc' ? 'priceDesc' : 'default'));

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader
        title={title}
        onBack={() => navigation.goBack()}
        right={
          <Pressable onPress={nextSort} hitSlop={10} accessibilityLabel="Sort">
            <Ionicons name="options-outline" size={24} color={colors.text} />
          </Pressable>
        }
      />
      {sort !== 'default' && <Text style={styles.sort}>Sorted by {sortLabels[sort]}</Text>}
      <FlatList
        data={data}
        keyExtractor={(p) => p.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={{ gap: 15 }}
        renderItem={({ item }) => <ProductCard product={item} width={cardWidth} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No products yet</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  sort: { textAlign: 'center', color: colors.textMuted, marginBottom: 8 },
  list: { paddingHorizontal: 25, paddingTop: 10, paddingBottom: 24, gap: 15 },
  empty: { alignItems: 'center', marginTop: 60 },
  emptyText: { color: colors.textMuted, fontSize: 16 },
});
