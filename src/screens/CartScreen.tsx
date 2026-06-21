import React, { useCallback, useEffect, useRef } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions,
    Animated,
    Keyboard
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/Cart';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';
import { Modal } from 'react-native';
import { useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const CartItemRow = React.memo(
    ({
        item,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
    }: any) => {
        return (
            <View style={styles.cartItem}>
                <Image
                    source={item.image}
                    style={styles.image}
                />

                <View style={styles.info}>
                    <Text style={styles.name}>
                        {item.name}
                    </Text>

                    <Text style={styles.price}>
                        ${item.price}
                    </Text>

                    <View style={styles.sizeBox}>
                        <Text style={styles.sizeText}>
                            {item.size}"
                        </Text>

                        <View style={styles.quantityRow}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                style={styles.qtyBtn}
                                onPress={() =>
                                    decreaseQuantity(item.id)
                                }>
                                <AntDesign
                                    name="minus"
                                    color="white"
                                    size={18}
                                />
                            </TouchableOpacity>

                            <Text style={styles.qty}>
                                {item.quantity}
                            </Text>

                            <TouchableOpacity
                                activeOpacity={0.9}
                                style={styles.qtyBtn}
                                onPress={() => {
                                    increaseQuantity(item.id);
                                }
                                }>
                                <AntDesign
                                    name="plus"
                                    color="white"
                                    size={18}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                        removeItem(item.id)
                    }>
                    <AntDesign
                        name="closecircle"
                        color="red"
                        size={26}
                    />
                </TouchableOpacity>
            </View>
        );
    },
    (prevProps, nextProps) =>
        prevProps.item.quantity === nextProps.item.quantity &&
        prevProps.item.id === nextProps.item.id
);

const CartScreen = () => {
    const navigation = useNavigation<any>();
    const [address, setAddress] = React.useState(
        '2118 Thornridge Cir. Syracuse'
    );

    const [isEditingAddress, setIsEditingAddress] =
        React.useState(false);
    const route = useRoute<any>();

    const previousScreen =
        route.params?.previousScreen;

    const shiftAnim = useRef(new Animated.Value(0)).current;
    const [showBreakdownModal, setShowBreakdownModal] = React.useState(false);

    useEffect(() => {
        const showSub = Keyboard.addListener('keyboardDidShow', (e) => {
            const keyboardHeight = e.endCoordinates.height;
            Animated.timing(shiftAnim, {
                toValue: -keyboardHeight * 1,
                duration: 200,
                useNativeDriver: true,
            }).start();
        });

        const hideSub = Keyboard.addListener('keyboardDidHide', () => {
            Animated.timing(shiftAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start();
        });

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    useEffect(() => {
        const loadAddress = async () => {
            try {
                const savedAddress =
                    await AsyncStorage.getItem(
                        'deliveryAddress'
                    );

                if (savedAddress) {
                    setAddress(savedAddress);
                }
            } catch (error) {
                console.log(
                    'Error loading address:',
                    error
                );
            }
        };

        loadAddress();
    }, []);

    const saveAddress = async () => {
        try {
            await AsyncStorage.setItem(
                'deliveryAddress',
                address
            );

            setIsEditingAddress(false);
        } catch (error) {
            console.log(
                'Error saving address:',
                error
            );
        }
    };

    const {
        cartItems,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
    } = useCart();

    const totalPrice = React.useMemo(
        () =>
            cartItems.reduce(
                (sum, item) =>
                    sum +
                    Number(item.price) * item.quantity,
                0
            ),
        [cartItems]
    );

    const breakdown = React.useMemo(() => {
        const gst = totalPrice * 0.18;
        const deliveryFee = 40;
        const surgeFee = 20;

        return {
            gst,
            deliveryFee,
            surgeFee,
            finalPrice:
                totalPrice +
                gst +
                deliveryFee +
                surgeFee,
        };
    }, [totalPrice]);
    useEffect(() => {
        if (
            cartItems.length === 0 &&
            totalPrice === 0
        ) {
            navigation.navigate(
                'popularBurgers'
            );
        }
    }, [cartItems, totalPrice]);

    const renderItem = useCallback(
        ({ item }: any) => {

            return (
                <CartItemRow
                    item={item}
                    increaseQuantity={increaseQuantity}
                    decreaseQuantity={decreaseQuantity}
                    removeItem={removeItem}
                />
            );
        },
        [increaseQuantity, decreaseQuantity, removeItem]
    );

    if (cartItems.length === 0) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text>Cart is Empty</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.cartHeader}>
                <View style={styles.header}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={styles.back}
                        onPress={() => {
                            if (previousScreen) {
                                navigation.navigate(previousScreen);
                            } else {
                                navigation.goBack();
                            }
                        }}
                    >
                        <Icon name="chevron-back" size={20} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.title}>
                        Cart
                    </Text>
                </View>
                <Text style={styles.done}>DONE</Text>
            </View>

            <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                removeClippedSubviews={true}
                initialNumToRender={5}
                maxToRenderPerBatch={5}
                updateCellsBatchingPeriod={50}
                windowSize={5}
            />

            <Animated.View style={{ backgroundColor: 'black', transform: [{ translateY: shiftAnim }] }}>
                <View style={styles.botContainer}>

                    <View style={styles.headerRow}>
                        <Text style={styles.addressLabel}>
                            DELIVERY ADDRESS
                        </Text>

                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                if (isEditingAddress) {
                                    saveAddress();
                                } else {
                                    setIsEditingAddress(true);
                                }
                            }}
                        >
                            <Text style={styles.editText}>
                                {isEditingAddress ? 'SAVE' : 'EDIT'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.addressBox}>
                        {isEditingAddress ? (
                            <TextInput
                                value={address}
                                onChangeText={setAddress}
                                multiline
                                autoFocus
                                style={styles.addressInput}
                                placeholder="Enter delivery address"
                            />
                        ) : (
                            <Text style={styles.addressText}>
                                {address}
                            </Text>
                        )}
                    </View>

                    <View style={styles.totalRow}>
                        <View style={styles.totalContainer}>
                            <Text style={styles.totalLabel}>
                                TOTAL:
                            </Text>

                            <Text style={styles.totalPrice}>
                                ${totalPrice}
                            </Text>
                        </View>

                        <TouchableOpacity activeOpacity={0.9} style={styles.breakdownContainer} onPress={() =>
                            setShowBreakdownModal(true)
                        }>
                            <Text style={styles.breakdownText}>
                                Breakdown
                            </Text>

                            <Text style={styles.arrow}>
                                ›
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity activeOpacity={0.9} style={styles.orderButton} onPress={() => navigation.navigate('payment', { totalPrice })}>
                        <Text style={styles.orderButtonText}>
                            PLACE ORDER
                        </Text>
                    </TouchableOpacity>

                </View>
            </Animated.View>

            <Modal
                visible={showBreakdownModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowBreakdownModal(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={0.9}
                    onPress={() => setShowBreakdownModal(false)}
                >
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={styles.breakdownModal}
                    >
                        <Text style={styles.breakdownTitle}>
                            Price Breakdown
                        </Text>

                        <View style={styles.breakdownRow}>
                            <Text style={styles.breakdownLabel}>
                                Cart Total
                            </Text>

                            <Text style={styles.breakdownValue}>
                                ${totalPrice.toFixed(2)}
                            </Text>
                        </View>

                        <View style={styles.breakdownRow}>
                            <Text style={styles.breakdownLabel}>
                                GST (18%)
                            </Text>

                            <Text style={styles.breakdownValue}>
                                ${breakdown.gst.toFixed(2)}
                            </Text>
                        </View>

                        <View style={styles.breakdownRow}>
                            <Text style={styles.breakdownLabel}>
                                Delivery Fee
                            </Text>

                            <Text style={styles.breakdownValue}>
                                ${breakdown.deliveryFee.toFixed(2)}
                            </Text>
                        </View>

                        <View style={styles.breakdownRow}>
                            <Text style={styles.breakdownLabel}>
                                Surge Fee
                            </Text>

                            <Text style={styles.breakdownValue}>
                                ${breakdown.surgeFee.toFixed(2)}
                            </Text>
                        </View>

                        <View style={styles.separator} />

                        <View style={styles.breakdownRow}>
                            <Text style={styles.finalLabel}>
                                Final Amount
                            </Text>

                            <Text style={styles.finalValue}>
                                ${breakdown.finalPrice.toFixed(2)}
                            </Text>
                        </View>

                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={styles.closeModalButton}
                            onPress={() => setShowBreakdownModal(false)}
                        >
                            <Text style={styles.closeModalText}>
                                CLOSE
                            </Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    );
};

export default CartScreen;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 25
    },
    breakdownModal: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 25,
    },

    breakdownTitle: {
        fontSize: 22,
        color: '#111827',
        fontFamily: 'Sen-Bold',
        textAlign: 'center',
        marginBottom: 25,
    },

    breakdownRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 18,
        gap: 30
    },

    breakdownLabel: {
        fontSize: 16,
        color: '#6B7280',
        fontFamily: 'Sen-Regular',
    },

    breakdownValue: {
        fontSize: 16,
        color: '#111827',
        fontFamily: 'Sen-Medium',
    },

    separator: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 20,
    },

    finalLabel: {
        fontSize: 20,
        color: '#111827',
        fontFamily: 'Sen-Bold',
    },

    finalValue: {
        fontSize: 22,
        color: '#FF7A1A',
        fontFamily: 'Sen-Bold',
    },

    closeModalButton: {
        marginTop: 25,
        height: 55,
        borderRadius: 16,
        backgroundColor: '#FF7A1A',
        justifyContent: 'center',
        alignItems: 'center',
    },

    closeModalText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Sen-Bold',
    },
    addressInput: {
        fontSize: 16,
        color: '#111827',
        fontFamily: 'Sen-Regular',
    },

    back: {
        backgroundColor: 'grey',
        borderRadius: width * 0.1,
        padding: width * 0.03,
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#1B1E3C',
        marginHorizontal: width * 0.05,
        marginBottom: height * 0.015,
        borderRadius: 20,
        padding: width * 0.04,
    },
    image: {
        width: width * 0.25,
        height: width * 0.25,
        borderRadius: 15,
    },
    title: {
        color: '#FFF',
        fontSize: width * 0.06,
        marginLeft: 20,
        fontFamily: 'Sen-Medium',
    },
    price: {
        color: '#FFF',
        fontSize: width * 0.05,
        marginTop: 10,
    },
    qtyBtn: {
        width: width * 0.08,
        height: width * 0.08,
        borderRadius: width * 0.04,
        backgroundColor: '#3A3D5A',
        justifyContent: 'center',
        alignItems: 'center',
    },
    qty: {
        color: '#FFF',
        marginHorizontal: width * 0.04,
        fontSize: width * 0.04,
    },
    delete: {
        color: 'white',
        fontSize: width * 0.045,
        backgroundColor: 'red',
        borderRadius: 50,
        paddingHorizontal: width * 0.02,
        paddingVertical: height * 0.005,
    },
    orderButton: {
        backgroundColor: '#FF7A1A',
        height: height * 0.07,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.03,
    },
    botContainer: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        paddingHorizontal: width * 0.06,
        paddingTop: height * 0.03,
        paddingBottom: height * 0.03,
    },

    sizeBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    sizeText: {
        marginTop: 15,
        fontSize: 18,
        color: '#8A8E9B',
        fontFamily: 'Sen-Regular',
    },
    minus: {
        color: 'white',
    },
    plus: {
        color: 'white',

    },

    cartHeader: {
        flexDirection: 'row',
        gap: '35%',
        alignItems: 'center',
        fontSize: 14
    },
    done: {
        color: '#059C6A',
        fontFamily: 'Sen-Medium'
    },
    backButton: {
        width: width * 0.13,
        height: width * 0.13,
        borderRadius: width * 0.065,
        backgroundColor: '#ECF0F4',
        justifyContent: 'center',
        alignItems: 'center',
    },

    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    addressLabel: {
        fontSize: 14,
        color: '#A4ABC0',
        fontFamily: 'Sen-Medium',
    },

    editText: {
        color: '#FF8A2A',
        fontSize: 14,
        fontFamily: 'Sen-Bold',
        textDecorationLine: 'underline',
    },

    addressBox: {
        backgroundColor: '#F0F5FA',
        borderRadius: 14,
        paddingVertical: 22,
        paddingHorizontal: 20,
        marginTop: 18,
    },

    addressText: {
        color: '#9BA1B1',
        fontSize: 16,
        fontFamily: 'Sen-Regular',
    },

    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        marginTop: 40,
    },

    totalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    totalLabel: {
        fontSize: 14,
        color: '#A4ABC0',
        fontFamily: 'Sen-Regular',
        marginRight: 12,
    },

    totalPrice: {
        fontSize: 30,
        color: '#111827',
        fontFamily: 'Sen-Medium',
    },

    breakdownContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    breakdownText: {
        color: '#FF8A2A',
        fontSize: 14,
        fontFamily: 'Sen-Medium',
    },

    arrow: {
        color: '#7A7A7A',
        fontSize: 24,
        marginLeft: 6,
    },

    orderButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'Sen-Bold',
    },
    container: {
        flex: 1,
        backgroundColor: '#0D102B',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },

    info: {
        flex: 1,
        marginLeft: 15,
    },

    name: {
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'Sen-Bold',
    },

    quantityRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomContainer: {
        backgroundColor: '#FFF',
        padding: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },

    total: {
        fontSize: 30,
        fontFamily: 'Sen-Bold',
        marginBottom: 20,
    },

    placeOrderBtn: {
        backgroundColor: '#FF7A00',
        paddingVertical: 18,
        borderRadius: 16,
        alignItems: 'center',
    },

    placeOrderText: {
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'Sen-Bold',
    },
});