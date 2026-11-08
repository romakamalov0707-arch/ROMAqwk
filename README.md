# Grocery App — React Native + TypeScript

Мобильное приложение продуктового магазина (Expo SDK 58, React Native 0.88, TypeScript, React Navigation 7).

## Экраны

| Экран | Файл |
|---|---|
| Home Screen | `src/screens/HomeScreen.tsx` |
| Product Detail | `src/screens/ProductDetailScreen.tsx` |
| Explore (Find Products) | `src/screens/ExploreScreen.tsx` |
| Beverages (и любая категория) | `src/screens/CategoryScreen.tsx` |
| Search | `src/screens/SearchScreen.tsx` |
| Cart / Favourite / Account | `src/screens/CartScreen.tsx`, `FavouriteScreen.tsx`, `AccountScreen.tsx` |

Работает: добавление в корзину (бейдж на вкладке Cart), количество, избранное (♡), поиск по названию, сортировка по цене в категории, оформление заказа.

## Запуск

```bash
npm install
npx expo start
```

Затем отсканируйте QR-код приложением **Expo Go** (Android / iOS), или нажмите `a` (Android-эмулятор), `i` (iOS-симулятор), `w` (браузер).

## Структура

```
App.tsx
src/
  components/   ProductCard, SearchBar, ScreenHeader, SectionHeader, QuantityStepper, ProductImage
  context/      StoreContext — корзина и избранное
  data/         products.ts — товары и категории
  navigation/   AppNavigator.tsx, types.ts
  screens/      все экраны
  theme/        colors.ts
```

## Фото товаров

Сейчас вместо фото используются эмодзи (работает без интернета). Чтобы показать настоящее фото,
добавьте товару в `src/data/products.ts` поле `image` с URL:

```ts
{ id: 'apple', name: 'Naturel Red Apple', image: 'https://.../apple.png', ... }
```
