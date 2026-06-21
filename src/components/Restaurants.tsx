import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image, FlatList, Dimensions, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ImageSourcePropType } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/Cart';
import { useRestaurant } from '../context/RestaurantContext';

const { width, height } = Dimensions.get('window');

export interface RestaurantItem {
    id: string;
    name: string;
    image: string;
    categories: string;
    rating: string;
    time: string;
    carouselImages: string[];
};

const restaurants = [
    {
        id: '1',
        name: 'Rose Garden Restaurant',
        image: 'https://res.cloudinary.com/diazmm0lw/image/upload/v1781847366/rose_garden_lehcza.png',
        categories: 'Burger - Chicken - Riche - Wings',
        rating: '4.7',
        time: '20 min',
        carouselImages: [
            'https://res.cloudinary.com/diazmm0lw/image/upload/v1781847366/rose_garden_lehcza.png',
            'https://res.cloudinary.com/diazmm0lw/image/upload/v1781847376/sprouts_gnpizn.webp',
            'https://res.cloudinary.com/diazmm0lw/image/upload/v1781847287/restaurantPic_pzhsrb.webp',
        ],
    },
    {
        id: '2',
        name: 'Green Bowl Restaurant',
        image: 'https://res.cloudinary.com/diazmm0lw/image/upload/v1781847376/sprouts_gnpizn.webp',
        categories: 'Healthy - Salad - Bowl',
        rating: '4.5',
        time: '25 min',
        carouselImages: [
            'https://res.cloudinary.com/diazmm0lw/image/upload/v1781847376/sprouts_gnpizn.webp',
            'https://res.cloudinary.com/diazmm0lw/image/upload/v1781847287/restaurantPic_pzhsrb.webp',
            'https://res.cloudinary.com/diazmm0lw/image/upload/v1781847366/rose_garden_lehcza.png',
        ],
    },
];

const Restaurants = () => {

    const navigation = useNavigation<any>();
    const { setSelectedRestaurant } = useRestaurant();

    const onSelectRestaurant = async (item: RestaurantItem) => {
        await setSelectedRestaurant(item);

        navigation.navigate('restaurantScreen');
    };

    const renderRestaurant = ({ item }: {
        item: RestaurantItem;
    }) => {
        return (
            <TouchableOpacity style={styles.restaurantCard} activeOpacity={0.9} onPress={() => onSelectRestaurant(item)}>

                <Image source={{uri:item.image}} style={styles.restaurantImage} />

                <Text style={styles.restaurantName}>
                    {item.name}
                </Text>

                <Text style={styles.restaurantCategory}>
                    {item.categories}
                </Text>

                <View style={styles.bottomRow}>
                    <View style={styles.infoRow}>
                        <MaterialIcons name="star-border" size={22} color="#FF7A00" />
                        <Text style={styles.infoText}>
                            {item.rating}
                        </Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Image source={{uri:'https://res.cloudinary.com/diazmm0lw/image/upload/v1781847266/deliveryTruck_shahnw.png'}} />
                        <Text style={styles.deliveryText}>
                            Free
                        </Text>
                    </View>

                    <View style={styles.infoRow}>
                        <MaterialIcons name="access-time" size={22} color="#FF7A00" />
                        <Text style={styles.infoText}>
                            {item.time}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    return (
        <FlatList data={restaurants} renderItem={renderRestaurant} keyExtractor={item => item.id} scrollEnabled={false} />
    );
}

export default Restaurants

const styles = StyleSheet.create({
    restaurantCard: {
        marginHorizontal: width * 0.06,
        marginBottom: height * 0.03,
    },
    restaurantImage: {
        width: '100%',
        height: height * 0.23,
        borderRadius: width * 0.06,
    },
    restaurantName: {
        marginTop: height * 0.02,
        fontSize: width * 0.055,
        fontFamily: 'Sen-Bold',
        color: '#1E1E2E',
    },
    restaurantCategory: {
        marginTop: height * 0.01,
        fontFamily: 'Sen-Medium',
        color: '#A0A5BA',
        fontSize: width * 0.038,
    },
    bottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: height * 0.02,
    },
    infoText: {
        marginLeft: width * 0.015,
        fontFamily: 'Sen-Bold',
        color: '#1E1E2E',
        fontSize: width * 0.038,
    },
    deliveryText: {
        marginLeft: width * 0.015,
        fontSize: width * 0.04,
        color: '#1E1E2E',
        fontFamily: 'Sen-Medium',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 24,
    },
})