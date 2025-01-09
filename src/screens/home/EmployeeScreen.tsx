import {
  Alert,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {colors} from '../../constant/color';
import {getItem, removeItem} from '../../store/localStorage';
import {getUserData} from '../../store/reduxSlices/user';
import {EMPLOYEE, USER} from '../../constant/local';
import SearchComp from '../../components/SearchComp';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EmployeeScreen: React.FC = () => {
  const [employee, setEmployee] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [filterEmployeeData, setFilterEmployeeData] = useState<any[]>([]);
  const nav = useNavigation<any>();
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      getEmployees();
    }, []),
  );

  const getEmployees = async () => {
    const data = await getItem(EMPLOYEE);
    if (data) {
      setEmployee(data);
    }
    console.log(data, 'data ');
  };
  const onSearch = (text: string) => {
    setSearchValue(text);
    let filterData = employee.filter(ele => {
      return ele?.name?.toLowerCase()?.includes(text?.toLowerCase());
    });
    setFilterEmployeeData(filterData);
  };
  const handleLogout = () => {
    // Show an alert asking for confirmation
    Alert.alert(
      'Confirm Logout', // Title
      'Are you sure you want to log out?', // Message
      [
        {
          text: 'Cancel',
          style: 'cancel', // Styling this as a cancel button
        },
        {
          text: 'Yes',
          onPress: () => {
            removeItem(USER);
            dispatch(getUserData({}));
          },
        },
      ],
      {cancelable: true},
    );
  };
  const renderEmp = ({item, index}: {item: any; index: any}) => {
    return (
      <View
        style={{
          elevation: 2,
          backgroundColor: colors.primaryColor,
          borderRadius: 5,
          margin: 5,
          padding: 10,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 5,
            color: '#1779ba',
          }}>
          {item.name}
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={{fontSize: 14}}>Age </Text>
            <Text style={{fontSize: 16, color: colors.secondaryColor}}>
              {item.age}
            </Text>
          </View>
          <View>
            <Text style={{fontSize: 14}}>Address </Text>
            <Text style={{fontSize: 16, color: colors.secondaryColor}}>
              {item.address}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        backgroundColor={colors.accentColor}
        barStyle={'dark-content'}></StatusBar>
      <View style={styles.header}>
        <Text style={styles.heading} numberOfLines={1}>
          {'Demo'}
        </Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Icon name="exit-to-app" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={{marginHorizontal: 10, marginVertical: 5}}>
        <SearchComp
          value={searchValue}
          onChangeText={onSearch}
          onClear={() => {
            setSearchValue('');
          }}
          placeholder={'Search by email'}
        />
      </View>
      <FlatList
        data={searchValue ? filterEmployeeData : employee}
        keyExtractor={item => item?.id?.toString()}
        renderItem={renderEmp}
        showsVerticalScrollIndicator={false}
        style={styles.safeAreaContainer}
      />
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => {
          nav.navigate('createEmployee');
        }}>
        <Text style={{fontSize: 30, color: colors.primaryColor}}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EmployeeScreen;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    marginHorizontal: 10,
    padding: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    // flex: 1,
  },
  actionButton: {
    right: 10,
    bottom: 50,
    position: 'absolute',
    backgroundColor: '#1779ba',
    borderRadius: 50,
    // margin: 20,
    paddingHorizontal: 15,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    marginLeft: 10,
    justifyContent: 'center',
    right: 5,
    position: 'absolute',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accentColor,
    padding: 10,
  },
});
