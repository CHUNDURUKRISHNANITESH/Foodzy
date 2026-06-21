import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ScrollView,
    Alert,
} from 'react-native';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList, ScreenRouteProp } from '../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');

type AddCardRouteProp = RouteProp<RootStackParamList,
    'addCard'
>;

export default function AddCardScreen() {
    const [cardHolder, setCardHolder] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
    const navigation = useNavigation<any>();
    const route = useRoute<AddCardRouteProp>();
    const totalPrice = route.params.totalPrice;


    const existingCards = route.params?.existingCards || [];

    const selectedMethod =
        route.params?.selectedMethod || 'Mastercard';

    const validateCard = () => {
        if (!cardHolder.trim()) {
            Alert.alert('Error', 'Card holder name is required');
            return false;
        }

        if (cardHolder.length < 3) {
            Alert.alert('Error', 'Enter valid card holder name');
            return false;
        }

        if (!/^\d{16}$/.test(cardNumber)) {
            Alert.alert('Error', 'Card number must be 16 digits');
            return false;
        }

        if (!/^\d{2}\/\d{2,4}$/.test(expiry)) {
            Alert.alert('Error', 'Expiry must be MM/YY or MM/YYYY');
            return false;
        }

        if (!/^\d{3}$/.test(cvc)) {
            Alert.alert('Error', 'CVC must be 3 digits');
            return false;
        }

        return true;
    };

    const saveCard = async () => {
        try {
            const newCard = {
                cardHolder,
                cardNumber,
                expiry,
                cvc,
                cardType: selectedMethod,
            };

            const storedCards =
                await AsyncStorage.getItem('savedCards');

            const cards = storedCards
                ? JSON.parse(storedCards)
                : [];

            const updatedCards = [
                ...cards,
                newCard,
            ];

            await AsyncStorage.setItem(
                'savedCards',
                JSON.stringify(updatedCards)
            );

            navigation.navigate('payment', {
                totalPrice,
                selectedMethod,
                savedCards: updatedCards,
            });

        } catch (error) {
            console.log('Error saving card:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
            <View style={styles.mainContainer}>
                <View style={styles.header}>
                    <TouchableOpacity activeOpacity={0.9} style={styles.closeButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.delete}>
                            ✕
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Add Card</Text>
                </View>

                <Text style={styles.label}>CARD HOLDER NAME</Text>
                <TextInput
                    style={styles.input}
                    placeholder="John Doe"
                    placeholderTextColor="#999"
                    value={cardHolder}
                    onChangeText={setCardHolder}
                />

                <Text style={styles.labelCard}>CARD NUMBER</Text>
                <TextInput
                    style={styles.input}
                    placeholder="2134 **** **** ****"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    value={cardNumber}
                    onChangeText={setCardNumber}
                />

                <View style={styles.rowExpire}>
                    <View style={{ flex: 1, marginRight: width * 0.03 }}>
                        <Text style={styles.label}>EXPIRE DATE</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="mm/yyyy"
                            placeholderTextColor="#999"
                            value={expiry}
                            onChangeText={setExpiry}
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>CVC</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="***"
                            placeholderTextColor="#999"
                            keyboardType="numeric"
                            secureTextEntry={true}
                            value={cvc}
                            onChangeText={setCvc}
                        />
                    </View>
                </View>

                <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.button}
                    onPress={() => {
                        if (!validateCard()) return;

                        saveCard();
                    }}
                >
                    <Text style={styles.buttonText}>ADD & MAKE PAYMENT</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    closeButton: {
        backgroundColor: '#ECF0F4',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    delete: {
        fontSize: 15,
    },
    header: {
        marginTop: '11%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '7%'
    },
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
        padding: width * 0.06,
    },
    title: {
        color: 'black',
        fontSize: width * 0.05,
        fontFamily: 'Sen-Medium',
        textAlign: 'center',
    },
    label: {
        fontSize: width * 0.035,
        fontFamily: 'Sen-Regular',
        color: '#A0A5BA',
        marginBottom: height * 0.01,
        marginTop: '10%'
    },
    labelCard: {
        fontSize: width * 0.035,
        fontFamily: 'Sen-Regular',
        color: '#A0A5BA',
        marginBottom: height * 0.01,
        marginTop: '4%'
    },
    rowExpire: {
        fontSize: width * 0.035,
        fontFamily: 'Sen-Regular',
        color: '#A0A5BA',
        marginBottom: height * 0.01,
        marginTop: '2%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    input: {
        backgroundColor: '#F0F5FA',
        borderRadius: width * 0.03,
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.05,
        fontFamily: 'Sen-Regular',
        fontSize: width * 0.04,
        marginBottom: height * 0.025,
    },

    button: {
        backgroundColor: '#FF7A1A',
        paddingVertical: height * 0.025,
        borderRadius: width * 0.035,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.27,
    },
    buttonText: {
        color: 'white',
        fontSize: width * 0.042,
        fontFamily: 'Sen-Bold',
    },
});
