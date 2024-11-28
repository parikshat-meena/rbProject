import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../model';
import HomeScreen from '../screens/home/HomeScreen';
import ProductScreen from '../screens/product/ProductScreen';
import AuthScreen from '../screens/auth/AuthScreen';
import OtpScreen from '../screens/auth/OtpScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/home/Profile';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
const Navigation = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user: any) => {
      // console.log(user, 'user info');
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      {true ? (
        <Stack.Navigator initialRouteName="OtpScreen">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ProductScreen"
            component={ProductScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="OtpScreen"
            component={OtpScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="BottomTabs"
            component={MyTabs}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="OtpScreen">
          <Stack.Screen
            name="OtpScreen"
            component={OtpScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

export default Navigation;

const styles = StyleSheet.create({});
