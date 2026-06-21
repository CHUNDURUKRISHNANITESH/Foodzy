import React from 'react'
import { Dimensions, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native'
import { useCart } from '../context/Cart';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

type ViewCartProps = {
    previousScreen?: string;
};

const ViewCart = ({ previousScreen }: ViewCartProps) => {
    const { cartItems, totalItems } = useCart();
    const navigation = useNavigation<any>();

    const totalPrice = cartItems.reduce(
        (sum, item) =>
            sum +
            Number(item.price) * item.quantity,
        0,
    );
    return (
        <View>
            {totalItems > 0 && (
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.fixedViewCart}
                    onPress={() =>
                        navigation.navigate('cart', {
                            previousScreen,
                        })
                    }
                >
                    <View style={styles.cartCountCircle}>
                        <Text style={styles.cartCountText}>
                            {totalItems}
                        </Text>
                    </View>

                    <Text style={styles.viewCartText}>
                        View Cart
                    </Text>

                    <Text style={styles.viewCartPrice}>
                        ${totalPrice}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

export default ViewCart

const styles = StyleSheet.create({
    fixedViewCart: {
        position: 'absolute',
        bottom: height * 0.0,
        left: width * 0.05,
        right: width * 0.05,
        backgroundColor: '#FF7A00',
        borderRadius: width * 0.045,
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.05,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 10,
        zIndex: 999,
    },

    viewCartContainer: {
        marginHorizontal: width * 0.05,
        marginTop: height * 0.025,
        backgroundColor: '#FF7A00',
        borderRadius: width * 0.045,
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.05,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    cartCountCircle: {
        width: width * 0.08,
        height: width * 0.08,
        borderRadius: width * 0.04,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },

    cartCountText: {
        color: '#FF7A00',
        fontSize: width * 0.04,
        fontFamily: 'Sen-Bold',
    },

    viewCartText: {
        flex: 1,
        marginLeft: width * 0.04,
        color: '#FFFFFF',
        fontSize: width * 0.045,
        fontFamily: 'Sen-Bold',
    },

    viewCartPrice: {
        color: '#FFFFFF',
        fontSize: width * 0.045,
        fontFamily: 'Sen-Bold',
    },
});
