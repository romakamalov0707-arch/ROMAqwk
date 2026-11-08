import React from 'react';
import { Pressable, StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../theme/colors';

interface Props extends TextInputProps {
  /** When set, the bar acts as a button (used on Home / Explore to open Search). */
  onPressBar?: () => void;
  onClear?: () => void;
}

export function SearchBar({ onPressBar, onClear, value, style, ...rest }: Props) {
  const content = (
    <View style={[styles.bar, style]}>
      <Ionicons name="search" size={20} color={colors.text} />
      <TextInput
        placeholder="Search Store"
        placeholderTextColor={colors.textMuted}
        style={styles.input}
        value={value}
        editable={!onPressBar}
        pointerEvents={onPressBar ? 'none' : 'auto'}
        returnKeyType="search"
        {...rest}
      />
      {!!value && onClear && (
        <Pressable onPress={onClear} hitSlop={10} accessibilityLabel="Clear search">
          <Ionicons name="close-circle" size={20} color={colors.textMuted} />
        </Pressable>
      )}
    </View>
  );
  return onPressBar ? <Pressable onPress={onPressBar}>{content}</Pressable> : content;
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: 16,
    height: 52,
  },
  input: { flex: 1, fontSize: 14, fontWeight: '600', color: colors.text, height: '100%' },
});
