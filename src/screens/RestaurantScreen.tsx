import React, { useRef, useState } from 'react';
import {
    View,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
    Text,
    Dimensions
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import { burgerData, FoodItem, pizzaData, sandwichData } from '../items/foodItem';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../navigation/types';
import ViewCart from '../components/ViewCart';
import { useRestaurant } from '../context/RestaurantContext';

//adb shell input keyevent 82

const { width, height } = Dimensions.get('window');

type RestaurantRouteProp = RouteProp<
    RootStackParamList,
    'restaurantScreen'
>;
const categories = [
    'Burger',
    'Sandwich',
    'Pizza',
    'Drinks',
];

interface CategoryTabsProps {
    selected: string;
    setSelected: (item: string) => void;
}

interface FoodCardProps {
    item: FoodItem;
}
const FoodCard = ({ item }: FoodCardProps) => {
    const navigation = useNavigation<any>();
    return (
        <View style={styles.card}>
            <Image
                source={item.image}
                style={styles.image1}
            />

            <Text style={styles.name}>
                {item.name}
            </Text>

            <Text style={styles.restaurant}>
                {item.restaurant}
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    ${item.price}
                </Text>

                <TouchableOpacity activeOpacity={0.9} style={styles.addBtn} onPress={() => navigation.navigate('foodDetails', { burgerData: item })}>
                    <Text style={styles.plus}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const CategoryTabs = ({
    selected,
    setSelected,
}: CategoryTabsProps) => {
    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={item => item}
            contentContainerStyle={{
                paddingHorizontal: 20,
            }}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={[
                        styles.tab,
                        selected === item && styles.active,
                    ]}
                    onPress={() => setSelected(item)}>
                    <Text
                        style={[
                            styles.text,
                            selected === item &&
                            styles.activeText,
                        ]}>
                        {item}
                    </Text>
                </TouchableOpacity>
            )}
        />
    );
};


const RestaurantScreen = () => {

    const { selectedRestaurant } = useRestaurant();
    console.log(selectedRestaurant)
    const navigation = useNavigation<any>();
    if (!selectedRestaurant) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No restaurant selected</Text>
            </View>
        );
    }
    const [selected, setSelected] =
        useState('Burger');
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);
    const restaurantImages = selectedRestaurant.carouselImages;

    const displayData =
        selected === 'Burger'
            ? burgerData
            : selected === 'Pizza'
                ? pizzaData
                : sandwichData;

    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: height * 0.04, backgroundColor: 'white', }}>
                <View style={styles.carouselContainer}>
                    <FlatList
                        ref={flatListRef}
                        data={restaurantImages}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(_, index) => index.toString()}
                        onMomentumScrollEnd={(event) => {
                            const index = Math.round(
                                event.nativeEvent.contentOffset.x / width
                            );

                            setActiveIndex(index);
                        }}
                        renderItem={({ item }) => (
                            <ImageBackground
                                source={{uri:item}}
                                style={styles.banner}
                                imageStyle={styles.image}
                            />
                        )}
                    />

                    <TouchableOpacity style={styles.fixedBackBtn} onPress={() => navigation.goBack()}>
                        <Icon
                            name="chevron-back"
                            size={24}
                            color="#181C2E"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.fixedMenuBtn}>
                        <Icon
                            name="ellipsis-horizontal"
                            size={24}
                            color="#181C2E"
                        />
                    </TouchableOpacity>

                    <View style={styles.dotContainer}>
                        {restaurantImages.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.dot,
                                    activeIndex === index &&
                                    styles.activeDot,
                                ]}
                            />
                        ))}
                    </View>
                </View>

                <View style={styles.container}>
                    <View style={styles.stats}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <Image source={require('../assets/Star.png')}></Image>
                            {/* <Text style={{ fontFamily: 'Sen-Bold' }}>{selectedRestaurant.rating}</Text> */}
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <Image source={require('../assets/deliveryTruck.png')}></Image>
                            <Text style={{ fontFamily: 'Sen-Bold' }}>Free</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <Image source={require('../assets/Clock.png')}></Image>
                            {/* <Text style={{ fontFamily: 'Sen-Bold' }}>{selectedRestaurant.time}</Text> */}
                        </View>

                    </View>
                </View>

                <View style={{ paddingHorizontal: '6%' }}>
                    <Text style={styles.title}>
                        {selectedRestaurant.name}
                    </Text>

                    <Text style={styles.description}>
                        Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
                    </Text>
                </View>

                <CategoryTabs
                    selected={selected}
                    setSelected={setSelected}
                />

                <Text
                    style={{
                        fontSize: 24,
                        fontFamily: 'Sen-Bold',
                        margin: 20,
                        paddingLeft: '1%'
                    }}>
                    {selected} ({displayData.length})
                </Text>

                <FlatList
                    scrollEnabled={false}
                    numColumns={2}
                    contentContainerStyle={{
                        paddingHorizontal: 15,
                    }}
                    data={displayData}
                    keyExtractor={item => String(item.id)}
                    renderItem={({ item }) => (
                        <FoodCard item={item} />
                    )}
                    showsHorizontalScrollIndicator={false}
                />
            </ScrollView>

            <ViewCart />
        </SafeAreaView>
    );
};

export default RestaurantScreen;

const styles = StyleSheet.create({
    fixedBackBtn: {
        position: 'absolute',
        top: 20,
        left: 20,

        width: 50,
        height: 50,
        borderRadius: 25,

        backgroundColor: '#FFF',

        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%',
        zIndex: 999,
    },

    fixedMenuBtn: {
        position: 'absolute',
        top: 20,
        right: 20,
        marginTop: '10%',
        width: 50,
        height: 50,
        borderRadius: 25,

        backgroundColor: '#FFF',

        justifyContent: 'center',
        alignItems: 'center',

        zIndex: 999,
    },
    carouselContainer: {
        position: 'relative',
    },

    dotContainer: {
        position: 'absolute',
        bottom: 15,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#BDBDBD',
        marginHorizontal: 4,
    },

    activeDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#FFF',
    },
    card: {
        width: 170,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginRight: 15,
        marginTop: '1%',
        elevation: 2,
    },

    image1: {
        width: 120,
        height: 120,
        alignSelf: 'center',
    },

    name: {
        fontFamily: 'Sen-Bold',
        fontSize: 18,
    },

    restaurant: {
        color: '#999',
        marginTop: 5,
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        alignItems: 'center',
    },

    price: {
        fontFamily: 'Sen-Bold',
        fontSize: 18,
    },

    addBtn: {
        width: 35,
        height: 35,
        borderRadius: 18,
        backgroundColor: '#F58D1D',
        justifyContent: 'center',
        alignItems: 'center',
    },

    plus: {
        color: '#fff',
        fontSize: 22,
    },

    tab: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginRight: 10,
        marginTop: '13%'
    },

    active: {
        backgroundColor: '#F58D1D',
        borderColor: '#F58D1D',
    },

    text: {
        color: '#333',
        fontFamily: 'Sen-Regular',
    },

    activeText: {
        color: '#fff',
    },
    container: {
        paddingHorizontal: 20,
        marginTop: 15,
        flexDirection: 'row',
        gap: 10
    },

    stats: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 40,
    },

    title: {
        fontSize: 28,
        fontFamily: 'Sen-Bold',
        marginTop: 15,
    },

    description: {
        color: '#999',
        marginTop: 10,
        lineHeight: 22,
    },
    banner: {
        width: width,
        height: height * 0.38,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    image: {
        borderRadius: 25,
    },

    backBtn: {
        backgroundColor: '#fff',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%',
    },

    menuBtn: {
        backgroundColor: '#fff',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%'
    },
});