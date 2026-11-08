import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { getProduct, Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface StoreValue {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  favourites: string[];
  addToCart: (productId: string, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  toggleFavourite: (productId: string) => void;
  isFavourite: (productId: string) => boolean;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [favourites, setFavourites] = useState<string[]>([]);

  const addToCart = useCallback((productId: string, quantity = 1) => {
    setQuantities((prev) => ({ ...prev, [productId]: (prev[productId] ?? 0) + quantity }));
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setQuantities((prev) => {
      const next = { ...prev };
      if (quantity <= 0) delete next[productId];
      else next[productId] = quantity;
      return next;
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => setQuantity(productId, 0), [setQuantity]);
  const clearCart = useCallback(() => setQuantities({}), []);

  const toggleFavourite = useCallback((productId: string) => {
    setFavourites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    );
  }, []);

  const value = useMemo<StoreValue>(() => {
    const cart: CartItem[] = Object.entries(quantities)
      .map(([id, quantity]) => ({ product: getProduct(id)!, quantity }))
      .filter((item) => item.product);
    return {
      cart,
      cartCount: cart.reduce((sum, i) => sum + i.quantity, 0),
      cartTotal: cart.reduce((sum, i) => sum + i.quantity * i.product.price, 0),
      favourites,
      addToCart,
      setQuantity,
      removeFromCart,
      clearCart,
      toggleFavourite,
      isFavourite: (id: string) => favourites.includes(id),
    };
  }, [quantities, favourites, addToCart, setQuantity, removeFromCart, clearCart, toggleFavourite]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>');
  return ctx;
}
