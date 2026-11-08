import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface Props {
  title: string;
  onBack?: () => void;
  right?: React.ReactNode;
}

export function ScreenHeader({ title, onBack, right }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.side}>
        {onBack && (
          <Pressable onPress={onBack} hitSlop={10} accessibilityLabel="Back">
            <Ionicons name="chevron-back" size={26} color={colors.text} />
          </Pressable>
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={[styles.side, { alignItems: 'flex-end' }]}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 56,
  },
  side: { width: 40 },
  title: { flex: 1, textAlign: 'center', fontSize: 20, fontWeight: '700', color: colors.text },
});
