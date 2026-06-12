import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ImageBackground,
    Keyboard,
} from 'react-native';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import { Animated } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function VerificationScreen({ navigation, route }: any) {
    const { email } = route.params;
    const [otp, setOtp] = useState(['', '', '', '']);
    const [otpBorders, setOtpBorders] = useState(['transparent', 'transparent', 'transparent', 'transparent']);
    const [timer, setTimer] = useState(5);
    const inputs = useRef<any[]>([]);

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


    useEffect(() => {
        let interval: any;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (text: string, index: number) => {
        const updatedOtp = [...otp];
        updatedOtp[index] = text;
        setOtp(updatedOtp);
        const updatedBorders = [...otpBorders];
        updatedBorders[index] = 'transparent';
        setOtpBorders(updatedBorders);

        if (text && index < 3) {
            inputs.current[index + 1].focus();
        }
    };

    const handleVerify = () => {
        if (otp.some(val => val === '')) {
            Toast.show({
                type: 'error',
                text1: 'Enter your OTP',
                position: 'top',
                props: { backgroundColor: 'red' },
            });

            const updatedBorders = otp.map(val => (val === '' ? 'red' : 'transparent'));
            setOtpBorders(updatedBorders);
            return;
        }

        setOtpBorders(['transparent', 'transparent', 'transparent', 'transparent']);

        Toast.show({
            type: 'success',
            text1: 'OTP Verified 🎉',
            position: 'top',
        });

        navigation.navigate('NextScreen');
    };

    const handleResend = () => {
        setOtp(['', '', '', '']);
        setOtpBorders(['transparent', 'transparent', 'transparent', 'transparent']);
        setTimer(5);
        Toast.show({
            type: 'info',
            text1: 'OTP resent to your email',
            position: 'top',
        });
    };

    return (
        <View style={styles.mainContainer}>
            <ImageBackground style={styles.topContainer}>
                <Image source={require('../assets/Ellipsee.png')} style={styles.leftDesign} />
                <Image source={require('../assets/Vector.png')} style={styles.rightDesign} />

                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={width * 0.05} color="black" />
                </TouchableOpacity>

                <Text style={styles.title}>Verification</Text>
                <Text style={styles.subtitle}>We have sent a code to your email</Text>
                <Text style={styles.email}>{email}</Text>
            </ImageBackground>

            <Animated.View style={{ flex: 1, backgroundColor: 'black', transform: [{ translateY: shiftAnim }] }}>
                <View style={styles.bottomContainer}>
                    <View style={styles.codeHeader}>
                        <Text style={styles.label}>CODE</Text>
                        {timer > 0 ? (
                            <Text style={styles.resend}>Resend in {timer}s</Text>
                        ) : (
                            <TouchableOpacity onPress={handleResend}>
                                <Text style={[styles.resend, { color: '#FF7A1A' }]}>Resend Code</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    <View style={styles.otpContainer}>
                        {otp.map((item, index) => (
                            <TextInput
                                key={index}
                                ref={ref => {
                                    inputs.current[index] = ref;
                                }}
                                value={item}
                                onChangeText={text => handleChange(text, index)}
                                keyboardType="number-pad"
                                maxLength={1}
                                style={[
                                    styles.otpInput,
                                    { borderColor: otpBorders[index], borderWidth: 1 },
                                ]}
                                caretHidden={true}
                                onKeyPress={({ nativeEvent }) => {
                                    if (nativeEvent.key === 'Backspace') {
                                        const updatedOtp = [...otp];

                                        updatedOtp[index] = '';
                                        setOtp(updatedOtp);

                                        if (index > 0 && item === '') {
                                            inputs.current[index - 1].focus();
                                        }
                                    }
                                }}
                            />
                        ))}
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleVerify}>
                        <Text style={styles.buttonText}>VERIFY</Text>
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
        resizeMode: 'contain'
    },
    rightDesign: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: width * 0.26,
        height: height * 0.42,
        resizeMode: 'contain'
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#0E122B'
    },
    topContainer: {
        height: height * 0.3,
        paddingHorizontal: width * 0.06,
        justifyContent: 'center'
    },
    backButton: {
        width: width * 0.13,
        height: width * 0.13,
        borderRadius: width * 0.065,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: height * 0.02
    },
    title: {
        color: 'white',
        fontSize: width * 0.09,
        fontFamily: 'Sen-Bold',
        textAlign: 'center'
    },
    subtitle: {
        color: 'white',
        fontSize: width * 0.045,
        marginTop: height * 0.015,
        fontFamily: 'Sen-Regular',
        textAlign: 'center'
    },
    email: {
        color: 'white',
        fontFamily: 'Sen-Bold',
        fontSize: width * 0.045,
        marginTop: height * 0.01,
        textAlign: 'center'
    },
    bottomContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: width * 0.08,
        borderTopRightRadius: width * 0.08,
        paddingHorizontal: width * 0.06,
        paddingTop: height * 0.025
    },
    codeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    label: {
        fontSize: width * 0.035,
        fontFamily: 'Sen-Regular'
    },
    resend: {
        fontSize: width * 0.038,
        color: '#444',
        fontFamily: 'Sen-Bold'
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: height * 0.02
    },
    otpInput: {
        width: width * 0.16,
        height: width * 0.16,
        backgroundColor: '#F1F4F9',
        borderRadius: width * 0.03,
        textAlign: 'center',
        fontSize: width * 0.06,
        fontFamily: 'Sen-Bold'
    },
    button: {
        backgroundColor: '#FF7A1A',
        paddingVertical: height * 0.025,
        borderRadius: width * 0.035,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.04
    },
    buttonText: {
        color: 'white',
        fontSize: width * 0.042,
        fontFamily: 'Sen-Bold'
    },
});
