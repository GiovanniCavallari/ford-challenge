import { Alert } from 'react-native';

export const showAlert = (title: string, description: string) => {
  Alert.alert(title, description, [
    {
      text: 'Dispensar',
    },
  ]);
};
