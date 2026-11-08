import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StoreProvider } from './src/context/StoreContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <StoreProvider>
        <AppNavigator />
        <StatusBar style="dark" />
      </StoreProvider>
    </SafeAreaProvider>
  );
}
