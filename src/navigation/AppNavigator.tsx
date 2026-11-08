import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../context/StoreContext';
import { colors } from '../theme/colors';
import type { ExploreStackParamList, RootStackParamList, TabParamList } from './types';

import HomeScreen from '../screens/HomeScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ExploreScreen from '../screens/ExploreScreen';
import CategoryScreen from '../screens/CategoryScreen';
import SearchScreen from '../screens/SearchScreen';
import CartScreen from '../screens/CartScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import AccountScreen from '../screens/AccountScreen';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();
const ExploreStack = createNativeStackNavigator<ExploreStackParamList>();

function ExploreNavigator() {
  return (
    <ExploreStack.Navigator screenOptions={{ headerShown: false }}>
      <ExploreStack.Screen name="Explore" component={ExploreScreen} />
      <ExploreStack.Screen name="Category" component={CategoryScreen} />
      <ExploreStack.Screen name="Search" component={SearchScreen} />
    </ExploreStack.Navigator>
  );
}

const tabIcons: Record<keyof TabParamList, keyof typeof Ionicons.glyphMap> = {
  Shop: 'storefront-outline',
  ExploreTab: 'search-outline',
  Cart: 'cart-outline',
  Favourite: 'heart-outline',
  Account: 'person-outline',
};

function Tabs() {
  const { cartCount } = useStore();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        tabBarStyle: {
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          height: 80,
          paddingTop: 8,
          backgroundColor: colors.background,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 12,
        },
        tabBarIcon: ({ color, size }) => <Ionicons name={tabIcons[route.name]} size={size} color={color} />,
      })}
    >
      <Tab.Screen name="Shop" component={HomeScreen} />
      <Tab.Screen name="ExploreTab" component={ExploreNavigator} options={{ title: 'Explore' }} />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{ tabBarBadge: cartCount > 0 ? cartCount : undefined }}
      />
      <Tab.Screen name="Favourite" component={FavouriteScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Tabs" component={Tabs} />
        <RootStack.Screen name="ProductDetail" component={ProductDetailScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
