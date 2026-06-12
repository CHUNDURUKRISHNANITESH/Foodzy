import { ImageSourcePropType } from 'react-native';

export interface FoodItem {
  id: string;
  name: string;
  image: ImageSourcePropType;
  restaurant: string;
  price: string;
}

export const burgerData: FoodItem[] = [
  {
    id: '1',
    name: 'Burger Bistro',
    restaurant: 'Rose Garden',
    price: '40',
    image: require('../assets/burgerFood.png'),
  },
  {
    id: '2',
    name: "Smokin' Burger",
    restaurant: 'Cafenio Restaurant',
    price: '60',
    image: require('../assets/burgerSmokin.png'),
  },
  {
    id: '3',
    name: 'Buffalo Burgers',
    restaurant: 'Kaji Firm Kitchen',
    price: '75',
    image: require('../assets/burgerBuffalo.png'),
  },
  {
    id: '4',
    name: 'Bullseye Burgers',
    restaurant: 'Kabob Restaurant',
    price: '94',
    image: require('../assets/burgerBullseye.png'),
  },
];


export const pizzaData: FoodItem[] = [
  {
    id: '1',
    name: 'Pizza Bistro',
    restaurant: 'Rose Garden',
    price: '50',
    image: require('../assets/pizzaChicken.png'),
  },
  {
    id: '2',
    name: "Smokin' Pizza",
    restaurant: 'Cafenio Restaurant',
    price: '70',
    image: require('../assets/pizzaMushroom.png'),
  },
  {
    id: '3',
    name: 'Buffalo Pizzas',
    restaurant: 'Kaji Firm Kitchen',
    price: '175',
    image: require('../assets/pizzaCorn.png'),
  },
  {
    id: '4',
    name: 'Bullseye Pizzas',
    restaurant: 'Kabob Restaurant',
    price: '200',
    image: require('../assets/pizzaTomato.png'),
  },
  {
    id: '5',
    name: 'Pizza Bistro',
    restaurant: 'Rose Garden',
    price: '50',
    image: require('../assets/pizzaChicken.png'),
  },
  {
    id: '6',
    name: "Smokin' Pizza",
    restaurant: 'Cafenio Restaurant',
    price: '70',
    image: require('../assets/pizzaMushroom.png'),
  },
  {
    id: '7',
    name: 'Buffalo Pizzas',
    restaurant: 'Kaji Firm Kitchen',
    price: '175',
    image: require('../assets/pizzaCorn.png'),
  },
  {
    id: '8',
    name: 'Bullseye Pizzas',
    restaurant: 'Kabob Restaurant',
    price: '200',
    image: require('../assets/pizzaTomato.png'),
  },
];

export const sandwichData: FoodItem[] = [
  {
    id: '1',
    name: "Sandwich' Bistro",
    restaurant: 'Rose Garden',
    price: '80',
    image: require('../assets/sandwichNonVeg.png'),
  },
  {
    id: '2',
    name: "Smokin' Sandwich",
    restaurant: 'Cafenio Restaurant',
    price: '70',
    image: require('../assets/sandwichVeg.png'),
  },
  {
    id: '3',
    name: 'Buffalo Sandwich',
    restaurant: 'Kaji Firm Kitchen',
    price: '55',
    image: require('../assets/sandwichPlate.png'),
  },
  {
    id: '4',
    name: 'Bullseye Sandwich',
    restaurant: 'Kabob Restaurant',
    price: '95',
    image: require('../assets/sandwichPieces.png'),
  },
  {
    
    id: '5',
    name: "Smokin' Sandwich",
    restaurant: 'Cafenio Restaurant',
    price: '70',
    image: require('../assets/sandwichVeg.png'),
  },
  {
    id: '6',
    name: 'Buffalo Sandwich',
    restaurant: 'Kaji Firm Kitchen',
    price: '55',
    image: require('../assets/sandwichPlate.png'),
  },
];
