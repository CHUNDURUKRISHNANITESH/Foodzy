import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Restaurants from '../components/Restaurants';
import { ImageSourcePropType } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { RootStackParamList } from '../navigation/types';
import { FoodItem, pizzaData, sandwichData, burgerData } from '../items/foodItem';
import { useCart } from '../context/Cart';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ViewCart from '../components/ViewCart';

const { width, height } = Dimensions.get('window');
//adb shell input keyevent 82
type PopularBurgerRouteProp = RouteProp<
  RootStackParamList,
  'popularBurgers'
>;

//4284

const PopularBurgers = () => {
  const route = useRoute<PopularBurgerRouteProp>();
  const displayData = route.params?.displayData ?? burgerData;
  const title = route.params?.title ?? 'BURGER';
  const navigation = useNavigation<any>();
  const [selectedCategory, setSelectedCategory] =
    useState(title);

  const [displayDataScreen, setDisplayDataScreen] =
    useState(displayData);

  const [filterVisible, setFilterVisible] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCategory = (category: string) => {

    setSelectedCategory(category);

    setShowDropdown(false);

    if (category === 'BURGER') {
      console.log(burgerData)
      setDisplayDataScreen(burgerData);
    }

    else if (category === 'PIZZA') {
      console.log(pizzaData)
      setDisplayDataScreen(pizzaData);
    }

    else if (category === 'SANDWICH') {
      console.log(sandwichData)
      setDisplayDataScreen(sandwichData);
    }
  };
  const renderFoodItem = ({ item }: {
    item: FoodItem;
  }) => {
    return (
      <TouchableOpacity style={styles.card}>
        <Image
          source={item.image}
          style={styles.burgerImage}
          resizeMode="contain"
        />

        <Text style={styles.burgerName}>{item.name}</Text>

        <Text style={styles.restaurantName}>
          {item.restaurant}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>${item.price}</Text>

          <TouchableOpacity onPress={() => navigation.navigate('foodDetails', { burgerData: item })}>
            <AntDesign name="pluscircle" color="#FF7A00" size={38} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}>

        <View style={styles.headerContainer}>

          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Search')}>
            <Image source={require('../assets/backArrow.png')}></Image>
          </TouchableOpacity>

          <View>

            <TouchableOpacity
              style={styles.categoryButton}

              activeOpacity={0.8}

              onPress={() =>
                setShowDropdown(!showDropdown)
              }>

              <Text style={styles.categoryText}>
                {selectedCategory}
              </Text>

              <Image
                source={require('../assets/PolygonTriangle.png')}
              />

            </TouchableOpacity>

            {
              showDropdown && (

                <View style={styles.dropdownMenu}>

                  <TouchableOpacity
                    style={styles.dropdownItem}

                    onPress={() =>
                      handleCategory('BURGER')
                    }>

                    <Text style={styles.dropdownText}>
                      Burger
                    </Text>

                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.dropdownItem}

                    onPress={() =>
                      handleCategory('SANDWICH')
                    }>

                    <Text style={styles.dropdownText}>
                      Sandwich
                    </Text>

                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.dropdownItem}

                    onPress={() =>
                      handleCategory('PIZZA')
                    }>

                    <Text style={styles.dropdownText}>
                      Pizza
                    </Text>

                  </TouchableOpacity>

                </View>
              )
            }

          </View>

          <View style={styles.rightIcons}>

            <TouchableOpacity>
              <Ionicons name="search-circle" color="#000" size={65} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => setFilterVisible(true)}
            >
              <Image source={require('../assets/filter.png')} />
            </TouchableOpacity>

          </View>
        </View>

        <Text style={styles.sectionTitle}>Popular {selectedCategory + 's'}</Text>

        <FlatList scrollEnabled={false} data={displayDataScreen} renderItem={renderFoodItem} numColumns={2} keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 17, paddingRight: 17, }} columnWrapperStyle={{
            justifyContent: 'space-around', marginBottom: 10,
          }} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Open Restaurants
          </Text>
        </View>
        <Restaurants />

      </ScrollView>

      <ViewCart previousScreen="popularBurgers" />

      <Modal
        isVisible={filterVisible}
        backdropOpacity={0.6}
        animationIn="fadeIn"
        animationOut="fadeOut"
        useNativeDriver
        onBackdropPress={() => setFilterVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>

            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Filter your search
              </Text>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setFilterVisible(false)}
              >
                <Ionicons
                  name="close"
                  size={24}
                  color="#555"
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitleName}>OFFERS</Text>

            <View style={styles.chipRow}>
              <TouchableOpacity style={styles.chip}>
                <Text>Delivery</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.chip}>
                <Text>Pick Up</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.chip}>
                <Text>Offer</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.largeChip}>
              <Text>Online payment available</Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitleName}>
              DELIVER TIME
            </Text>

            <View style={styles.chipRow}>
              <TouchableOpacity style={styles.activeChip}>
                <Text style={styles.activeText}>
                  10-15 min
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.chip}>
                <Text>20 min</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.chip}>
                <Text>30 min</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitleName}>
              PRICING
            </Text>

            <View style={styles.chipRow}>
              <TouchableOpacity style={styles.circleChip}>
                <Text>$</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.activeCircleChip}>
                <Text style={styles.activeText}>$$</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.circleChip}>
                <Text>$$$</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitleName}>
              RATING
            </Text>

            <View style={styles.chipRow}>
              {[1, 2, 3, 4, 5].map(item => (
                <TouchableOpacity
                  key={item}
                  style={styles.circleChip}
                >
                  <Ionicons
                    name="star"
                    size={20}
                    color={
                      item <= 4 ? '#FF8C00' : '#D9D9D9'
                    }
                  />
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.filterModalButton}
            >
              <Text style={styles.filterButtonText}>
                FILTER
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

export default PopularBurgers;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    width: '88%',
    backgroundColor: '#FFF',
    borderRadius: 24,
    paddingHorizontal: 10,
    paddingVertical: 5
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  modalTitle: {
    fontSize: 24,
    color: '#181C2E',
    fontFamily: 'Sen-Bold',
  },

  closeButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#F2F4F7',
    justifyContent: 'center',
    alignItems: 'center',
  },

  sectionTitleName: {
    marginTop: 25,
    marginBottom: 15,
    color: '#6B7280',
    fontSize: 14,
    fontFamily: 'Sen-Bold',
  },

  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },

  chip: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 25,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginRight: 10,
    marginBottom: 10,
  },

  activeChip: {
    backgroundColor: '#FF8A00',
    borderRadius: 25,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginRight: 10,
  },

  activeText: {
    color: '#FFF',
    fontFamily: 'Sen-Bold',
  },

  largeChip: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 25,
    paddingHorizontal: 18,
    paddingVertical: 12,
    alignSelf: 'flex-start',
  },

  circleChip: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  activeCircleChip: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FF8A00',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  filterModalButton: {
    backgroundColor: '#FF8A00',
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
  },

  filterButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Sen-Bold',
  },

  dropdownMenu: {
    position: 'absolute',
    top: 60,
    width: 140,
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingVertical: 10,
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },

  dropdownText: {
    fontSize: 16,
    color: '#1E1E2E',
    fontFamily: 'Sen-Medium',
  },
  sectionHeader: {
    paddingHorizontal: width * 0.06,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  deliveryText: {
    marginLeft: width * 0.015,
    fontSize: width * 0.04,
    color: '#1E1E2E',
    fontFamily: 'Sen-Medium',
  },
  restaurantCategory: {
    marginTop: height * 0.01,
    fontFamily: 'Sen-Medium',
    color: '#A0A5BA',
    fontSize: width * 0.038,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: '15%'
  },

  scrollContainer: {
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.03,
    paddingBottom: 40,
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: '6%'
  },

  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ECECEC',
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconText: {
    fontSize: 22,
    color: '#222',
    fontFamily: 'sen-bold',
  },

  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    marginLeft: '6%',
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },

  categoryText: {
    fontSize: 14,
    fontFamily: 'Sen-Bold',
    color: '#2C2C2C',
    marginRight: 8,
  },

  dropdown: {
    fontSize: 10,
    color: '#F58D1D',
  },

  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '8%'
  },

  searchButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#0E1238',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  searchIcon: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
  },

  filterButton: {
    width: 54,
    height: 54,
    borderRadius: 26,
    backgroundColor: '#ECF0F4',
    justifyContent: 'center',
    alignItems: 'center',
  },

  filterIcon: {
    fontSize: 18,
    color: '#222',
  },

  sectionTitle: {
    fontSize: 24,
    fontFamily: 'Sen-Regular',
    color: '#2C2C2C',
    marginBottom: 25,
    marginLeft: '4%'
  },

  cardWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  card: {
    width: width * 0.41,
    backgroundColor: '#FFF',
    borderRadius: 28,
    paddingHorizontal: 15,
    paddingTop: 45,
    paddingBottom: 18,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 0.5,
  },

  burgerImage: {
    width: 130,
    height: 100,
    position: 'absolute',
    alignSelf: 'center',
    marginTop: '10%',
  },

  burgerName: {
    fontSize: 16,
    fontFamily: 'Sen-Bold',
    color: '#2B2B2B',
    marginTop: 70,
  },

  restaurantName: {
    fontSize: 14,
    color: '#646982',
    marginTop: 6,
    marginBottom: 14,
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  price: {
    fontSize: 24,
    fontFamily: 'Sen-Bold',
    color: '#1F1F1F',
  },

  addButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F58D1D',
    justifyContent: 'center',
    alignItems: 'center',
  },

  addText: {
    color: '#FFF',
    fontSize: 35,
    marginTop: -5,
  },

  restaurantCard: {
    width: '100%',
    height: 170,
    borderRadius: 28,
    overflow: 'hidden',
    marginBottom: 20,
  },

  restaurantImage: {
    width: '100%',
    height: '100%',
  },

  restaurantTitle: {
    fontSize: 28,
    fontFamily: 'Sen-Bold',
    color: '#2B2B2B',
    marginBottom: 14,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },

  infoText: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Sen-Medium',
  },
});