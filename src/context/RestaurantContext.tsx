import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Restaurant = {
    id: string;
    name: string;
    image: any;
    carouselImages: string[];
    
};

type RestaurantContextType = {
    selectedRestaurant: Restaurant | null;
    setSelectedRestaurant: (restaurant: Restaurant) => Promise<void>;
    clearRestaurant: () => Promise<void>;
    loading: boolean;
};

const storageKey = 'SELECTED_RESTAURANT';

const RestaurantContext = createContext<RestaurantContextType | undefined>(
    undefined
);

export const RestaurantProvider = ({ children }: { children: ReactNode }) => {
    const [selectedRestaurant, setSelectedRestaurantState] =
        useState<Restaurant | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadRestaurant();
    }, []);

    const loadRestaurant = async () => {
        try {
            const data = await AsyncStorage.getItem(storageKey);
            if (data) {
                setSelectedRestaurantState(JSON.parse(data));
            }
        } catch (error) {
            console.log('Error loading restaurant:', error);
        } finally {
            setLoading(false);
        }
    };

    const setSelectedRestaurant = async (restaurant: Restaurant) => {
        try {
            setSelectedRestaurantState(restaurant);
            await AsyncStorage.setItem(storageKey, JSON.stringify(restaurant));
        } catch (error) {
            console.log('Error saving restaurant:', error);
        }
    };

    const clearRestaurant = async () => {
        try {
            setSelectedRestaurantState(null);
            await AsyncStorage.removeItem(storageKey);
        } catch (error) {
            console.log('Error clearing restaurant:', error);
        }
    };

    return (
        <RestaurantContext.Provider
            value={{
                selectedRestaurant,
                setSelectedRestaurant,
                clearRestaurant,
                loading,
            }}
        >
            {children}
        </RestaurantContext.Provider>
    );
};

export const useRestaurant = () => {
    const context = useContext(RestaurantContext);
    if (!context) {
        throw new Error('useRestaurant must be used inside RestaurantProvider');
    }
    return context;
};


// import React, {
//     createContext,
//     useContext,
//     useState,
//     ReactNode,
//     useEffect,
// } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export type Restaurant = {
//     id: string;
//     name: string;
//     image: any;
// };

// type RestaurantContextType = {
//     selectedRestaurant: Restaurant | null;
//     setSelectedRestaurant: (restaurant: Restaurant) => Promise<void>;
//     clearRestaurant: () => Promise<void>;
//     loading: boolean;
// };

// const STORAGE_KEY = 'SELECTED_RESTAURANT';

// const RestaurantContext = createContext<RestaurantContextType | undefined>(
//     undefined
// );

// export const RestaurantProvider = ({ children }: { children: ReactNode }) => {
//     const [selectedRestaurant, setSelectedRestaurantState] =
//         useState<Restaurant | null>(null);

//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         loadRestaurant();
//     }, []);

//     const loadRestaurant = async () => {
//         try {
//             const data = await AsyncStorage.getItem(STORAGE_KEY);
//             if (data) {
//                 setSelectedRestaurantState(JSON.parse(data));
//             }
//         } catch (error) {
//             console.log('Error loading restaurant:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const setSelectedRestaurant = async (restaurant: Restaurant) => {
//         try {
//             setSelectedRestaurantState(restaurant);
//             await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(restaurant));
//         } catch (error) {
//             console.log('Error saving restaurant:', error);
//         }
//     };

//     const clearRestaurant = async () => {
//         try {
//             setSelectedRestaurantState(null);
//             await AsyncStorage.removeItem(STORAGE_KEY);
//         } catch (error) {
//             console.log('Error clearing restaurant:', error);
//         }
//     };

//     return (
//         <RestaurantContext.Provider
//             value={{
//                 selectedRestaurant,
//                 setSelectedRestaurant,
//                 clearRestaurant,
//                 loading,
//             }}
//         >
//             {children}
//         </RestaurantContext.Provider>
//     );
// };

// export const useRestaurant = () => {
//     const context = useContext(RestaurantContext);
//     if (!context) {
//         throw new Error('useRestaurant must be used inside RestaurantProvider');
//     }
//     return context;
// };