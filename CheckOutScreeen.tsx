import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, Button } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Dish } from './types';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
  route: RouteProp<RootStackParamList, 'CheckOutScreen'>;
  navigation: StackNavigationProp<RootStackParamList, 'CheckOutScreen'>;
};

export default function CheckOutScreen({ route, navigation }: Props) {
  const { dishes } = route.params; // Get dishes from route params

  const handleDeleteDish = (id: string) => {
    // Filter out the dish that matches the id
    const updatedDishes = dishes.filter(dish => dish.id !== id);
    
    // Navigate back to the Menu screen with updated dishes
    navigation.navigate('MenuScreen', { dishes: updatedDishes });
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Checkout</Text>
      <FlatList
        data={dishes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.dishContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>Price: {item.price}</Text>
            <Text>{item.category}</Text>
            <Button title="Delete" onPress={() => handleDeleteDish(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  dishContainer: {
    backgroundColor: '#f8f8f8',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});
