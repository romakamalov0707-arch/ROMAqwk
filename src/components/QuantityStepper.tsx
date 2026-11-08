import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface Props {
  value: number;
  onChange: (value: number) => void;
  min?: number;
}

export function QuantityStepper({ value, onChange, min = 1 }: Props) {
  return (
    <View style={styles.row}>
      <Pressable onPress={() => onChange(Math.max(min, value - 1))} hitSlop={8} accessibilityLabel="Decrease">
        <Ionicons name="remove" size={26} color={value > min ? colors.text : colors.border} />
      </Pressable>
      <View style={styles.box}>
        <Text style={styles.value}>{value}</Text>
      </View>
      <Pressable onPress={() => onChange(value + 1)} hitSlop={8} accessibilityLabel="Increase">
        <Ionicons name="add" size={26} color={colors.primary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  box: {
    width: 46,
    height: 46,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: { fontSize: 18, fontWeight: '700', color: colors.text },
});
