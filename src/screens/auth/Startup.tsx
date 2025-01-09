import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {getItem} from '../../store/localStorage';
import {USER} from '../../constant/local';
import {useDispatch} from 'react-redux';
import {getUserData} from '../../store/reduxSlices/user';
import {useNavigation} from '@react-navigation/native';
import {Image} from '@rneui/themed';

const Startup: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  useEffect(() => {
    setTimeout(() => {
      checkUser();
    }, 2000);
  }, []);

  const checkUser = async () => {
    const user = await getItem(USER);
    console.log(user, 'user');
    if (user) {
      dispatch(getUserData(user));
    } else {
      login();
    }
  };

  const login = () => {
    navigation.navigate('Auth');
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={require('./../../assets/images/image.jpg')}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
};

export default Startup;

const styles = StyleSheet.create({
  image: {
    height: 600,
    width: 400,
  },
});
