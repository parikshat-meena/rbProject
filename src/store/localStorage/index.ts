import EncryptedStorage from 'react-native-encrypted-storage';

export const setItem = (key: string, value: any) => {
  EncryptedStorage.setItem(key, JSON.stringify(value));
};

export const getItem = async (key: string) => {
  const res = await EncryptedStorage.getItem(key);

  return JSON.parse(res);
};

export const removeItem = (key: string) => {
  EncryptedStorage.removeItem(key);
};
