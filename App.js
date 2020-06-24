import React  from 'react';
import { StyleSheet, Text, View } from 'react-native';

//importing screens 
import HomeScreen from './screens/HomeScreen';
import AddNewContectScreen from './screens/AddNewContectScreen';
import EditContectScreen from './screens/EditContectScreen';
import ViewContectScreen from './screens/ViewContectScreen';
// importing react navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

function App() {
   
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Add" component={AddNewContectScreen} />
        <Stack.Screen name="Edit" component={EditContectScreen} />
        <Stack.Screen name="View" component={ViewContectScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;



