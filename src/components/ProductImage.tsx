import React from 'react';
import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native';
import type { Product } from '../data/products';

interface Props {
  product: Pick<Product, 'emoji' | 'image'>;
  size: number;
  style?: ViewStyle;
}

/** Shows the product photo if `image` is set, otherwise a large emoji. */
export function ProductImage({ product, size, style }: Props) {
  return (
    <View style={[styles.wrap, { height: size }, style]}>
      {product.image ? (
        <Image source={{ uri: product.image }} style={{ width: size, height: size }} resizeMode="contain" />
      ) : (
        <Text style={{ fontSize: size * 0.72, lineHeight: size }}>{product.emoji}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center' },
});
