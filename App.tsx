// App.tsx
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MenuScreen from './MenuScreen'; 
import EditScreen from './EditScreen';
import SplashScreen from './SplashScreen'; 
import CheckOutScreen from './CheckOutScreeen'; 
import { RootStackParamList } from './types'; 

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 2000);

    // Clean up the timeout when the component unmounts
    return () => clearTimeout(splashTimeout);
  }, []);

  // Display the splash screen for the specified time, then show the main navigation
  if (isShowSplash) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MenuScreen">
        <Stack.Screen name="MenuScreen" component={MenuScreen} />
        <Stack.Screen name="EditScreen" component={EditScreen} /> 
        <Stack.Screen name="CheckOutScreen" component={CheckOutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
