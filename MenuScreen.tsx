import React from 'react';
import { View, Text, FlatList, Button, Image, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Dish } from './types';
import { StackNavigationProp } from '@react-navigation/stack';


type Props = {
  route: RouteProp<RootStackParamList, 'MenuScreen'>;
  navigation: StackNavigationProp<RootStackParamList, 'MenuScreen'>;
};

export default function MenuScreen({ navigation, route }: Props) {
  const { dishes = [] } = route.params || {};

  const totalPrice = dishes.reduce((sum, dish) => sum + dish.price, 0);
  const averagePrice = dishes.length > 0 ? (totalPrice / dishes.length).toFixed(2) : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      
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
        ListEmptyComponent={<Text style={styles.noDataText}>No dishes available</Text>}
      />

      <Text style={styles.averagePriceText}>Average Dish Price: R{averagePrice}</Text>
      <View style={styles.fixToText}>
        <Button title="Edit Menu" onPress={() => navigation.navigate('EditScreen', { dishes })} />
        <Button title="Filter Menu" onPress={() => navigation.navigate('FilterScreen', { dishes })} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
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
    marginVertical: 20,
    textAlign: 'center',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginTop: 10,
  },
  noDataText: {
    textAlign: 'center',
    color: '#888',
    fontStyle: 'italic',
    marginVertical: 20,
  },
});
