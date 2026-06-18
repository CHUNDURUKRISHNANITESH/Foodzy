import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Keyboard,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [remember, setRemember] = useState(false);
  const [buttonBottom, setButtonBottom] = useState(0);
  const [emailBorder, setEmailBorder] = useState('transparent');
  const [passwordBorder, setPasswordBorder] = useState('transparent');

  const shiftAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', (e) => {
      const keyboardHeight = e.endCoordinates.height;
      Animated.timing(shiftAnim, {
        toValue: -keyboardHeight * 0.3,
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

  const validateLogin = () => {
    if (!email && !password) {
      Toast.show({ type: 'error', text1: 'All fields are empty' });
      setEmailBorder('red'); setPasswordBorder('red');
      return;
    }
    let valid = true;
    if (!email.trim()) {
      Toast.show({ type: 'error', text1: 'Email is required'});
      setEmailBorder('red'); valid = false;
    } else if (!email.endsWith('@gmail.com')) {
      Toast.show({ type: 'error', text1: 'Email must be @gmail.com' });
      setEmailBorder('red'); valid = false;
    } else setEmailBorder('transparent');
    if (!password) {
      Toast.show({ type: 'error', text1: 'Password is required' });
      setPasswordBorder('red'); valid = false;
    }
    else if (password.length < 6) {
      Toast.show({ type: 'error', text1: 'Minimum 6 characters' });
      setPasswordBorder('red'); valid = false;
    }
    else
      setPasswordBorder('transparent');

    if (valid) {
      Toast.show({ type: 'success', text1: 'Login Successful 🎉' });
      navigation.navigate('LocationAccess');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <Image source={require('../assets/Ellipsee.png')} style={styles.leftDesign} />
        <Image source={require('../assets/Vector.png')} style={styles.rightDesign} />
        <Text style={styles.title}>Log In</Text>
        <Text style={styles.subtitle}>Please sign in to your existing account</Text>
      </View>

      <Animated.View style={{ flex: 1, backgroundColor: 'black', transform: [{ translateY: shiftAnim }] }}>
        <View style={styles.bottomContainer}>
          <Text style={styles.label}>EMAIL</Text>
          <TextInput
            placeholder="example@gmail.com"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />

          <Text style={styles.label}>PASSWORD</Text>
          <View style={styles.passwordRow}>
            <TextInput
              placeholder="********"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={secure}
              style={styles.passwordInput}
            />
            <TouchableOpacity onPress={() => setSecure(!secure)}>
              <Icon name={secure ? 'eye-slash' : 'eye'} size={width * 0.05} color="#B4B9CA" />
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <View style={{ flexDirection: 'row', gap:'6%' }}>
              <TouchableOpacity style={styles.rememberRow} onPress={() => setRemember(!remember)}>
                {remember && <Icon name="check" size={16} color="black" />}
              </TouchableOpacity>
              <Text style={styles.rememberText}>Remember me</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgot}>Forgot Password</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={validateLogin}
          >
            <Text style={styles.buttonText}>LOG IN</Text>
          </TouchableOpacity>

          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Don’t have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signupBtn}>SIGN UP</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.or}>Or</Text>
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.facebook}>
              <Icon name="facebook" size={width * 0.07} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.twitter}>
              <Icon name="twitter" size={width * 0.07} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.apple}>
              <Icon name="apple" size={width * 0.07} color="white" />
            </TouchableOpacity>
          </View>
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

  },
  rightDesign: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#0E122B'
  },
  topContainer: {
    height: height * 0.3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontSize: width * 0.09,
    fontFamily: 'Sen-Bold'
  },
  subtitle: {
    color: 'white',
    fontSize: width * 0.043,
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'Sen-Regular'
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: width * 0.08,
    borderTopRightRadius: width * 0.08,
    paddingHorizontal: width * 0.06,
    paddingTop: height * 0.02,
  },
  label: {
    marginBottom: 5,
    marginTop: '3%',
    fontSize: 14,
    fontFamily: 'Sen-Regular'
  },
  input: {
    backgroundColor: '#F1F4F9',
    borderRadius: 8,
    padding: 18,
    marginBottom: 15,
    fontFamily: 'Sen-Regular'
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F4F9',
    borderRadius: 8,
    paddingRight:15
  },
  passwordInput: {
    flex: 1,
    padding: 18
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '9%'
  },
  rememberRow: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8
  },
  rememberText: {
    color: '#888',
    fontFamily: 'Sen-Regular'
  },
  forgot: {
    color: '#FF7A1A',
    fontFamily: 'Sen-Regular'
  },
  button: {
    backgroundColor: '#FF7A1A',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: '12%'
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Sen-Bold'
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '12%'
  },
  signupText: {
    color: '#666',
    fontFamily: 'Sen-Regular'
  },
  signupBtn: {
    color: '#FF7A1A',
    marginLeft: 5,
    fontFamily: 'Sen-Medium'
  },
  or: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#777',
    fontFamily: 'Sen-Regular',
    marginTop: '9%'
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: '5%'
  },
  facebook: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#395998',
    justifyContent: 'center',
    alignItems: 'center'
  },
  twitter: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#169CE8',
    justifyContent: 'center',
    alignItems: 'center'
  },
  apple: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
