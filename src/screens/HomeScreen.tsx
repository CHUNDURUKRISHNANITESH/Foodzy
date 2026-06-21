import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image, FlatList, Dimensions, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ImageSourcePropType } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native';
import Restaurants from '../components/Restaurants';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ViewCart from '../components/ViewCart';
import { useCart } from '../context/Cart';
import { useOrder } from '../context/OrderContext';

const { width, height } = Dimensions.get('window');
//adb shell input keyevent 82
type CategoryItem = {
  id: string;
  name: string;
  icon?: string;
  image?: string;
  active?: boolean;
};

type FoodCardItem = {
  id: string;
  image: string,
  name: string;
  startingPrice: string,
  value: string
}

const categories = [
  {
    id: '1',
    name: 'All',
    image: 'https://res.cloudinary.com/diazmm0lw/image/upload/v1781847268/hot-icon_fbbdoz.webp',
    active: true,
  },
  {
    id: '2',
    name: 'Hot Dog',
    image: 'https://res.cloudinary.com/diazmm0lw/image/upload/v1781847267/hot_dog_peyahl.png',
  },
  {
    id: '3',
    name: 'Burger',
    image: 'https://res.cloudinary.com/diazmm0lw/image/upload/v1781847263/burger_thjpa8.jpg',
  },
];

const foodCard = [
  {
    id: '1',
    image: 'https://res.cloudinary.com/diazmm0lw/image/upload/v1781847273/pizzaImage_ebuyga.avif',
    name: 'Pizza',
    startingPrice: 'Starting',
    value: '$70'
  },
  {
    id: '2',
    image: 'https://res.cloudinary.com/diazmm0lw/image/upload/v1781847262/burger_y5pudi.webp',
    name: 'Burger',
    startingPrice: 'Starting',
    value: '$50'
  },
  {
    id: '3',
    image: 'https://res.cloudinary.com/diazmm0lw/image/upload/v1781847284/pizzaPic_t1dz7u.jpg',
    name: 'Pizza',
    startingPrice: 'Starting',
    value: '$60'
  }
]

const HomeScreen = () => {
  const [showOfferPopup, setShowOfferPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
  const navigation = useNavigation<any>();
  const { totalItems } = useCart();
  const { orderPlaced } = useOrder();

  useEffect(() => {
    const checkOffer = async () => {
      const value = await AsyncStorage.getItem('offerShownAfterLogin');

      console.log("offer flag:", value);

      if (value === 'false' || value === null) {
        setShowOfferPopup(true);
      } else {
        setShowOfferPopup(false);
      }
    };

    checkOffer();
  }, []);

  const closePopup = async () => {
    setShowOfferPopup(false);
    await AsyncStorage.setItem('offerShownAfterLogin', 'shown');
  };

  const renderCategory = ({ item }: {
    item: CategoryItem;
  }) => {
    const isActive = selectedCategory === item.name;
    return (
      <TouchableOpacity activeOpacity={0.9} style={[styles.categoryCard, isActive && styles.activeCategoryCard,]} onPress={() =>
        setSelectedCategory(item.name)
      }>
        {item.icon ? (
          <View style={[styles.fireContainer, isActive &&
            styles.activeFireContainer]}>
            <FontAwesome5 name={item.icon} size={22} color="#FF7A00" />
          </View>
        ) : (<Image source={{ uri: item.image }} style={styles.categoryImage} />)}

        <Text style={styles.categoryText}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderFoodCard = ({ item }: {
    item: FoodCardItem;
  }) => {
    return (
      <TouchableOpacity activeOpacity={0.9} style={styles.foodContainer}>
        <Image source={{ uri: item.image }} style={styles.foodImage}></Image>
        <Text style={styles.foodName}>{item.name}</Text>
        <View style={styles.foodPrice}>
          <Text style={styles.startingText}>{item.startingPrice}</Text>
          <Text style={styles.priceValue}>{item.value}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40, }}>

        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.menuButton} activeOpacity={0.9}>
            <Image style={styles.menu} source={{ uri: 'https://res.cloudinary.com/diazmm0lw/image/upload/v1781847268/Menu_zmxs9h.png' }}></Image>
          </TouchableOpacity>

          <View style={styles.locationContainer}>
            <Text style={styles.deliverText}>
              DELIVER TO
            </Text>

            <View style={styles.locationRow}>
              <Text style={styles.locationText}>
                Halal Lab office
              </Text>

              <Icon name="caret-down" size={width * 0.05} color="#1E1E2E"></Icon>
            </View>
          </View>

          <TouchableOpacity
            style={styles.cartButton}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('cart')}
          >
            <Image
              source={{ uri: 'https://res.cloudinary.com/diazmm0lw/image/upload/v1781847261/bagIcon_qdmcjl.png' }}
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

        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>
            Hey Halal,{' '}
            <Text style={styles.boldText}>
              Good Afternoon!
            </Text>
          </Text>
        </View>

        <TouchableOpacity style={styles.searchContainer} activeOpacity={0.9}
          onPress={() => navigation.navigate('Search')}>
          <Icon name="search-outline" size={24} color="#A0A5BA" />
          <Text style={styles.searchInput} >Search dishes, restaurants</Text>
        </TouchableOpacity>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            All Categories
          </Text>

          <TouchableOpacity style={styles.seeAllRow} activeOpacity={0.9}>
            <Text style={styles.seeAllText}>
              See All
            </Text>

            <MaterialIcons name="keyboard-arrow-right" size={22} color="#7C7C8A" />
          </TouchableOpacity>
        </View>

        <FlatList scrollEnabled={true} horizontal data={categories} renderItem={renderCategory} keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 24, paddingRight: 10, }} />

        <FlatList scrollEnabled={true} horizontal data={foodCard} renderItem={renderFoodCard} keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 24, paddingRight: 10, }} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Open Restaurants
          </Text>

          <TouchableOpacity style={styles.seeAllRow} activeOpacity={0.9}>
            <Text style={styles.seeAllText}>
              See All
            </Text>

            <MaterialIcons name="keyboard-arrow-right" size={22} color="#7C7C8A" />
          </TouchableOpacity>
        </View>
        <Restaurants />
      </ScrollView>

      {orderPlaced ? (
        <TouchableOpacity
          style={styles.trackOrderButton}
          onPress={() => navigation.navigate('trackOrder')}
          activeOpacity={0.9}
        >
          <Text style={styles.trackOrderText}>
            TRACK ORDER
          </Text>
        </TouchableOpacity>
      ) : (
        <ViewCart previousScreen="Home" />
      )}

      <Modal
        isVisible={showOfferPopup}
        backdropOpacity={0.6}
        animationIn="slideInUp"
        animationOut="bounceOut"
        useNativeDriver>

        <View style={styles.popupContainer}>

          <TouchableOpacity
            style={styles.closeButton}
            activeOpacity={0.9}
            onPress={closePopup}>

            <Icon name="close" size={28} color="#EF761A" />
          </TouchableOpacity>

          <LinearGradient
            colors={['#FFEB34', '#E76F00']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.offerCard}>

            <Image source={{ uri: 'https://res.cloudinary.com/diazmm0lw/image/upload/v1781847373/Triangle_vuh2es.png' }} style={styles.shape1}></Image>
            <Image source={{ uri: 'https://res.cloudinary.com/diazmm0lw/image/upload/v1781847373/Triangle2_cbtz6w.png' }} style={styles.shape2}></Image>
            <Image source={{ uri: 'https://res.cloudinary.com/diazmm0lw/image/upload/v1781847374/Triangle3_etrvdd.png' }} style={styles.shape3}></Image>
            <Image source={{ uri: 'https://res.cloudinary.com/diazmm0lw/image/upload/v1781847374/Triangle4_qup97h.png' }} style={styles.shape4}></Image>
            <Image source={{ uri: 'https://res.cloudinary.com/diazmm0lw/image/upload/v1781847375/Triangle5_uquxms.png' }} style={styles.shape5}></Image>
            <Image source={{ uri: 'https://res.cloudinary.com/diazmm0lw/image/upload/v1781847375/Triangle6_rjqr4m.png' }} style={styles.shape6}></Image>
            <Image source={{ uri: 'https://res.cloudinary.com/diazmm0lw/image/upload/v1781847375/Triangle7_kbfitu.png' }} style={styles.shape7}></Image>
            <Image source={{ uri: 'https://res.cloudinary.com/diazmm0lw/image/upload/v1781847376/vectorPic_ln1tuf.png' }} style={styles.shape8}></Image>

            <Text style={styles.offerTitle}>
              Hurry Offers!
            </Text>

            <Text style={styles.couponCode}>
              #1243CD2
            </Text>

            <Text style={styles.offerDescription}>
              Use the coupon get 25% discount
            </Text>

            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.gotItButton}
              onPress={closePopup}>

              <Text style={styles.gotItText}>
                GOT IT
              </Text>
            </TouchableOpacity>

          </LinearGradient>

        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  menu: {
    width: width * 0.05,
    height: height * 0.05
  },
  trackOrderButton: {
    height: 60,
    borderRadius: 16,
    backgroundColor: '#FF7A00',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20
  },

  trackOrderText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Sen-Bold',
  },
  popupContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  offerCard: {
    width: width * 0.9,
    borderRadius: width * 0.09,
    paddingVertical: height * 0.06,
    paddingHorizontal: width * 0.06,
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },

  closeButton: {
    position: 'absolute',
    top: -22,
    right: 8,
    width: width * 0.14,
    height: width * 0.14,
    borderRadius: width * 0.07,
    backgroundColor: '#FFE194',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },

  offerTitle: {
    marginTop: height * 0.06,
    fontSize: width * 0.11,
    color: '#FFFFFF',
    fontFamily: 'Sen-Bold',
    textAlign: 'center',
  },

  couponCode: {
    marginTop: height * 0.06,
    fontSize: width * 0.085,
    color: '#FFFFFF',
    fontFamily: 'Sen-Bold',
    letterSpacing: 1,
  },

  offerDescription: {
    marginTop: height * 0.04,
    fontSize: width * 0.05,
    color: '#FFFFFF',
    fontFamily: 'Sen-Medium',
    textAlign: 'center',
    lineHeight: 30,
    width: '102%'
  },

  gotItButton: {
    width: '100%',
    height: height * 0.085,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: width * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.055,
  },

  gotItText: {
    fontSize: width * 0.05,
    color: '#FFFFFF',
    fontFamily: 'Sen-Bold',
    letterSpacing: 1,
  },

  shape1: {
    position: 'absolute',
    top: 55,
    left: 45,
  },

  shape2: {
    position: 'absolute',
    top: 50,
  },

  shape3: {
    position: 'absolute',
    top: 75,
    right: 50
  },

  shape4: {
    position: 'absolute',
    top: 135,
    left: 78
  },
  shape5: {
    position: 'absolute',
    top: 165,
    left: 155
  },
  shape6: {
    position: 'absolute',
    top: 123,
    right: 110,
    zIndex: 1
  },
  shape7: {
    position: 'absolute',
    top: 215,
    left: 60,
  },
  shape8: {
    position: 'absolute',
    top: 185,
    right: 29
  },
  activeFireContainer: {
    backgroundColor: '#FFFFFF',
  },
  foodContainer: {
    width: width * 0.38,
    backgroundColor: '#FFFFFF',
    borderRadius: width * 0.06,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.04,
    marginRight: width * 0.04,
    marginBottom: height * 0.01,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 0.5,
  },

  foodImage: {
    width: width * 0.4,
    height: width * 0.37,
    resizeMode: 'contain',
    backgroundColor: 'white'
  },

  foodName: {
    marginTop: height * 0.015,
    fontSize: width * 0.055,
    fontFamily: 'Sen-Bold',
    color: '#1E1E2E',
    alignSelf: 'flex-start',
  },

  foodPrice: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: height * 0.01,
  },

  startingText: {
    fontSize: width * 0.04,
    color: '#646982',
    fontFamily: 'Sen-Regular',
  },

  priceValue: {
    fontSize: width * 0.045,
    color: '#1E1E2E',
    fontFamily: 'Sen-Medium',
  },
  headerContainer: {
    marginTop: height * 0.025,
    paddingHorizontal: width * 0.06,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuButton: {
    width: width * 0.13,
    height: width * 0.13,
    borderRadius: width * 0.065,
    backgroundColor: '#ECF0F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationContainer: {
    flex: 1,
    marginLeft: width * 0.04,
  },
  deliverText: {
    color: '#FC6E2A',
    fontSize: width * 0.033,
    fontFamily: 'Sen-Bold',
    letterSpacing: 1,
  },
  locationText: {
    color: '#1E1E2E',
    fontSize: width * 0.042,
    fontFamily: 'Sen-Medium',
  },
  cartButton: {
    width: width * 0.14,
    height: width * 0.14,
    borderRadius: width * 0.07,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -0.5,
    width: width * 0.06,
    height: width * 0.06,
    borderRadius: width * 0.03,
    backgroundColor: '#FC6E2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingContainer: {
    marginTop: height * 0.035,
    paddingHorizontal: width * 0.06,
  },
  greetingText: {
    fontSize: width * 0.042,
    color: '#1E1E2E',
    fontFamily: 'Sen-Regular',
  },
  searchContainer: {
    marginTop: height * 0.03,
    marginHorizontal: width * 0.06,
    height: height * 0.08,
    borderRadius: width * 0.045,
    backgroundColor: '#ECECEC',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.045,
  },
  searchInput: {
    flex: 1,
    marginLeft: width * 0.03,
    fontSize: width * 0.04,
    color: '#676767',
    fontFamily: 'Sen-Regular',
  },
  sectionHeader: {
    marginTop: height * 0.04,
    marginBottom: height * 0.025,
    paddingHorizontal: width * 0.06,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: width * 0.06,
    fontFamily: 'Sen-Medium',
    color: '#1E1E2E',
  },
  categoryCard: {
    height: height * 0.08,
    paddingHorizontal: width * 0.045,
    borderRadius: width * 0.09,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: width * 0.04,
    marginBottom: height * 0.01,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1
  },
  categoryImage: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.05,
    backgroundColor: 'white',
  },
  categoryText: {
    marginLeft: width * 0.03,
    fontSize: width * 0.043,
    color: '#1E1E2E',
    fontFamily: 'Sen-Medium',
  },
  bag: {
    height: '47%',
    width: '42.5%'
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  badgeText: {
    color: '#fff',
    fontFamily: 'Sen-Bold',
    fontSize: 12,
  },

  boldText: {
    fontFamily: 'Sen-Bold',
  },

  seeAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  seeAllText: {
    fontSize: 16,
    color: '#333333',
    fontFamily: 'Sen-Medium',
  },

  activeCategoryCard: {
    backgroundColor: '#FFD27C',
  },

  fireContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  activeCategoryText: {
    color: '#1E1E2E',
  }
});