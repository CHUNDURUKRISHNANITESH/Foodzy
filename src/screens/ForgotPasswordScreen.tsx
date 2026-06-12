import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from 'react-native';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import { Animated } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function ForgotPasswordScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [emailBorder, setEmailBorder] = useState('transparent');

  const shiftAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', (e) => {
      const keyboardHeight = e.endCoordinates.height;
      Animated.timing(shiftAnim, {
        toValue: -keyboardHeight * 0.1,
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

  const handleSendCode = () => {
    if (!email.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Email is required',
        position: 'top',
        props: { backgroundColor: 'red' },
      });
      setEmailBorder('red');
      return;
    }
    else {
          Toast.show({ type: 'success', text1: 'Code sent to your email 🎉' });
          navigation.navigate('Verification', { email });
        }
    setEmailBorder('transparent');
  };

  return (
        <View style={styles.mainContainer}>
          <ImageBackground style={styles.topContainer}>
            <Image
              source={require('../assets/Ellipsee.png')}
              style={styles.leftDesign}
            />
            <Image
              source={require('../assets/Vector.png')}
              style={styles.rightDesign}
            />

            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="chevron-left" size={width * 0.05} color="black" />
            </TouchableOpacity>

            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.subtitle}>
              Please sign in to your existing account
            </Text>
          </ImageBackground>

          <Animated.View style={{ flex: 1, backgroundColor: 'black', transform: [{ translateY: shiftAnim }] }}>

            <View style={styles.bottomContainer}>
              <Text style={styles.label}>EMAIL</Text>
              <TextInput
                placeholder="example@gmail.com"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                style={[styles.input, { borderColor: emailBorder }]}
              />

              <TouchableOpacity style={styles.button} onPress={handleSendCode}>
                <Text style={styles.buttonText}>SEND CODE</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
  );
}

const styles = StyleSheet.create({
  leftDesign: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.42,
    height: width * 0.42,
    resizeMode: 'contain',
  },
  rightDesign: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: width * 0.26,
    height: height * 0.42,
    resizeMode: 'contain',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#0E122B',
  },
  topContainer: {
    height: height * 0.3,
    paddingHorizontal: width * 0.06,
    justifyContent: 'center',
  },
  backButton: {
    width: width * 0.13,
    height: width * 0.13,
    borderRadius: width * 0.065,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.05,
  },
  title: {
    color: 'white',
    fontSize: width * 0.09,
    fontFamily: 'Sen-Bold',
    textAlign: 'center',
  },
  subtitle: {
    color: 'white',
    fontSize: width * 0.045,
    marginTop: height * 0.015,
    fontFamily: 'Sen-Regular',
    textAlign: 'center',
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: width * 0.08,
    borderTopRightRadius: width * 0.08,
    paddingHorizontal: width * 0.06,
    paddingTop: height * 0.03,
  },
  label: {
    fontSize: width * 0.035,
    marginBottom: height * 0.015,
    fontFamily: 'Sen-Regular',
  },
  input: {
    backgroundColor: '#F1F4F9',
    borderWidth: 1,
    borderRadius: width * 0.03,
    paddingVertical: height * 0.025,
    paddingHorizontal: width * 0.05,
    fontFamily: 'Sen-Regular',
    fontSize: width * 0.04,
    borderColor: 'transparent',
  },
  button: {
    backgroundColor: '#FF7A1A',
    paddingVertical: height * 0.025,
    borderRadius: width * 0.035,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.05,
  },
  buttonText: {
    color: 'white',
    fontSize: width * 0.042,
    fontFamily: 'Sen-Bold',
  },
});
