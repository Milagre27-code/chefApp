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
    MenuScreen: { dishes: Dish[] };
    EditScreen: { dishes: Dish[] };
    CheckOutScreen: { dishes: Dish[] };
    FilterScreen: { dishes: Dish[] };
  };
  
export type MenuScreenRouteProp = RouteProp<RootStackParamList, 'MenuScreen'>;
export type EditScreenRouteProp = RouteProp<RootStackParamList, 'EditScreen'>;
export type CheckOutScreenRouteProp = RouteProp<RootStackParamList, 'CheckOutScreen'>;
