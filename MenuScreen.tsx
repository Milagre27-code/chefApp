import React from 'react';
import { View, Text, FlatList, Button, Image, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Dish } from './types'; // Adjust the import path as needed
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
  route: RouteProp<RootStackParamList, 'MenuScreen'>;
  navigation: StackNavigationProp<RootStackParamList, 'MenuScreen'>; // More specific type for navigation
};

export default function MenuScreen({ navigation, route }: Props) {
  const { dishes = [] } = route.params || {}; // Destructure dishes, default to empty array

  // Calculate total price and average price
  const totalPrice = dishes.reduce((sum, dish) => sum + dish.price, 0);
  const averagePrice = dishes.length > 0 ? (totalPrice / dishes.length).toFixed(2) : 0;

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Menu</Text>
      <FlatList
        data={dishes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.dishContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text>{item.description}</Text>
            <Text>Price: R{item.price}</Text>
            <Text>{item.category}</Text>
          </View>
        )}
      />
      <Text style={styles.averagePriceText}>Average Dish Price: R{averagePrice}</Text>
      <Button title="Edit Menu" onPress={() => navigation.navigate('EditScreen', { dishes })} />
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
  averagePriceText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
});
