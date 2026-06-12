import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useCallback,
    useEffect,
    useRef,

} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CartItem {
    id: string;
    name: string;
    price: string;
    image: any;
    restaurant: string;
    quantity: number;
    size: string
}

interface CartContextType {
    cartItems: CartItem[];
    totalItems: number;

    addToCart: (item: CartItem) => void;

    increaseQuantity: (id: string) => void;

    decreaseQuantity: (id: string) => void;

    removeItem: (id: string) => void;
}

const Cart =
    createContext<CartContextType>(
        {} as CartContextType
    );

export const CartProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [cartItems, setCartItems] =
        useState<CartItem[]>([]);
    const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    useEffect(() => {
        const loadCart = async () => {
            try {
                const savedCart =
                    await AsyncStorage.getItem('cartItems');

                if (savedCart) {
                    setCartItems(JSON.parse(savedCart));
                }
            } catch (error) {
                console.log('Error loading cart:', error);
            }
        };

        loadCart();
    }, []);


    // useEffect(() => {
    //     const saveCart = async () => {
    //         try {
    //             await AsyncStorage.setItem(
    //                 'cartItems',
    //                 JSON.stringify(cartItems)
    //             );
    //         } catch (error) {
    //             console.log('Error saving cart:', error);
    //         }
    //     };

    //     saveCart();
    // }, [cartItems]);

    useEffect(() => {
        if (saveTimeout.current) {
            clearTimeout(saveTimeout.current);
        }

        saveTimeout.current = setTimeout(async () => {
            try {
                await AsyncStorage.setItem(
                    'cartItems',
                    JSON.stringify(cartItems)
                );
            } catch (error) {
                console.log('Error saving cart:', error);
            }
        }, 500);
 
        return () => {
            if (saveTimeout.current) {
                clearTimeout(saveTimeout.current);
            }
        };
    }, [cartItems]);

    const addToCart = useCallback((
        item: CartItem
    ) => {
        setCartItems(prev => {
            const existingItem =
                prev.find(
                    x => x.id === item.id
                );

            if (existingItem) {
                return prev.map(cart =>
                    cart.id === item.id
                        ? {
                            ...cart,
                            quantity:
                                cart.quantity +
                                item.quantity,
                        }
                        : cart
                );
            }

            return [...prev, item];
        });
    }, []);


    const increaseQuantity = useCallback((id: string) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                    : item
            )
        );
    }, []);

    const decreaseQuantity = useCallback((id: string) => {
        setCartItems(prev =>
            prev
                .map(item =>
                    item.id === id
                        ? {
                            ...item,
                            quantity: item.quantity - 1,
                        }
                        : item,
                )
                .filter(item => item.quantity > 0),
        );
    }, []);

    const removeItem = useCallback((id: string) => {
        setCartItems(prev =>
            prev.filter(item => item.id !== id),
        );
    }, []);

    const totalItems =
        cartItems.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );

    return (
        <Cart.Provider
            value={{
                cartItems,
                totalItems,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeItem,
            }}
        >
            {children}
        </Cart.Provider>
    );
};

export const useCart = () =>
    useContext(Cart);