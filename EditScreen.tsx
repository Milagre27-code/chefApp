import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Dish } from './types'; // Adjust the import path as needed
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker
import { v4 as uuidv4 } from 'uuid'; 
import { Picker } from '@react-native-picker/picker'; // Import Picker

type Props = {
  route: RouteProp<RootStackParamList, 'EditScreen'>;
  navigation: any; // Optionally type navigation if used
};

export default function EditScreen({ route, navigation }: Props) {
  const { dishes } = route.params; // Access dishes from params
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

    // Navigate back to Menu screen and pass the updated dishes array
    navigation.navigate('MenuScreen', { dishes: [...dishes, newDish] });
  };

  const handleGoToCheckout = () => {
    // Navigate to Checkout screen and pass the current dishes
    navigation.navigate('CheckOutScreen', { dishes });
  };

  return (
    <View style={styles.container}>
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
        <Picker.Item label="Select a category" value="" />
        <Picker.Item label="Mains" value="Mains" />
        <Picker.Item label="Starters" value="Starters" />
        <Picker.Item label="Desserts" value="Desserts" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        keyboardType="numeric" // Ensures only numbers can be entered
        onChangeText={setPrice}
      />
      <View style={styles.fixToText}>
      <Button title="Add Dish" onPress={handleAddDish} />
      <Button  title="Go to Checkout" onPress={handleGoToCheckout}  />
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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

});
