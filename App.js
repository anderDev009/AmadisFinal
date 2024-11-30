import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "./screens/Login";
import Home from "./screens/Home";
import ResetPassword from "./screens/ResetPassword"; // Add this import
import "./global.css";

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
                    name="ResetPassword"
                    component={ResetPassword}
                    options={{ title: 'Restablecer Contraseña' }} // Título para la pantalla de ResetPassword
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}