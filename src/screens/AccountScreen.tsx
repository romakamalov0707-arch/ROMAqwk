import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const items: Array<{ icon: keyof typeof Ionicons.glyphMap; title: string }> = [
  { icon: 'bag-handle-outline', title: 'Orders' },
  { icon: 'card-outline', title: 'My Details' },
  { icon: 'location-outline', title: 'Delivery Address' },
  { icon: 'wallet-outline', title: 'Payment Methods' },
  { icon: 'pricetag-outline', title: 'Promo Code' },
  { icon: 'notifications-outline', title: 'Notifications' },
  { icon: 'help-circle-outline', title: 'Help' },
  { icon: 'information-circle-outline', title: 'About' },
];

export default function AccountScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView>
        <View style={styles.profile}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={32} color="#fff" />
          </View>
          <View>
            <Text style={styles.name}>Guest User</Text>
            <Text style={styles.email}>guest@example.com</Text>
          </View>
        </View>
        {items.map((item) => (
          <View key={item.title} style={styles.row}>
            <Ionicons name={item.icon} size={22} color={colors.text} />
            <Text style={styles.rowText}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.text} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    padding: 25,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 27,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { fontSize: 20, fontWeight: '700', color: colors.text },
  email: { fontSize: 16, color: colors.textMuted, marginTop: 4 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 25,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  rowText: { flex: 1, fontSize: 18, fontWeight: '600', color: colors.text },
});
