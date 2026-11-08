import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { SearchBar } from '../components/SearchBar';
import { colors } from '../theme/colors';
import type { ExploreStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<ExploreStackParamList, 'Search'>;

export default function SearchScreen({ route, navigation }: Props) {
  const [query, setQuery] = useState(route.params?.query ?? '');
  const { width } = useWindowDimensions();
  const cardWidth = (width - 25 * 2 - 15) / 2;

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.top}>
        {navigation.canGoBack() && (
          <Pressable onPress={() => navigation.goBack()} hitSlop={10} accessibilityLabel="Back">
            <Ionicons name="chevron-back" size={26} color={colors.text} />
          </Pressable>
        )}
        <SearchBar
          value={query}
          onChangeText={setQuery}
          onClear={() => setQuery('')}
          autoFocus
          style={{ flex: 1 }}
        />
        <Ionicons name="options-outline" size={24} color={colors.text} />
      </View>
      <FlatList
        data={results}
        keyExtractor={(p) => p.id}
        numColumns={2}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.list}
        columnWrapperStyle={{ gap: 15 }}
        renderItem={({ item }) => <ProductCard product={item} width={cardWidth} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="search-outline" size={48} color={colors.border} />
            <Text style={styles.emptyText}>Nothing found for “{query}”</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  top: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 25, paddingVertical: 10 },
  list: { paddingHorizontal: 25, paddingTop: 10, paddingBottom: 24, gap: 15 },
  empty: { alignItems: 'center', marginTop: 60, gap: 12 },
  emptyText: { color: colors.textMuted, fontSize: 16 },
});
