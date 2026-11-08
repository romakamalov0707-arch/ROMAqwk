import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { categories } from '../data/products';
import { SearchBar } from '../components/SearchBar';
import { ScreenHeader } from '../components/ScreenHeader';
import { colors, radius } from '../theme/colors';
import type { ExploreStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<ExploreStackParamList, 'Explore'>;

export default function ExploreScreen({ navigation }: Props) {
  const { width } = useWindowDimensions();
  const cardWidth = (width - 25 * 2 - 15) / 2;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="Find Products" />
      <FlatList
        data={categories}
        keyExtractor={(c) => c.id}
        numColumns={2}
        ListHeaderComponent={
          <SearchBar onPressBar={() => navigation.navigate('Search')} style={{ marginBottom: 20 }} />
        }
        contentContainerStyle={styles.list}
        columnWrapperStyle={{ gap: 15 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              styles.card,
              { width: cardWidth, backgroundColor: item.background, borderColor: item.border },
              pressed && { opacity: 0.8 },
            ]}
            onPress={() =>
              navigation.navigate('Category', { categoryId: item.id, title: item.title.replace('\n', ' ') })
            }
          >
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={styles.title}>{item.title}</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  list: { paddingHorizontal: 25, paddingBottom: 24, gap: 15 },
  card: {
    height: 190,
    borderWidth: 1,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  emoji: { fontSize: 64, marginBottom: 20 },
  title: { fontSize: 16, fontWeight: '700', color: colors.text, textAlign: 'center', lineHeight: 22 },
});
