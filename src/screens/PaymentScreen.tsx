import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ScrollView,
    Image,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ScreenRouteProp } from '../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const paymentMethods = [
    {
        id: '1',
        name: 'Cash',
        image: 'https://res.cloudinary.com/diazmm0lw/image/upload/v1781847264/Cash_lnnbue.png',
    },
    {
        id: '2',
        name: 'Visa',
        image: 'https://res.cloudinary.com/diazmm0lw/image/upload/v1781847267/Group_zbpjcq.png',
    },
    {
        id: '3',
        name: 'Mastercard',
        image: 'https://res.cloudinary.com/diazmm0lw/image/upload/v1781847268/masterCard_lxdrba.png',
    },
    {
        id: '4',
        name: 'Paypal',
        image: 'https://res.cloudinary.com/diazmm0lw/image/upload/v1781847269/paypal_ftc7kq.png',
    },
];

const cardImages: any = {
    Visa: 'https://res.cloudinary.com/diazmm0lw/image/upload/v1781847267/Group_zbpjcq.png',
    Mastercard: 'https://res.cloudinary.com/diazmm0lw/image/upload/v1781847268/masterCard_lxdrba.png',
    Paypal: 'https://res.cloudinary.com/diazmm0lw/image/upload/v1781847269/paypal_ftc7kq.png',
    Cash: 'https://res.cloudinary.com/diazmm0lw/image/upload/v1781847264/Cash_lnnbue.png',
};

const PaymentScreen = () => {
    const navigation = useNavigation<any>();

    const route = useRoute<ScreenRouteProp<'payment'>>();
    const [savedCards, setSavedCards] = useState<any[]>([]);
    const [selectedMethod, setSelectedMethod] = useState(
        route.params?.selectedMethod || 'Mastercard'
    );

    useEffect(() => {
        if (route.params?.savedCards) {
            setSavedCards(route.params.savedCards);
        }

        if (route.params?.selectedMethod) {
            setSelectedMethod(route.params.selectedMethod);
        }
    }, [
        route.params?.savedCards,
        route.params?.selectedMethod,
    ]);

    useEffect(() => {
        const loadCards = async () => {
            try {
                const storedCards =
                    await AsyncStorage.getItem(
                        'savedCards'
                    );

                if (storedCards) {
                    setSavedCards(
                        JSON.parse(storedCards)
                    );
                }
            } catch (error) {
                console.log(
                    'Error loading cards:',
                    error
                );
            }
        };

        loadCards();
    }, []);

    const deleteCard = async (index: number) => {
        Alert.alert(
            'Delete Card',
            'Are you sure you want to remove this card?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const updatedCards =
                                savedCards.filter(
                                    (_, i) => i !== index
                                );

                            setSavedCards(updatedCards);

                            await AsyncStorage.setItem(
                                'savedCards',
                                JSON.stringify(updatedCards)
                            );
                        } catch (error) {
                            console.log(
                                'Error deleting card:',
                                error
                            );
                        }
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
                paddingBottom: 20,
            }}>
                <View style={styles.header}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={styles.backButton}
                        onPress={() => navigation.replace('cart')}
                    >
                        <Feather name="chevron-left" size={24} color="#181C2E" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Payment</Text>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
                    {paymentMethods.map(item => {
                        const isSelected = selectedMethod === item.name;
                        return (
                            <View style={styles.pay} key={item.id}>
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => setSelectedMethod(item.name)}
                                    style={[styles.paymentMethodCard, isSelected && styles.activePaymentMethod]}
                                >
                                    {isSelected && (
                                        <View style={styles.tickCircle}>
                                            <Feather name="check" size={14} color="#FFF" />
                                        </View>
                                    )}
                                    <Image source={{ uri: item.image }} style={styles.paymentIcon} resizeMode="contain" />
                                </TouchableOpacity>
                                <Text style={styles.paymentText}>{item.name}</Text>
                            </View>
                        );
                    })}
                </ScrollView>

                {savedCards.length > 0 ? (
                    savedCards.map((card, index) => (
                        <View key={index} style={styles.cardContainerVisible}>
                            <Text style={styles.cardTitle}>
                                {card.cardType}
                            </Text>

                            <View style={styles.box}>
                                <View style={styles.mastercardBox}>
                                    <Image
                                        source={{ uri: cardImages[card.cardType] }}
                                        style={{
                                            width: 40,
                                            height: 30,
                                            resizeMode: 'contain',
                                        }}
                                    />

                                    <Text style={styles.cardDescription}>
                                        **** **** **** {card.cardNumber.slice(-4)}
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => deleteCard(index)}
                                >
                                    <Image
                                        source={{ uri: 'https://res.cloudinary.com/diazmm0lw/image/upload/v1781847266/downArrow_agtkpm.png' }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                ) : (
                    <View style={styles.cardContainer}>
                        <Image
                            source={{ uri: 'https://res.cloudinary.com/diazmm0lw/image/upload/v1781847263/banner_yydvkf.png' }}
                            style={styles.masterCardImage}
                            resizeMode="contain"
                        />
                        <Text style={styles.cardTitle}>No master card added</Text>
                        <Text style={styles.cardDescription}>
                            You can add a mastercard and{'\n'}save it for later
                        </Text>
                    </View>
                )}

                <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.addButton}
                    onPress={() => navigation.navigate('addCard', { totalPrice: route.params.totalPrice, existingCards: savedCards, selectedMethod, })}
                >
                    <Feather name="plus" size={24} color="#FF7622" />
                    <Text style={styles.addButtonText}>ADD NEW</Text>
                </TouchableOpacity>
            </ScrollView>

            <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>TOTAL:</Text>
                <Text style={styles.totalPrice}>${route.params.totalPrice}</Text>
            </View>

            <TouchableOpacity
                activeOpacity={0.9}
                style={styles.payButton}
                onPress={() => {
                    if (selectedMethod !== 'Cash' &&
                        savedCards.length === 0) {

                        Alert.alert(
                            'No Payment Card Found'
                        );
                        return;
                    }

                    navigation.navigate('paySuccess');
                }}
            >
                <Text style={styles.payButtonText}>
                    {selectedMethod === 'Cash'
                        ? 'CASH ON DELIVERY'
                        : 'PAY & CONFIRM'}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default PaymentScreen;

const styles = StyleSheet.create({
    mastercardBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: '35%'
    },
    box: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    pay: {
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 25,
        marginBottom: 10,
    },

    backButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#EAECEF',
        justifyContent: 'center',
        alignItems: 'center',
    },

    headerTitle: {
        fontSize: 20,
        color: '#181C2E',
        fontFamily: 'Sen-Bold',
        marginLeft: 20,
    },

    paymentMethodCard: {
        width: 85,
        height: 70,
        backgroundColor: '#EEF1F5',
        borderRadius: 16,
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
        marginTop: 10
    },

    activePaymentMethod: {
        borderColor: '#FF7622',
    },

    tickCircle: {
        position: 'absolute',
        top: -8,
        right: -8,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#FF7622',
        justifyContent: 'center',
        alignItems: 'center',
    },

    paymentIcon: {
        width: 30,
        height: 40,
    },

    paymentText: {
        fontSize: 16,
        color: '#32343E',
        fontFamily: 'Sen-Regular',
    },

    cardContainer: {
        marginHorizontal: 20,
        marginTop: 25,
        backgroundColor: '#F0F1F3',
        borderRadius: 20,
        alignItems: 'center',

        // paddingVertical: 35,
    },
    cardContainerVisible: {
        height: 90,
        marginHorizontal: 20,
        marginTop: 25,
        backgroundColor: '#F0F1F3',
        borderRadius: 20,
        paddingLeft: 25,
        paddingTop: 15
    },

    masterCardImage: {
        width: 250,
        height: 250,
        marginBottom: -50,
        marginTop: -10

    },

    cardTitle: {
        fontSize: 16,
        color: '#32343E',
        fontFamily: 'Sen-Bold',
    },

    cardDescription: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 15,
        lineHeight: 28,
        color: '#7E8A97',
        fontFamily: 'Sen-Regular',
    },

    addButton: {
        marginHorizontal: 20,
        marginTop: 20,
        height: 60,
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: '#E4E6EB',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    addButtonText: {
        marginLeft: 10,
        color: '#FF7622',
        fontSize: 18,
        fontFamily: 'Sen-Bold',
    },

    totalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 25,
        paddingHorizontal: 25,
    },

    totalLabel: {
        fontSize: 14,
        color: '#A0A5BA',
        fontFamily: 'Sen-Regular',
    },

    totalPrice: {
        marginLeft: 10,
        fontSize: 30,
        color: '#181C2E',
        fontFamily: 'Sen-Medium',
    },

    payButton: {
        height: 62,
        marginHorizontal: 20,
        marginTop: 30,
        marginBottom: 40,
        borderRadius: 18,
        backgroundColor: '#FF7622',
        justifyContent: 'center',
        alignItems: 'center',
    },

    payButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'Sen-Bold',
    },
});