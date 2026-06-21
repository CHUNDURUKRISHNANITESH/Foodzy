import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import RNLocation from 'react-native-location';
import { useNavigation } from '@react-navigation/native';
import { useRestaurant } from '../context/RestaurantContext';
import {
  Map,
  Camera,
  Marker
} from '@maplibre/maplibre-react-native';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
 
//adb shell input keyevent 82

type LocationType = { 
  latitude: number;
  longitude: number;
} | null;

const { width, height } = Dimensions.get('window');

const TrackOrderScreen = () => {
  const navigation = useNavigation<any>();

  const [currentLocation, setCurrentLocation] =
    useState<LocationType>(null);

  const subscriptionRef = React.useRef<null | (() => void)>(null);
  const { selectedRestaurant } = useRestaurant();

  if (!selectedRestaurant) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No restaurant selected</Text>
      </View>
    );
  }

  const startLocationUpdates = async () => {
    subscriptionRef.current = RNLocation.subscribeToLocationUpdates(
      (locations) => {
        if (!locations?.length) return;

        const { latitude, longitude } = locations[0];
        setCurrentLocation({ latitude, longitude });
      }
    );
  };
  console.log("showing coordinates")
  console.log(subscriptionRef.current)

  React.useEffect(() => {
    startLocationUpdates();

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current();
      }
    };
  }, []);

  return (
    <View style={styles.container}>

      {currentLocation && (
        <Map
          style={{ flex: 1 }}
          mapStyle="https://api.maptiler.com/maps/streets/style.json?key=jZZkhgZs93Nj55GxO7Bu"
        >
          <Camera
            center={[currentLocation.longitude, currentLocation.latitude]}
            zoom={14}
          />

          <Marker
            id="current"
            lngLat={[
              currentLocation.longitude,
              currentLocation.latitude,
            ]}
          >
            <View style={styles.yellowPulseOuter}>
              <View style={styles.yellowPulseInner} />
            </View>
          </Marker>
        </Map>
      )}

      <View style={styles.header}>
        {/* <TouchableOpacity onPress={() => {
          // navigation.reset({
          //   index: 0,
          //   routes: [{ name: 'Home' }],
          //   orderPlaced: true
          // })
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'Home',
                params: {
                  orderPlaced: true,
                },
              },
            ],
          });
        }
        }>
          <View style={styles.backBtn}>
            <Icon name="chevron-back" size={23} color="white" />
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            })
          }
        >
          <View style={styles.backBtn}>
            <Icon
              name="chevron-back"
              size={23}
              color="white"
            />
          </View>
        </TouchableOpacity>

        <Text style={styles.title}>Track Order</Text>
      </View>

      <View style={styles.bottomSheet}>

        <View style={styles.dragHandle} />
        <View style={styles.orderInfoContainer}>

          <Image
            source={{ uri: selectedRestaurant.image }}
            style={styles.restaurantImage}
          />

          <View style={styles.infoSection}>

            <Text style={styles.restaurantName}>
              {selectedRestaurant.name}
            </Text>

            <Text style={styles.orderDate}>
              Order At 06 Sept, 10:00pm
            </Text>
          </View>
        </View>
      </View>
    </View >
  );
};

export default TrackOrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  backBtn: {
    width: width * 0.11,
    height: width * 0.11,
    borderRadius: width * 0.06,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    marginLeft: 15,
    fontSize: width * 0.046,
    fontFamily: 'Sen-Regular',
    color: '#000',
  },

  redMarkerOuter: {
    width: width * 0.08,
    height: width * 0.08,
    borderRadius: width * 0.04,
    backgroundColor: 'rgba(255,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  redMarkerInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'red',
  },
  yellowPulseOuter: {
    width: width * 0.10,
    height: width * 0.10,
    borderRadius: width * 0.05,
  },
  yellowPulseInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#FFB200',
    borderWidth: 2,
    borderColor: 'white',
  },
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 22,
    paddingTop: 15,
    paddingBottom: 30,
    position: 'absolute',
    top: 670,
    left: 20,
    right: 20,
    marginHorizontal: -20,
    height: 180
  },
  dragHandle: {
    alignSelf: 'center',
    width: width * 0.18,
    height: height * 0.007,
    borderRadius: 3,
    backgroundColor: '#D8E3ED',
    marginBottom: 25,
  },

  orderInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  restaurantImage: {
    width: width * 0.18,
    height: width * 0.18,
    borderRadius: width * 0.04,
  },

  infoSection: {
    marginLeft: 15,
    flex: 1
  },

  restaurantName: {
    fontSize: width * 0.061,
    color: '#181C2E',
    fontFamily: 'Sen-Bold',
  },

  orderDate: {
    marginTop: 5,
    color: '#98A2B3',
    fontSize: width * 0.038,
    fontFamily: 'Sen-Regular',
  },

  orderItem: {
    marginTop: 8,
    color: '#6B7280',
    fontSize: 16,
    fontFamily: 'Sen-Medium',
  }
});