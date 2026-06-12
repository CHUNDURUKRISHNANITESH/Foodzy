import React, { useEffect, useRef, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import { Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Animated } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function SignupScreen({ navigation, }: any) {

  const [nameBorder, setNameBorder] = useState('transparent');
  const [emailBorder, setEmailBorder] = useState('transparent');
  const [passwordBorder, setPasswordBorder] = useState('transparent');
  const [confirmBorder, setConfirmBorder] = useState('');
  const [secure, setSecure] = useState(true);
  const [confirmSecure, setConfirmSecure] = useState(true)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const shiftAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', (e) => {
      const keyboardHeight = e.endCoordinates.height;
      Animated.timing(shiftAnim, {
        toValue: -keyboardHeight * 0.9,
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

  const validateSignup = () => {
    if (!name && !email && !password && !confirmBorder) {
      Toast.show({ type: 'error', text1: 'All fields are empty' });
      setNameBorder('red'); setEmailBorder('red'); setPasswordBorder('red'); setConfirmBorder('red');
      return;
    }

    let valid = true;

    if (!name.trim()) {
      Toast.show({ type: 'error', text1: 'Name is required' });
      setNameBorder('red'); valid = false;
    } else setNameBorder('transparent');

    if (!email.trim()) {
      Toast.show({ type: 'error', text1: 'Email is required' });
      setEmailBorder('red'); valid = false;
    } else if (!email.endsWith('@gmail.com')) {
      Toast.show({ type: 'error', text1: 'Email must be @gmail.com' });
      setEmailBorder('red'); valid = false;
    } else setEmailBorder('transparent');

    if (!password) {
      Toast.show({ type: 'error', text1: 'Password is required' });
      setPasswordBorder('red'); valid = false;
    } else if (password.length < 6) {
      Toast.show({ type: 'error', text1: 'Minimum 6 characters' });
      setPasswordBorder('red'); valid = false;
    } else setPasswordBorder('transparent');

    if (!confirmBorder) {
      Toast.show({ type: 'error', text1: 'Please re-type password' });
      setConfirmBorder('red'); valid = false;
    } else if (password !== confirmBorder) {
      Toast.show({ type: 'error', text1: 'Passwords do not match' });
      setConfirmBorder('red'); valid = false;
    } else setConfirmBorder('transparent');

    if (valid) {
      Toast.show({ type: 'success', text1: 'Signup Successful 🎉' });
      navigation.navigate('Login');
    }
  };


  return (
        <View style={styles.mainContainer}>

          <View style={styles.topContainer}>

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
              onPress={() =>
                navigation.goBack()
              }>

              <Icon
                name="chevron-left"
                size={width * 0.05}
                color="black"
              />

            </TouchableOpacity>

            <Text style={styles.title}>
              Sign Up
            </Text>

            <Text style={styles.subtitle}>
              Please sign up to get
              started
            </Text>

          </View>

          <Animated.View style={{ flex: 1, backgroundColor: 'black', transform: [{ translateY: shiftAnim }] }}>
            <View style={styles.bottomContainer}>

              <View style={styles.section}>

                <Text style={styles.label}>
                  NAME
                </Text>

                <TextInput
                  placeholder="Name"
                  value={name}
                  onChangeText={setName}
                  style={[styles.input, { borderColor: nameBorder }]}
                />
              </View>

              <View style={styles.section}>

                <Text style={styles.label}>
                  EMAIL
                </Text>


                <TextInput
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  style={[styles.input, { borderColor: emailBorder }]}
                />

              </View>

              <View style={styles.section}>

                <Text style={styles.label}>
                  PASSWORD
                </Text>

                <View
                  style={[styles.passwordRow, { borderColor: passwordBorder }]}>

                  <TextInput
                    placeholder="* * * * * * * * *"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={secure}
                    style={[styles.inputPassword]}
                  />

                  <TouchableOpacity
                  style={{paddingRight:'4%'}}
                    onPress={() =>
                      setSecure(!secure)
                    }>

                    <Icon
                      name={
                        secure
                          ? 'eye-slash'
                          : 'eye'
                      }
                      size={width * 0.05}
                      color="#B4B9CA"
                    />

                  </TouchableOpacity>

                </View>

              </View>

              <View style={styles.section}>

                <Text style={styles.label}>
                  RE-TYPE PASSWORD
                </Text>

                <View
                  style={[styles.passwordRow, { borderColor: passwordBorder }]}>

                  <TextInput
                    placeholder="* * * * * * * *"
                    placeholderTextColor="#999"
                    value={confirmBorder}
                    onChangeText={setConfirmBorder}
                    secureTextEntry={confirmSecure}
                    style={styles.inputPassword}
                  />

                  <TouchableOpacity
                  style={{paddingRight:'4%'}}
                    onPress={() =>
                      setConfirmSecure(
                        !confirmSecure,
                      )
                    }>

                    <Icon
                      name={
                        confirmSecure
                          ? 'eye-slash'
                          : 'eye'
                      }
                      size={width * 0.05}
                      color="#B4B9CA"
                    />

                  </TouchableOpacity>

                </View>

              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={
                  validateSignup
                }>

                <Text
                  style={styles.buttonText}>
                  SIGN UP
                </Text>

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

    justifyContent: 'center',

    paddingHorizontal:
      width * 0.06,
  },

  backButton: {

    width: width * 0.13,
    height: width * 0.13,

    borderRadius:
      width * 0.065,

    backgroundColor: 'white',

    justifyContent: 'center',
    alignItems: 'center',

    marginBottom:
      height * 0.04,
  },

  title: {
    color: 'white',

    fontSize:
      width * 0.09,

    fontFamily: 'Sen-Bold',

    textAlign: 'center',
  },

  subtitle: {

    color: 'white',

    fontSize:
      width * 0.043,
    fontFamily: 'Sen-Regular',
    textAlign: 'center',

    marginTop:
      height * 0.01,
  },

  bottomContainer: {

    flex: 1,

    backgroundColor: 'white',

    borderTopLeftRadius:
      width * 0.08,

    borderTopRightRadius:
      width * 0.08,

    paddingHorizontal:
      width * 0.06,

  },

  section: {
    marginTop: '5%',
    marginBottom:
      height * 0.01,
  },

  label: {

    fontSize:
      width * 0.035,

    fontFamily: 'Sen-Regular',

    marginBottom:
      height * 0.005,
  },

  input: {
    backgroundColor: '#F1F4F9',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 18,
    paddingHorizontal: 10,
    fontSize: 16,
    borderColor: 'transparent'
  },

  inputPassword: {
    backgroundColor: '#F1F4F9',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 18,
    paddingLeft:'4%',
    fontSize: 16,
    width: '90%',
    borderColor: 'transparent'
  },

  passwordRow: {

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent:
      'space-between',

    backgroundColor:
      '#F1F4F9',

    borderRadius:
      width * 0.03,
    paddingHorizontal:
      width * 0.005,
    borderWidth: 1,
    paddingVertical: 1,
    fontSize: 16,
    borderColor: 'transparent'
  },

  passwordInput: {

    flex: 1,

    paddingVertical:
      height * 0.025,
    fontFamily: 'Sen-Regular',
    fontSize:
      width * 0.04,
  },

  button: {

    backgroundColor:
      '#FF7A1A',

    paddingVertical:
      height * 0.025,

    borderRadius:
      width * 0.03,

    justifyContent: 'center',

    alignItems: 'center',

    marginTop:
      height * 0.03,

  },

  buttonText: {

    color: 'white',
    fontFamily: 'Sen-Bold',
    fontSize:
      width * 0.043,
  },

  error: {

    color: 'red',

    marginTop:
      height * 0.01,

    fontSize:
      width * 0.032,
  },
});
