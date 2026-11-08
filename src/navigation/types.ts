import type { NavigatorScreenParams } from '@react-navigation/native';
import type { CategoryId } from '../data/products';

export type ExploreStackParamList = {
  Explore: undefined;
  Category: { categoryId: CategoryId; title: string };
  Search: { query?: string } | undefined;
};

export type TabParamList = {
  Shop: undefined;
  ExploreTab: NavigatorScreenParams<ExploreStackParamList>;
  Cart: undefined;
  Favourite: undefined;
  Account: undefined;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList>;
  ProductDetail: { productId: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
