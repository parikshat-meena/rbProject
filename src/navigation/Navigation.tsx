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
import Startup from '../screens/auth/Startup';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import EmployeeScreen from '../screens/home/EmployeeScreen';
import CreateEmployee from '../screens/home/CreateEmployee';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
const Navigation = () => {
  const user = useSelector((state: RootState) => state.user.UserData);
  return (
    <NavigationContainer>
      {user.email ? (
        <Stack.Navigator initialRouteName="employee">
          <Stack.Screen
            name="employee"
            component={EmployeeScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="createEmployee"
            component={CreateEmployee}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="StartUp">
          <Stack.Screen
            name="StartUp"
            component={Startup}
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
