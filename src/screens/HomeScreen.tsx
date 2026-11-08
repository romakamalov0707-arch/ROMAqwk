import React from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { byTag, groceryTypes, Product } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { SearchBar } from '../components/SearchBar';
import { SectionHeader } from '../components/SectionHeader';
import { colors, radius } from '../theme/colors';
import type { TabParamList } from '../navigation/types';

type Props = BottomTabScreenProps<TabParamList, 'Shop'>;

function ProductRow({ data }: { data: Product[] }) {
  return (
    <FlatList
      horizontal
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ProductCard product={item} />}
      contentContainerStyle={styles.row}
      ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
      showsHorizontalScrollIndicator={false}
    />
  );
}

export default function HomeScreen({ navigation }: Props) {
  const openSearch = () => navigation.navigate('ExploreTab', { screen: 'Search', params: {} });
  const openCategory = (categoryId: 'fruits' | 'meat', title: string) =>
    navigation.navigate('ExploreTab', { screen: 'Category', params: { categoryId, title } });

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={styles.header}>
          <Text style={styles.logo}>🥕</Text>
          <View style={styles.location}>
            <Ionicons name="location-sharp" size={18} color="#4C4F4D" />
            <Text style={styles.locationText}>Dhaka, Banassre</Text>
          </View>
        </View>

        <View style={styles.padded}>
          <SearchBar onPressBar={openSearch} />

          <View style={styles.banner}>
            <Text style={styles.bannerEmoji}>🥦🥕🍅</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.bannerTitle}>Fresh Vegetables</Text>
              <Text style={styles.bannerSubtitle}>Get Up To 40% OFF</Text>
            </View>
          </View>
          <View style={styles.dots}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        <SectionHeader title="Exclusive Offer" onSeeAll={() => openCategory('fruits', 'Exclusive Offer')} />
        <ProductRow data={byTag('exclusive')} />

        <SectionHeader title="Best Selling" onSeeAll={() => openCategory('fruits', 'Best Selling')} />
        <ProductRow data={byTag('bestSelling')} />

        <SectionHeader title="Groceries" onSeeAll={() => openCategory('meat', 'Groceries')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
          {groceryTypes.map((g) => (
            <Pressable key={g.id} style={[styles.groceryChip, { backgroundColor: g.background }]} onPress={openSearch}>
              <Text style={styles.groceryEmoji}>{g.emoji}</Text>
              <Text style={styles.groceryTitle}>{g.title}</Text>
            </Pressable>
          ))}
        </ScrollView>
        <View style={{ height: 20 }} />
        <ProductRow data={byTag('grocery')} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { alignItems: 'center', paddingTop: 8, paddingBottom: 16 },
  logo: { fontSize: 30 },
  location: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  locationText: { fontSize: 18, fontWeight: '600', color: '#4C4F4D' },
  padded: { paddingHorizontal: 25 },
  banner: {
    marginTop: 20,
    height: 115,
    borderRadius: radius.md,
    backgroundColor: '#F2F9F4',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    gap: 12,
    overflow: 'hidden',
  },
  bannerEmoji: { fontSize: 40 },
  bannerTitle: { fontSize: 22, fontWeight: '700', color: colors.text },
  bannerSubtitle: { fontSize: 14, color: colors.primary, marginTop: 4, fontWeight: '500' },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 4, marginTop: 10 },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: colors.border },
  dotActive: { width: 16, backgroundColor: colors.primary },
  row: { paddingHorizontal: 25 },
  groceryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    width: 248,
    height: 105,
    borderRadius: radius.lg,
    paddingHorizontal: 18,
    marginRight: 15,
  },
  groceryEmoji: { fontSize: 50 },
  groceryTitle: { fontSize: 20, fontWeight: '600', color: '#3E423F' },
});
