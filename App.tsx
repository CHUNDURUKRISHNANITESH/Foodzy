import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogoScreen from './src/screens/LogoScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import ChefScreen from './src/screens/ChefScreen';
import DeliveryScreen from './src/screens/DeliveryScreen';
import LoginScreen from './src/screens/LoginScreen';
import { RootStackParamList } from './src/navigation/types';
import SignupScreen from './src/screens/SignupScreen';
import VerificationScreen from './src/screens/VerificationScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import LocationAccessScreen from './src/screens/LocationAccessScreen';
import HomeScreen from './src/screens/HomeScreen';
import Toast, { BaseToast, ToastProps } from 'react-native-toast-message';
import SearchScreen from './src/screens/SearchScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PopularBurgers from './src/screens/PopularBurgers';
import FoodDetailsScreen from './src/screens/FoodDetailsScreen';
import RestaurantScreen from './src/screens/RestaurantScreen';
import { CartProvider } from './src/context/Cart';
import CartScreen from './src/screens/CartScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import AddCardScreen from './src/screens/AddCardScreen';
import PaymentSuccessScreen from './src/screens/PaymentSuccessScreen';
import TrackOrderScreen from './src/screens/TrackOrderScreen';
import { RestaurantProvider } from './src/context/RestaurantContext';
import { LocationProvider } from './src/context/LocationContext';
import { OrderProvider } from './src/context/OrderContext';

const Stack = createNativeStackNavigator<RootStackParamList>();


const toastConfig = {
  error: (props: ToastProps) => (
    <BaseToast
      {...props}
      style={{ backgroundColor: 'red', borderLeftColor: 'red' }}
      text1Style={{ color: 'white', fontSize: 16 }}
      text2Style={{ color: 'white', fontSize: 14 }}
    />
  ),
  success: (props: ToastProps) => (
    <BaseToast
      {...props}
      style={{ backgroundColor: 'green', borderLeftColor: 'green' }}
      text1Style={{ color: 'white', fontSize: 16 }}
      text2Style={{ color: 'white', fontSize: 14 }}
    />
  ),
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <OrderProvider>
        <LocationProvider>
          <RestaurantProvider>
            <CartProvider>
              <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="Logo" component={LogoScreen} />
                  <Stack.Screen name="Favorites" component={FavoritesScreen} />
                  <Stack.Screen name="Chef" component={ChefScreen} />
                  <Stack.Screen name="Delivery" component={DeliveryScreen} />
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="Signup" component={SignupScreen} />
                  <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                  <Stack.Screen name="Verification" component={VerificationScreen} />
                  <Stack.Screen name="LocationAccess" component={LocationAccessScreen} />
                  <Stack.Screen name="Home" component={HomeScreen} />
                  <Stack.Screen name="Search" component={SearchScreen} />
                  <Stack.Screen name="popularBurgers" component={PopularBurgers} />
                  <Stack.Screen name="foodDetails" component={FoodDetailsScreen} />
                  <Stack.Screen name="restaurantScreen" component={RestaurantScreen} />
                  <Stack.Screen name="cart" component={CartScreen} />
                  <Stack.Screen name="payment" component={PaymentScreen} />
                  <Stack.Screen name="addCard" component={AddCardScreen} />
                  <Stack.Screen name="paySuccess" component={PaymentSuccessScreen} />
                  <Stack.Screen name="trackOrder" component={TrackOrderScreen} />
                </Stack.Navigator>
                <Toast config={toastConfig} />
              </NavigationContainer>
            </CartProvider>
          </RestaurantProvider>
        </LocationProvider>
      </OrderProvider>
    </GestureHandlerRootView>
  );
}


