import React, {useState, useEffect} from 'react';
import {
  View,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import {getItems} from '../../services/itemApi';
import {ProductData} from '../../model';
import ProductCard from '../product/ProductCard';
import {colors} from '../../constant/color';
import SearchComp from '../../components/SearchComp';
import {useDispatch} from 'react-redux';
import {getProductData} from '../../store/reduxSlices/product';

const HomeScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [products, setproducts] = useState<ProductData[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [filterProductData, setFilterProductData] = useState<ProductData[]>([]);
  const nav = useNavigation<any>();
  const dispatch = useDispatch();
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data: any = await getItems();
      setproducts(data?.products);
      dispatch(getProductData(data?.products));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: Number) => {
    console.log(id, 'delete');
    try {
      const itemArr = products.filter(ele => ele.id !== id);
      setproducts(itemArr);
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdate = (id?: Number) => {
    const item = products.find(p => p.id == id);
    nav.navigate('ProductScreen', {item, onSubmit});
  };

  const onSubmit = (data: any, type?: string) => {
    console.log(data, 'data on submit ');
    let productArr = [];
    if (type === 'Update') {
      productArr = products.map(item =>
        item.id === data.id ? Object.assign({}, item, data) : item,
      );
    } else if (type === 'Add') {
      productArr = products;
      productArr.unshift(data);
    }

    setproducts(productArr);
  };
  const onSearch = (text: string) => {
    setSearchValue(text);
    let filterData = products.filter(ele => {
      return (
        ele?.category?.toLowerCase()?.includes(text?.toLowerCase()) ||
        ele?.title?.toLowerCase()?.includes(text?.toLowerCase()) ||
        ele?.description?.toLowerCase()?.includes(text?.toLowerCase())
      );
    });
    setFilterProductData(filterData);
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
            auth()
              .signOut()
              .then(() => console.log('User signed out!'))
              .catch(error => console.log('Error logging out:', error));
          },
        },
      ],
      {cancelable: true},
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
          placeholder={'Search by title / category / description'}
        />
      </View>
      <FlatList
        data={searchValue ? filterProductData : products}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <ProductCard item={item} onDelete={handleDelete} onEdit={onUpdate} />
        )}
        showsVerticalScrollIndicator={false}
        style={styles.safeAreaContainer}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

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
