import {
  Alert,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
const {width} = Dimensions.get('screen');
const OtpScreen: React.FC = () => {
  const [otp, setOtp] = useState('');
  const [mobile, setMobile] = useState('');
  const [isOtpSend, setIsOtpSend] = useState(false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const navigation = useNavigation<any>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resend, setResend] = useState(false);
  const savedOtp = '1234';
  const onSendOtp = () => {
    Alert.alert(`otp send to ${mobile}`);
    setIsOtpSend(true);
    setTimeout(() => {
      setResend(true);
    }, 5000);
  };
  const onResend = () => {
    Alert.alert(`otp send to ${mobile}`);
    setIsOtpSend(true);
    setOtp('');
    setTimeout(() => {
      setResend(true);
    }, 5000);
  };

  const verifyOtp = () => {
    if (otp == savedOtp) {
      //   Alert.alert('Otp verified');
      navigation.navigate('BottomTabs');
    } else {
      setErrorMessage('invalid');
    }
  };
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar backgroundColor={'#fed250'} barStyle={'dark-content'} />
      <View style={styles.container}>
        <View style={styles.contentView}>
          <Text style={styles.title}>Welcome Back</Text>

          <TextInput
            placeholder="enter mobile"
            value={mobile}
            onChangeText={setMobile}
            keyboardType="numeric"
            // secureTextEntry={true}
            maxLength={10}
            style={[styles.input]}
            placeholderTextColor="#a1a1a1"
          />

          {isOtpSend && (
            <TextInput
              placeholder="enter otp"
              value={otp}
              onChangeText={text => {
                setOtp(text);
                setErrorMessage('');
              }}
              keyboardType="numeric"
              // secureTextEntry={true}
              maxLength={4}
              style={[styles.input, errorMessage ? styles.errorBorder : null]}
              placeholderTextColor="#a1a1a1"
            />
          )}
          {resend && (
            <Text style={{color: 'blue', marginBottom: 5}} onPress={onResend}>
              {'resend'}
            </Text>
          )}
          {errorMessage && (
            <Text style={styles.error}>{'Invalid Otp'.toUpperCase()}</Text>
          )}

          <TouchableOpacity
            style={[
              styles.button,
              mobile.length != 10 ? styles.buttonDisabled : null,
            ]}
            onPress={isOtpSend ? verifyOtp : onSendOtp}
            disabled={!mobile}>
            <Text style={styles.buttonText}>
              {isOtpSend
                ? 'verify otp'.toUpperCase()
                : 'send otp'.toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#fed250',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  contentView: {
    justifyContent: 'center',
    // alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  input: {
    width: width * 0.85,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    width: width * 0.85,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#1779ba',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonDisabled: {
    backgroundColor: '#a1a1a1',
  },
  errorBorder: {
    borderColor: 'red',
  },
});
