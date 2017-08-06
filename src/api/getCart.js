import { AsyncStorage } from 'react-native';

const getCart = async () => {
    try {
        const value = await AsyncStorage.getItem('@cart');
        if (value !== null) {
            console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTT');
            console.log(JSON.parse(value));
            return JSON.parse(value);
        }
    } catch (error) {
        // Error retrieving data
        return [];
    }
    return [];
};
export default getCart;

