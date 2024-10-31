import { RouteProp } from '@react-navigation/native';

export type Dish = {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string; 
    category: string; 
};


export type RootStackParamList = {
    MenuScreen:{ dishes: Dish[] };  // No params for MenuScreen
    EditScreen: { dishes: Dish[] }; // Specify that EditScreen expects dishes as a parameter
    CheckOutScreen: { dishes: Dish[] }; // Specify that CheckOutScreen expects dishes as a parameter
};

export type MenuScreenRouteProp = RouteProp<RootStackParamList, 'MenuScreen'>;
export type EditScreenRouteProp = RouteProp<RootStackParamList, 'EditScreen'>;
export type CheckOutScreenRouteProp = RouteProp<RootStackParamList, 'CheckOutScreen'>;
