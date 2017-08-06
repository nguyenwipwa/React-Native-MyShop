import { AsyncStorage } from 'react-native';

const saveCart = async (carArray) => {
    await AsyncStorage.setItem('@cart', JSON.stringify(carArray));
};
export default saveCart;

