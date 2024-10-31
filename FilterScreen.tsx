
import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Dish } from './types';
import { StackNavigationProp } from '@react-navigation/stack';

type FilterScreenProps = {
  route: RouteProp<RootStackParamList, 'FilterScreen'>;
  navigation: StackNavigationProp<RootStackParamList, 'FilterScreen'>;
};

export default function FilterScreen({ route }: FilterScreenProps) {
  const { dishes } = route.params;
  const [filteredDishes, setFilteredDishes] = useState<Dish[]>(dishes);

  // Function to filter dishes by category
  const filterDishes = (category: string) => {
    if (category === 'All') {
      setFilteredDishes(dishes);
    } else {
      setFilteredDishes(dishes.filter((dish) => dish.category === category));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter Menu</Text>
      <View style={styles.filterButtons}>
        <Button title="Mains" onPress={() => filterDishes('Mains')} />
        <Button title="Starters" onPress={() => filterDishes('Starters')} />
        <Button title="Desserts" onPress={() => filterDishes('Desserts')} />
      </View>
      <FlatList
        data={filteredDishes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.dishContainer}>
            <Text style={styles.dishText}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>Price: R{item.price}</Text>
            <Text>Category: {item.category}</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dishContainer: {
    backgroundColor: '#f8f8f8',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  dishText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

});
