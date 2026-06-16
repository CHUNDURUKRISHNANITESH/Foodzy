import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { FoodItem } from '../items/foodItem';
import { RestaurantItem } from '../components/Restaurants';

export type RootStackParamList = {
  Logo: undefined;
  Favorites: undefined;
  Chef: undefined;
  Delivery: undefined;
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  Verification: undefined
  LocationAccess: undefined
  Home: undefined
  Search: undefined
  cart: undefined;
  // payment: {
  //   totalPrice: number;
  //   savedCards?: {
  //     cardHolder: string;
  //     cardNumber: string;
  //     expiry: string;
  //     cvc: string;
  //   }[];
  //   selectedMethod?: string;
  // }

  payment: {
    totalPrice: number;
    savedCards?: {
      cardHolder: string;
      cardNumber: string;
      expiry: string;
      cvc: string;
      cardType: string;
    }[];
    selectedMethod?: string;
  }
  addCard: {
    totalPrice: number;
    existingCards?: any[];
    selectedMethod?: string;
  };
  makePayment: undefined
  popularBurgers: {
    displayData: FoodItem[];
    title: string;
    cartCount?: number;
    cartItem?: FoodItem;
  };
  foodDetails: {
    burgerData: FoodItem
  }
  restaurantScreen: {
    restaurantScreen: RestaurantItem;
  };
  paySuccess: undefined
  // trackOrder: {
  //   restaurant: RestaurantItem;
  // };
  trackOrder: {
    userLocation: {
      latitude: number;
      longitude: number;
    };
  };

};

export type ScreenNavigationProp<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;

export type ScreenRouteProp<T extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, T>;

export type ScreenProps<T extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};
