import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Dish } from './types'; 
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker
import { v4 as uuidv4 } from 'uuid'; 
import { Picker } from '@react-native-picker/picker'; // Import Picker

type Props = {
  route: RouteProp<RootStackParamList, 'EditScreen'>;
  navigation: any; 
};

export default function EditScreen({ route, navigation }: Props) {
  const { dishes: initialDishes } = route.params;
  const [dishes, setDishes] = useState<Dish[]>(initialDishes);
  const [image, setImage] = useState<string | null>(null); // State for the selected image
  const [name, setName] = useState<string>(''); // State for the dish name
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [category, setCategory] = useState<string>(''); // State for the selected category

  // Function to select an image from the gallery
  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need gallery permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Square aspect ratio
      quality: 1, // Full quality
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Set selected image
    }
  };

  const handleAddDish = () => {
    if (!image || !name || !description || !price || !category) {
      alert("Please fill in all fields.");
      return;
    }

    const newDish: Dish = {
      id: uuidv4(), // Use UUID for unique ID
      image,
      name,
      description,
      price: parseFloat(price),
      category, // Add the selected category
    };

    // Add new dish to dishes and update state
    setDishes([...dishes, newDish]);

    // Navigate back to Menu screen with updated dishes
    navigation.navigate('MenuScreen', { dishes: [...dishes, newDish] });
  };

  const handleDeleteDish = (id: string) => {
    const updatedDishes = dishes.filter(dish => dish.id !== id);
    // Update the dishes state with the filtered array
    setDishes(updatedDishes);
    navigation.navigate('MenuScreen', { dishes: updatedDishes });
  };


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add Dish</Text>
      
      <Button title="Select Image from Gallery" onPress={selectImage} />

      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Text style={styles.label}>Select Category:</Text>

      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Mains" value="Mains" />
        <Picker.Item label="Starters" value="Starters" />
        <Picker.Item label="Desserts" value="Desserts" />
      </Picker>

      <TextInput
        style={styles.price}
        placeholder="Price"
        value={price}
        keyboardType="numeric" // Ensures only numbers can be entered
        onChangeText={setPrice}
      />
      <View style={styles.fixToText}>
        <Button title="Add Dish" onPress={handleAddDish} />
      </View>
      <Text style={styles.separeter}>Dishes added</Text>
      
      {/* Render dishes manually */}
      {dishes.length === 0 ? (
        <Text style={styles.noDataText}>No dishes available</Text>
      ) : (
        dishes.map((dish) => (
          <View key={dish.id} style={styles.dishContainer}>
            <Image source={{ uri: dish.image }} style={styles.image} />
            <Text>{dish.name}</Text>
            <Text>{dish.description}</Text>
            <Text>Price: R{dish.price}</Text>
            <Text>{dish.category}</Text>
            <Button title="Delete" onPress={() => handleDeleteDish(dish.id)} />
          </View>
        ))
      )}
    </ScrollView>
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
    marginBottom: 20,
  },
  separeter:{
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    borderBottomWidth: 6, 
    borderBottomColor: '#000', 
  },
  input: {
    borderRadius:30,
    marginTop:1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },

  noDataText: {
    textAlign: 'center',
    color: '#888',
    fontStyle: 'italic',
    marginVertical: 20,
  },
  
  imagePreview: {
    width: 100,
    height: 100,
    marginVertical: 20,
  },
  label: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  picker: {
    borderRadius:30,
    height: 100,
    width: '100%',
    marginBottom:10 ,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    borderRadius:30,
    marginTop:100,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
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
