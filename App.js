import { StatusBar } from 'expo-status-bar';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import "./global.css";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "./screens/Login";
import Home from "./screens/Home";
import About from './screens/About';    
import Videos from './screens/Videos';

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                  name="Home"
                  component={Home}
                  options={{ headerShown: false }} // Oculta el header
              />
              <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{ title: 'Iniciar Sesión' }} // Título en la pantalla de Login
              />
              
              <Stack.Screen
                  name="About"
                  component={About}
                  options={{ title: 'Acerca de nosotros' }} // Título en la pantalla de Login
              />

<Stack.Screen
                  name="Videos"
                  component={Videos}
                  options={{ title: 'Videos educativos' }} // Título en la pantalla de Login
              />

          </Stack.Navigator>
      </NavigationContainer>
  );
}


