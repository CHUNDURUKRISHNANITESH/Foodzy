import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export default function App() {
    const [location, setLocation] = useState(null);

    const requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {
            return true;
        }
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Geolocation Permission',
                    message: 'Can we access your location?',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            return false;
        }
    };

    const getLocation = async () => {
        const hasPermission = await requestLocationPermission();

        if (!hasPermission) {
            console.log('Location permission denied');
            return;
        }

        Geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
                setLocation(position);
            },
            (error) => {
                console.log(error.code, error.message);
                setLocation(null);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>React Native Geolocation CLI</Text>
            <Button title="Get Location" onPress={getLocation} />
            {location && (
                <View style={styles.resultBox}>
                    <Text>Latitude: {location.coords.latitude}</Text>
                    <Text>Longitude: {location.coords.longitude}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 20, marginBottom: 20 },
    resultBox: { marginTop: 20 },
});




// import React, { useEffect, useState } from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     TouchableOpacity,
//     Dimensions,
//     Image,
//     PermissionsAndroid,
//     Platform,
// } from 'react-native';

// import MapView, { Marker, Camera } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Feather from 'react-native-vector-icons/Feather';
// import { useNavigation } from '@react-navigation/native';
// import { useRestaurant } from '../context/RestaurantContext';

// const { width, height } = Dimensions.get('window');

// const TrackOrderScreen = () => {
//     const navigation = useNavigation<any>();
//     const { selectedRestaurant } = useRestaurant();

//     const [location, setLocation] = useState({
//         latitude: 20.5937,
//         longitude: 78.9629,
//     });
//     const requestLocationPermission = async () => {
//         if (Platform.OS === 'android') {
//             await PermissionsAndroid.request(
//                 PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//             );
//         }
//     };
//     useEffect(() => {
//         requestLocationPermission();

//         const watchId = Geolocation.watchPosition(
//             position => {
//                 const { latitude, longitude } = position.coords;

//                 setLocation({
//                     latitude,
//                     longitude,
//                 });
//             },
//             error => console.log(error),
//             {
//                 enableHighAccuracy: true,
//                 distanceFilter: 10,
//                 interval: 5000,
//                 fastestInterval: 2000,
//             }
//         );

//         return () => Geolocation.clearWatch(watchId);
//     }, []);

//     if (!selectedRestaurant) {
//         return (
//             <View style={styles.center}>
//                 <Text>No restaurant selected</Text>
//             </View>
//         );
//     }

//     return (
//         <SafeAreaView style={styles.container}>

//             {/* MAP */}
//             <MapView
//                 style={styles.map}
//                 showsUserLocation={false}
//                 followsUserLocation={true}
//                 region={{
//                     latitude: location.latitude,
//                     longitude: location.longitude,
//                     latitudeDelta: 0.01,
//                     longitudeDelta: 0.01,
//                 }}
//             >
//                 <Marker
//                     coordinate={{
//                         latitude: location.latitude,
//                         longitude: location.longitude,
//                     }}
//                     title="You are here"
//                 >
//                     <View style={styles.userMarker} />
//                 </Marker>
//                 <Marker
//                     coordinate={{
//                         latitude: 20.5937,
//                         longitude: 78.9629,
//                     }}
//                     title={selectedRestaurant.name}
//                 >
//                     <View style={styles.restaurantMarker} />
//                 </Marker>

//             </MapView>

//             <View style={styles.header}>
//                 <TouchableOpacity
//                     style={styles.backButton}
//                     onPress={() => navigation.goBack()}
//                 >
//                     <Feather name="chevron-left" size={24} color="#FFF" />
//                 </TouchableOpacity>

//                 <Text style={styles.headerTitle}>Track Order</Text>
//             </View>

//             <View style={styles.bottomSheet}>
//                 <View style={styles.dragHandle} />

//                 <View style={styles.orderInfoContainer}>
//                     <Image
//                         source={selectedRestaurant.image}
//                         style={styles.restaurantImage}
//                     />

//                     <View style={styles.infoSection}>
//                         <Text style={styles.restaurantName}>
//                             {selectedRestaurant.name}
//                         </Text>

//                         <Text style={styles.orderDate}>
//                             Order is being prepared...
//                         </Text>
//                     </View>
//                 </View>
//             </View>

//         </SafeAreaView>
//     );
// };

// export default TrackOrderScreen;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },

//     map: {
//         flex: 1,
//     },

//     header: {
//         position: 'absolute',
//         top: 60,
//         left: 20,
//         flexDirection: 'row',
//         alignItems: 'center',
//     },

//     backButton: {
//         width: 45,
//         height: 45,
//         borderRadius: 22,
//         backgroundColor: '#000',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },

//     headerTitle: {
//         marginLeft: 15,
//         fontSize: 22,
//         fontWeight: 'bold',
//         color: '#000',
//     },

//     bottomSheet: {
//         position: 'absolute',
//         bottom: 0,
//         width: '100%',
//         backgroundColor: '#fff',
//         borderTopLeftRadius: 30,
//         borderTopRightRadius: 30,
//         padding: 20,
//     },

//     dragHandle: {
//         width: 60,
//         height: 5,
//         backgroundColor: '#ccc',
//         alignSelf: 'center',
//         borderRadius: 3,
//         marginBottom: 20,
//     },

//     orderInfoContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },

//     restaurantImage: {
//         width: 60,
//         height: 60,
//         borderRadius: 12,
//     },

//     infoSection: {
//         marginLeft: 15,
//     },

//     restaurantName: {
//         fontSize: 18,
//         fontWeight: 'bold',
//     },

//     orderDate: {
//         marginTop: 5,
//         color: '#777',
//     },

//     userMarker: {
//         width: 18,
//         height: 18,
//         borderRadius: 9,
//         backgroundColor: 'blue',
//         borderWidth: 2,
//         borderColor: '#fff',
//     },

//     restaurantMarker: {
//         width: 18,
//         height: 18,
//         borderRadius: 9,
//         backgroundColor: 'red',
//         borderWidth: 2,
//         borderColor: '#fff',
//     },

//     center: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
// });








// import React from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     TouchableOpacity,
//     Dimensions,
//     Image,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Feather from 'react-native-vector-icons/Feather';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { useRestaurant } from '../context/RestaurantContext';
// import {
//     Map,
//     Camera,
//     Marker,
// } from '@maplibre/maplibre-react-native';
// import Geolocation from '@react-native-community/geolocation';

// const { width, height } = Dimensions.get('window');
// //adb shell input keyevent 82

// const TrackOrderScreen = () => {
//     const navigation = useNavigation<any>();
//     const lat = 20.5937;
//     const lng = 78.9629;
//     const { selectedRestaurant } = useRestaurant();

//     if (!selectedRestaurant) {
//         return (
//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//                 <Text>No restaurant selected</Text>
//             </View>
//         );
//     }

//     return (
//         <SafeAreaView style={styles.container}>

//             <View style={styles.container}>
//                 <Map
//                     style={styles.map}
//                     mapStyle="https://demotiles.maplibre.org/style.json"
//                 />
//             </View>

//             <View style={styles.header}>
//                 <TouchableOpacity
//                     style={styles.backButton}
//                     onPress={() => navigation.goBack()}
//                 >
//                     <Feather
//                         name="chevron-left"
//                         size={24}
//                         color="#FFFFFF"
//                     />
//                 </TouchableOpacity>

//                 <Text style={styles.headerTitle}>
//                     Track Order
//                 </Text>
//             </View>

//             {/* <View style={styles.mapContainer}>

//                 <View style={styles.greenPatch1} />
//                 <View style={styles.greenPatch2} />
//                 <View style={styles.orangePatch1} />
//                 <View style={styles.orangePatch2} />
//                 <View style={styles.routeContainer}>
//                     <View style={styles.routeLine1} />
//                     <View style={styles.routeLine2} />
//                     <View style={styles.routeLine3} />
//                     <View style={styles.routeLine4} />
//                 </View>

//                 <View style={styles.destinationMarker}>
//                     <Ionicons
//                         name="location-sharp"
//                         size={32}
//                         color="#FFFFFF"
//                     />
//                 </View>

//                 <View style={styles.currentMarkerOuter}>
//                     <View style={styles.currentMarkerMiddle}>
//                         <View style={styles.currentMarkerInner} />
//                     </View>
//                 </View>
//             </View> */}

//             <View style={styles.bottomSheet}>

//                 <View style={styles.dragHandle} />

//                 <View style={styles.orderInfoContainer}>

//                     <Image
//                         source={selectedRestaurant.image}
//                         style={styles.restaurantImage}
//                     />

//                     <View style={styles.infoSection}>

//                         <Text style={styles.restaurantName}>
//                             {selectedRestaurant.name}
//                         </Text>

//                         <Text style={styles.orderDate}>
//                             Order At 06 Sept, 10:00pm
//                         </Text>

//                         {/* <Text style={styles.orderItem}>
//                             ⭐ {selectedRestaurant.rating}
//                         </Text>

//                         <Text style={styles.orderItem}>
//                             ⏱ {selectedRestaurant.time}
//                         </Text>

//                         <Text style={styles.orderItem}>
//                             {selectedRestaurant.categories}
//                         </Text> */}

//                     </View>
//                 </View>
//             </View>
//         </SafeAreaView>
//     );
// };

// export default TrackOrderScreen;

// const styles = StyleSheet.create({
//     map: {
//         flex: 1,
//     },
//     container: {
//         flex: 1,
//         backgroundColor: '#D8D8D8',
//     },

//     mapContainer: {
//         flex: 1,
//         backgroundColor: '#D9D9D9',
//         overflow: 'hidden',
//     },

//     header: {
//         position: 'absolute',
//         top: 60,
//         left: 25,
//         flexDirection: 'row',
//         alignItems: 'center',
//         zIndex: 100,
//     },

//     backButton: {
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//         backgroundColor: '#181C2E',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },

//     headerTitle: {
//         marginLeft: 18,
//         fontSize: 24,
//         color: '#181C2E',
//         fontFamily: 'Sen-Bold',
//     },

//     greenPatch1: {
//         position: 'absolute',
//         top: height * 0.22,
//         right: 30,
//         width: 180,
//         height: 140,
//         backgroundColor: '#8AD991',
//         borderRadius: 40,
//         transform: [{ rotate: '-25deg' }],
//     },

//     greenPatch2: {
//         position: 'absolute',
//         bottom: 150,
//         left: 50,
//         width: 110,
//         height: 90,
//         backgroundColor: '#8AD991',
//         borderRadius: 40,
//         transform: [{ rotate: '15deg' }],
//     },

//     orangePatch1: {
//         position: 'absolute',
//         top: 80,
//         right: 40,
//         width: 120,
//         height: 80,
//         backgroundColor: '#F4CD87',
//         borderRadius: 40,
//     },

//     orangePatch2: {
//         position: 'absolute',
//         bottom: 70,
//         right: 80,
//         width: 130,
//         height: 90,
//         backgroundColor: '#F4CD87',
//         borderRadius: 45,
//     },

//     routeContainer: {
//         position: 'absolute',
//         top: 180,
//         left: 80,
//     },

//     routeLine1: {
//         width: 170,
//         height: 6,
//         backgroundColor: '#FF9800',
//         transform: [{ rotate: '-30deg' }],
//     },

//     routeLine2: {
//         width: 6,
//         height: 70,
//         backgroundColor: '#FF9800',
//         marginLeft: 155,
//     },

//     routeLine3: {
//         width: 120,
//         height: 6,
//         backgroundColor: '#FF9800',
//         transform: [{ rotate: '-35deg' }],
//         marginLeft: 50,
//     },

//     routeLine4: {
//         width: 6,
//         height: 100,
//         backgroundColor: '#FF6D00',
//         marginLeft: 50,
//     },

//     destinationMarker: {
//         position: 'absolute',
//         left: 40,
//         bottom: 210,
//         width: 70,
//         height: 70,
//         borderRadius: 35,
//         backgroundColor: '#FF463A',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },

//     currentMarkerOuter: {
//         position: 'absolute',
//         top: 170,
//         right: 80,
//         width: 90,
//         height: 90,
//         borderRadius: 45,
//         backgroundColor: 'rgba(255,167,38,0.2)',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },

//     currentMarkerMiddle: {
//         width: 60,
//         height: 60,
//         borderRadius: 30,
//         backgroundColor: 'rgba(255,167,38,0.4)',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },

//     currentMarkerInner: {
//         width: 24,
//         height: 24,
//         borderRadius: 12,
//         backgroundColor: '#FFC107',
//     },

//     bottomSheet: {
//         backgroundColor: '#FFFFFF',
//         borderTopLeftRadius: 35,
//         borderTopRightRadius: 35,
//         paddingHorizontal: 22,
//         paddingTop: 15,
//         paddingBottom: 30,
//     },

//     dragHandle: {
//         alignSelf: 'center',
//         width: 70,
//         height: 6,
//         borderRadius: 3,
//         backgroundColor: '#D9E0E8',
//         marginBottom: 25,
//     },

//     orderInfoContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },

//     restaurantImage: {
//         width: 70,
//         height: 70,
//         borderRadius: 15,
//     },

//     infoSection: {
//         marginLeft: 15,
//         flex: 1,
//     },

//     restaurantName: {
//         fontSize: 24,
//         color: '#181C2E',
//         fontFamily: 'Sen-Bold',
//     },

//     orderDate: {
//         marginTop: 5,
//         color: '#98A2B3',
//         fontSize: 15,
//         fontFamily: 'Sen-Regular',
//     },

//     orderItem: {
//         marginTop: 8,
//         color: '#6B7280',
//         fontSize: 16,
//         fontFamily: 'Sen-Medium',
//     },
// });