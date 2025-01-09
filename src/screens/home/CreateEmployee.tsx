import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {getItem, setItem} from '../../store/localStorage';
import {EMPLOYEE} from '../../constant/local';
import {useNavigation} from '@react-navigation/native';

const CreateEmployee: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const navigation = useNavigation<any>();
  const handleSubmit = () => {
    if (!name || !age || !address) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    if (isNaN(Number(age))) {
      Alert.alert('Error', 'Age must be a valid number.');
      return;
    }

    // Handle employee creation logic here

    // Alert.alert('Success', 'Employee created successfully!');
    createEmployee({name, age, address});
    // Reset form
    // setName('');
    // setAge('');
    // setAddress('');
  };
  const createEmployee = async (user: any) => {
    let emplist: any[] = [];
    if (await getItem(EMPLOYEE)) emplist = await getItem(EMPLOYEE);
    emplist.push(user);
    setItem(EMPLOYEE, emplist);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Create Employee</Text>

        <TextInput
          style={styles.input}
          placeholder="Employee Name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Age"
          value={age}
          keyboardType="numeric"
          onChangeText={setAge}
        />

        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateEmployee;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
