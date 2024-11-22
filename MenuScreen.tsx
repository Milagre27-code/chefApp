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

  const calculateAveragePriceByCategory = () => {
    const categoryTotals: { [key: string]: { total: number; count: number } } = {};

    // Group dishes by category and calculate totals
    dishes.forEach((dish) => {
      if (!categoryTotals[dish.category]) {
        categoryTotals[dish.category] = { total: 0, count: 0 };
      }
      categoryTotals[dish.category].total += dish.price;
      categoryTotals[dish.category].count += 1;
    });

    // Calculate averages for each category
    return Object.keys(categoryTotals).map((category) => ({
      category,
      average: (categoryTotals[category].total / categoryTotals[category].count).toFixed(2),
    }));
  };

  const averagePricesByCategory = calculateAveragePriceByCategory();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>

      {/* Render list of dishes */}
      <FlatList
        data={dishes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.dishContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>Price: R{item.price}</Text>
            <Text>Category: {item.category}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noDataText}>No dishes available</Text>}
      />

      {/* Render average prices by category */}
      <View style={styles.averagePriceContainer}>
        <Text style={styles.sectionTitle}>Average Prices by Category:</Text>
        {averagePricesByCategory.map(({ category, average }) => (
          <Text key={category} style={styles.averagePriceText}>
            {category}: R{average}
          </Text>
        ))}
      </View>

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
  averagePriceContainer: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  averagePriceText: {
    fontSize: 18,
    marginBottom: 5,
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
