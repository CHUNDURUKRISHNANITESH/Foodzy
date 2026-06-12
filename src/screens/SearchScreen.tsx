import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Image, ScrollView, Dimensions, Alert, } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { burgerData, pizzaData, sandwichData } from '../items/foodItem';
import ViewCart from '../components/ViewCart';
import { useCart } from '../context/Cart';

const { width, height } = Dimensions.get('window');

const keywords = ['Burger', 'Sandwich', 'Pizza'];
//adb shell input keyevent 82
const restaurants = [
  {
    id: '1',
    name: 'Pansi Restaurant',
    rating: '4.7',
    image: require('../assets/restaurantPic.webp'),
  },
  {
    id: '2',
    name: 'American Spicy Burger Shop',
    rating: '4.3',
    image: require('../assets/burger_shop.jpg'),
  },
  {
    id: '3',
    name: 'Cafenio Coffee Club',
    rating: '4.0',
    image: require('../assets/coffee_club.webp'),
  },
];

const fastFoods = [
  {
    id: '1',
    title: 'European Pizza',
    subtitle: 'Uttora Coffe House',
    image: require('../assets/pizzaEurope.jpg'),
  },
  {
    id: '2',
    title: 'Buffalo Pizza.',
    subtitle: 'Cafenio Coffee Club',
    image: require('../assets/pizza.jpg'),
  },
];

const SearchScreen = () => {
  const navigation = useNavigation<any>();
    const { totalItems } = useCart();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: height * 0.04 }}>

        <View style={styles.headerContainer}>
          <View style={styles.search}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
              <Icon name="chevron-back" size={24} color="#181C2E" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Search</Text>
          </View>

          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => navigation.navigate('cart')}
          >
            <Image
              source={require('../assets/bagIcon.png')}
              style={styles.bag}
            />

            {totalItems > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {totalItems}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Icon name="search-outline" size={22} color="#A0A5BA" />

          <TextInput
            placeholder="Pizza"
            placeholderTextColor="#676767"
            style={styles.input}
          />

          <TouchableOpacity>
            <Icon name="close-circle" size={22} color="#C7C7C7" />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Recent Keywords</Text>

        <FlatList
          scrollEnabled={false}
          horizontal
          data={keywords}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: height * 0.01,
          }}
          renderItem={({ item }) => {
            const filteredData =
              item === 'Burger'
                ? burgerData
                : item === 'Pizza'
                  ? pizzaData
                  : item === 'Sandwich'
                    ? sandwichData
                    : [];
            return (
              <TouchableOpacity style={styles.keywordButton} onPress={() => {
                navigation.navigate('popularBurgers', {
                  displayData: filteredData,
                  title: item,
                }
                )
              }}>
                <Text style={styles.keywordText}>{item}</Text>
              </TouchableOpacity>
            )
          }}
        />

        <Text style={styles.sectionTitle}>Suggested Restaurants</Text>

        {restaurants.map(item => (
          <TouchableOpacity key={item.id} style={styles.restaurantContainer}>
            <Image
              source={item.image}
              style={styles.restaurantImage}
            />

            <View style={styles.restaurantInfo}>
              <Text style={styles.restaurantName}>{item.name}</Text>

              <View style={styles.ratingRow}>
                <Image source={require('../assets/Star.png')}></Image>

                <Text style={styles.ratingText}>{item.rating}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionTitle}>Popular Fast Food</Text>

        <FlatList
          scrollEnabled={false}
          horizontal
          data={fastFoods}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.foodCard}>
              <Image
                source={item.image}
                style={styles.foodImage}
              />

              <Text style={styles.foodTitle}>{item.title}</Text>

              <Text style={styles.foodSubtitle}>
                {item.subtitle}
              </Text>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
      
      <ViewCart previousScreen="Search" />
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  bag: {
    height: '47%',
    width: '42.5%'
  },
  search: {
    gap: '10%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: width * 0.05,
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.02,
    gap: '40%',
  },

  backButton: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: width * 0.06,
    backgroundColor: '#ECECEC',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: width * 0.055,
    fontFamily: 'Sen-Medium',
    color: '#181C2E',
  },

  cartButton: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: width * 0.06,
    backgroundColor: '#181C2E',
    justifyContent: 'center',
    alignItems: 'center',
  },

  badge: {
    position: 'absolute',
    top: -3,
    right: -2,
    backgroundColor: '#FF7622',
    width: width * 0.06,
    height: width * 0.06,
    borderRadius: width * 0.028,
    justifyContent: 'center',
    alignItems: 'center',
  },

  badgeText: {
    color: '#fff',
    fontSize: width * 0.028,
    fontFamily: 'Sen-Bold',
  },

  searchContainer: {
    marginTop: height * 0.03,
    backgroundColor: '#ECECEC',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.04,
    height: height * 0.07,
  },

  input: {
    flex: 1,
    marginLeft: width * 0.03,
    color: '#181C2E',
    fontFamily: 'Sen-Regular',
    fontSize: width * 0.04,
  },

  sectionTitle: {
    marginTop: height * 0.03,
    fontSize: width * 0.055,
    fontFamily: 'Sen-Medium',
    color: '#32343E',
  },

  keywordButton: {
    borderWidth: 1,
    borderColor: '#EDEDED',
    borderRadius: 30,
    paddingHorizontal: width * 0.06,
    paddingVertical: height * 0.012,
    marginRight: width * 0.03,
    backgroundColor: '#fff',
  },

  keywordText: {
    color: '#32343E',
    fontSize: width * 0.04,
    fontFamily: 'Sen-Medium',
  },

  restaurantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.025,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    paddingBottom: height * 0.02,
  },

  restaurantImage: {
    width: width * 0.16,
    height: width * 0.16,
    borderRadius: 12,
  },

  restaurantInfo: {
    marginLeft: width * 0.04,
    flex: 1,
  },

  restaurantName: {
    fontSize: width * 0.045,
    fontFamily: 'Sen-Medium',
    color: '#32343E',
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.008,
  },

  ratingText: {
    marginLeft: width * 0.015,
    color: '#32343E',
    fontSize: width * 0.04,
    fontFamily: 'Sen-Medium',
  },

  foodCard: {
    width: width * 0.4,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginRight: width * 0.04,
    marginTop: height * 0.025,
    padding: width * 0.04,
    alignItems: 'center'
  },

  foodImage: {
    width: width * 0.28,
    height: width * 0.28,
    borderRadius: width * 0.14,
    resizeMode: 'cover',
  },

  foodTitle: {
    marginTop: height * 0.015,
    fontSize: width * 0.045,
    fontFamily: 'Sen-Medium',
    color: '#32343E',
    textAlign: 'center',
  },

  foodSubtitle: {
    marginTop: height * 0.005,
    fontSize: width * 0.035,
    color: '#646982',
    textAlign: 'center',
  },
});