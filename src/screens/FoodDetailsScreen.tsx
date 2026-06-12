import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions,
    Alert,
} from 'react-native';

//adb shell input keyevent 82

import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { useCart } from '../context/Cart';
import AntDesign from 'react-native-vector-icons/AntDesign';

const { width, height } = Dimensions.get('window');

type FoodDetailsRouteProp = RouteProp<
    RootStackParamList,
    'foodDetails'
>;

const ingredients = [
    {
        id: '1',
        image: require('../assets/saltPic.png')
    },
    {
        id: '2',
        image: require('../assets/chickenPic.png')
    },
    {
        id: '3',
        image: require('../assets/onionPic.png')
    },
    {
        id: '4',
        image: require('../assets/cumcumberPic.png')
    },
    {
        id: '5',
        image: require('../assets/carrotPic.png')
    },
];



const numberArray = ['10', '14', '16']

const FoodDetailsScreen = () => {
    //console.log('FoodDetailsScreen Loaded');
    const [selectedSize, setSelectedSize] = useState('14');
    const navigation = useNavigation<any>();

    const [isFavorite, setIsFavorite] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const route = useRoute<FoodDetailsRouteProp>();
    const { burgerData } = route.params;
    //console.log(burgerData)
    //const [itemPrice, setItemPrice] = useState(Number(burgerData.price))
    const itemPrice = Number(burgerData.price.replace('$', ''));
    const totalPrice = itemPrice * quantity;
    const { addToCart } = useCart();
    const toggleFavorite = () => {
        setIsFavorite(prev => !prev);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}>

                <View style={styles.headerContainer}>
                    <TouchableOpacity style={styles.backButton} onPress={() => { navigation.navigate('popularBurgers') }}>
                        <Icon name="chevron-back" size={28} color="#1E1E2E" />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Details</Text>
                </View>

                <View style={styles.imageCard}>

                    <Image
                        source={burgerData.image}
                        style={styles.burgerImage}
                        resizeMode="contain"
                    />

                    <TouchableOpacity
                        style={styles.favoriteButton}
                        onPress={toggleFavorite}
                    >
                        <AntDesign
                            name={isFavorite ? "heart" : "hearto"}
                            size={22}
                            color={isFavorite ? "red" : "#FFFFFF"}
                        />
                    </TouchableOpacity>

                </View>

                <TouchableOpacity style={styles.restaurantTag}>
                    <View style={styles.restaurantIcon}>
                        <Image source={require('../assets/ellipseUttora.png')}></Image>
                    </View>

                    <Text style={styles.restaurantText}>
                        {burgerData.restaurant}
                    </Text>
                </TouchableOpacity>

                <Text style={styles.rate}>${burgerData.price}</Text>

                <Text style={styles.foodTitle}>
                    {burgerData.name}
                </Text>

                <Text style={styles.description}>
                    Prosciutto e funghi is a burger variety that is
                    topped with a bread.
                </Text>

                <View style={styles.infoContainer}>

                    <View style={styles.infoRow}>
                        <Image source={require('../assets/starRating.png')}></Image>
                        <Text style={styles.infoText}>4.7</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Image source={require('../assets/deliveryTruck.png')}></Image>
                        <Text style={styles.deliveryText}>Free</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Feather name="clock" size={22} color="#FF8C2B" />
                        <Text style={styles.deliveryText}>20 min</Text>
                    </View>

                </View>

                <View style={styles.size}>
                    <Text style={styles.sectionLabel}>SIZE:</Text>

                    <View style={styles.sizeContainer}>

                        {numberArray.map(size => {
                            const isSelected = selectedSize === size
                            return (
                                <TouchableOpacity
                                    key={size}
                                    activeOpacity={0.8}
                                    onPress={() => setSelectedSize(size)}
                                    style={[
                                        styles.sizeButton,
                                        isSelected && styles.activeSizeButton,
                                    ]}>

                                    <Text
                                        style={[
                                            styles.sizeText,
                                            isSelected && styles.activeSizeText,
                                        ]}>
                                        {size}"
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}

                    </View>
                </View>

                <Text style={styles.sectionLabel}>
                    INGRIDIENTS
                </Text>

                <View style={styles.ingredientsContainer}>

                    {ingredients.map(item => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.ingredientButton}>

                            <Image source={item.image}></Image>
                        </TouchableOpacity>
                    ))}

                </View>

            </ScrollView>

            <View style={styles.bottom}>
                <View style={styles.bottomContainer}>
                    <Text style={styles.priceText}>
                        ${totalPrice}
                    </Text>

                    <View style={styles.quantityContainer}>

                        <View style={styles.number}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.actionButton}
                                onPress={() => {
                                    quantity > 1 && setQuantity(quantity - 1)
                                }
                                }>

                                <Text style={styles.actionText}>-</Text>
                            </TouchableOpacity>

                            <Text style={styles.quantityText}>
                                {quantity}
                            </Text>

                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.actionButton}
                                onPress={() => {
                                    setQuantity(quantity + 1)
                                }}>

                                <Text style={styles.actionText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.cartButton}
                    onPress={() => {
                        addToCart({
                            ...burgerData,
                            quantity,
                            size: selectedSize,
                        });

                        navigation.navigate(
                            'popularBurgers'
                        );
                    }}
                >

                    <Text style={styles.cartColor}>
                        ADD TO CART
                    </Text>
                </TouchableOpacity>

            </View>

        </SafeAreaView>
    );
};

export default FoodDetailsScreen;

const styles = StyleSheet.create({
    rate: {
        fontSize: 22,
        marginLeft: '6%',
        marginTop: '5%',
        fontFamily: 'Sen-Medium'
    },
    bottom: {
        backgroundColor: '#EEF1F6',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    number: {
        flexDirection: 'row',
        gap: '15%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cartColor: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Sen-Medium'
    },
    cartButton: {
        backgroundColor: '#FF7622',
        marginHorizontal: '5%',
        borderRadius: 12,
        paddingVertical: '7%',
        alignItems: 'center',
        marginBottom: '6%'
    },
    size: {
        flexDirection: 'row',
        marginTop: 3
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    headerContainer: {
        marginTop: height * 0.025,
        paddingHorizontal: width * 0.06,
        flexDirection: 'row',
        alignItems: 'center',
    },

    backButton: {
        width: width * 0.13,
        height: width * 0.13,
        borderRadius: width * 0.065,
        backgroundColor: '#ECF0F4',
        justifyContent: 'center',
        alignItems: 'center',
    },

    headerTitle: {
        marginLeft: width * 0.05,
        fontSize: width * 0.06,
        fontFamily: 'Sen-Medium',
        color: '#1E1E2E',
    },

    imageCard: {
        marginTop: height * 0.045,
        marginHorizontal: width * 0.06,
        height: height * 0.32,
        borderRadius: width * 0.08,
        backgroundColor: '#F7BE6B',
        justifyContent: 'center',
        alignItems: 'center',
    },

    burgerImage: {
        width: width * 0.72,
        height: width * 0.7,
        position: 'absolute',
        top: -50,
    },

    favoriteButton: {
        position: 'absolute',
        right: 22,
        bottom: 22,
        width: width * 0.12,
        height: width * 0.12,
        borderRadius: width * 0.06,
        backgroundColor: 'rgba(255,255,255,0.25)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    restaurantTag: {
        marginTop: height * 0.04,
        marginHorizontal: width * 0.06,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: width * 0.08,
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.04,
        borderWidth: 0.7,
        borderColor: '#E9E9E9',
    },

    restaurantIcon: {
        width: width * 0.07,
        height: width * 0.07,
        borderRadius: width * 0.035,
        backgroundColor: '#FFF2E7',
        justifyContent: 'center',
        alignItems: 'center',
    },

    restaurantText: {
        marginLeft: width * 0.03,
        fontSize: width * 0.042,
        color: '#1E1E2E',
        fontFamily: 'Sen-Medium',
    },

    foodTitle: {
        marginTop: height * 0.015,
        marginHorizontal: width * 0.06,
        fontSize: width * 0.056,
        lineHeight: 40,
        color: '#1E1E2E',
        fontFamily: 'Sen-Bold',
        width: '95%'
    },

    description: {
        marginTop: height * 0.018,
        marginHorizontal: width * 0.06,
        fontSize: 14,
        lineHeight: 24,
        color: '#A0A5BA',
        fontFamily: 'Sen-Regular',
    },

    infoContainer: {
        marginTop: height * 0.035,
        marginHorizontal: width * 0.06,
        flexDirection: 'row',
        alignItems: 'center',
    },

    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: width * 0.08,
    },

    infoText: {
        marginLeft: width * 0.02,
        fontSize: width * 0.045,
        color: '#1E1E2E',
        fontFamily: 'Sen-Bold',
    },

    deliveryText: {
        marginLeft: width * 0.02,
        fontSize: width * 0.043,
        color: '#1E1E2E',
        fontFamily: 'Sen-Medium',
    },

    sectionLabel: {
        marginTop: height * 0.04,
        marginHorizontal: width * 0.06,
        fontSize: width * 0.038,
        letterSpacing: 2,
        color: '#32343E',
        fontFamily: 'Sen-Medium',
    },

    sizeContainer: {
        marginTop: height * 0.025,
        flexDirection: 'row',
        alignItems: 'center',
    },

    sizeButton: {
        width: width * 0.14,
        height: width * 0.14,
        borderRadius: width * 0.07,
        backgroundColor: '#ECEFF3',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: width * 0.04,
    },

    activeSizeButton: {
        backgroundColor: '#F58D1D',
        color: 'white'
    },

    sizeText: {
        fontSize: width * 0.05,
        color: '#1E1E2E',
        fontFamily: 'Sen-Bold',
    },

    activeSizeText: {
        color: '#FFFFFF',
    },

    ingredientsContainer: {
        marginTop: height * 0.03,
        marginHorizontal: width * 0.06,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '3%'
    },

    ingredientButton: {
        width: width * 0.14,
        height: width * 0.14,
        borderRadius: width * 0.07,
        backgroundColor: '#FFF1EA',
        justifyContent: 'center',
        alignItems: 'center',
    },

    bottomContainer: {
        height: height * 0.12,
        backgroundColor: '#EEF1F6',
        borderTopLeftRadius: width * 0.08,
        borderTopRightRadius: width * 0.08,
        paddingHorizontal: width * 0.06,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    priceText: {
        fontSize: 28,
        color: '#1E1E2E',
        fontFamily: 'Sen-Medium',
    },

    quantityContainer: {
        width: width * 0.34,
        height: height * 0.07,
        borderRadius: width * 0.09,
        backgroundColor: '#111827',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    actionButton: {
        width: width * 0.08,
        height: width * 0.08,
        borderRadius: width * 0.04,
        backgroundColor: '#2B3147',
        justifyContent: 'center',
        alignItems: 'center',
    },

    actionText: {
        fontSize: width * 0.06,
        color: '#FFFFFF',
        fontFamily: 'Sen-Bold',
    },

    quantityText: {
        fontSize: width * 0.04,
        color: '#FFFFFF',
        fontFamily: 'Sen-Bold',
    },
});