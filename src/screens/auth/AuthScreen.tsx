import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Dimensions,
  BackHandler,
  StatusBar,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {setItem} from '../../store/localStorage';
import {USER} from '../../constant/local';
import {useDispatch} from 'react-redux';
import {getUserData} from '../../store/reduxSlices/user';
import {getUsersInfo} from '../../services/itemApi';

const {width} = Dimensions.get('screen');

// Email validation regex
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const AuthScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [emailInvalid, setEmailInvalid] = useState<boolean>(false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const navigation = useNavigation<any>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch<any>();
  // Email change handler
  const onEmailChange = (text: string) => {
    setEmail(text);
    setEmailError(false);
    setEmailInvalid(false);
    setErrorMessage('');
  };

  // Password change handler
  const onPasswordChange = (text: string) => {
    setPassword(text);
    setPasswordError(false);
    setErrorMessage('');
  };

  // Login handler
  const onLoginPress = async () => {
    if (!email) {
      setEmailError(true);
      return;
    }
    if (!validateEmail(email)) {
      setEmailInvalid(true);
      return;
    }
    if (!password) {
      setPasswordError(true);
      return;
    }

    setBtnLoading(true);
    const params = {
      email: email,
      password: password,
    };
    try {
      const data = await getUsersInfo(params);
      console.log(data, 'data res in api');
      // await auth().signInWithEmailAndPassword(email, password);
      setItem(USER, {email: email, password: password});
      dispatch(getUserData({email: email, password: password}));
    } catch (error: any) {
      console.log(error, 'error');
      Alert.alert('Login Failed', 'Invalid email or password');
      setErrorMessage(error?.toString());
    } finally {
      setBtnLoading(false);
    }
  };

  // const handleSignUp = () => {
  //   if (!email) {
  //     setEmailError(true);
  //     return;
  //   }
  //   if (!validateEmail(email)) {
  //     setEmailInvalid(true);
  //     return;
  //   }
  //   if (!password) {
  //     setPasswordError(true);
  //     return;
  //   }
  //   auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .then(() => {
  //       Alert.alert('Success', 'User created successfully!');
  //     })
  //     .catch(error => setErrorMessage(error.message));
  // };

  const validateEmail = (email: string): boolean => {
    return EMAIL_REGEX.test(email.toLowerCase());
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        BackHandler.exitApp();
        return true;
      },
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar backgroundColor={'#fed250'} barStyle={'dark-content'} />
      <View style={styles.container}>
        <View style={styles.contentView}>
          <Text style={styles.title}>Welcome Back</Text>

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={onEmailChange}
            style={[
              styles.input,
              emailError || emailInvalid ? styles.errorBorder : null,
            ]}
            keyboardType="email-address"
            placeholderTextColor="#a1a1a1"
          />
          {(emailError || emailInvalid) && (
            <Text style={styles.error}>Invalid Email</Text>
          )}

          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={onPasswordChange}
            secureTextEntry={true}
            style={[styles.input, passwordError ? styles.errorBorder : null]}
            placeholderTextColor="#a1a1a1"
          />
          {passwordError && (
            <Text style={styles.error}>Password is required</Text>
          )}
          {errorMessage && (
            <Text style={styles.error}>Invalid credentials</Text>
          )}

          <TouchableOpacity
            style={[styles.button, btnLoading ? styles.buttonDisabled : null]}
            onPress={onLoginPress}
            disabled={btnLoading}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={[styles.button, styles.signUpButton]}
            onPress={handleSignUp}
            disabled={btnLoading}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

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
  errorBorder: {
    borderColor: 'red',
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
  signUpButton: {
    backgroundColor: '#4CAF50',
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default AuthScreen;
