import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "./screens/Login";
import Home from "./screens/Home";
import HomeMenu from "./screens/HomeMenu";
import ResetPassword from "./screens/ResetPassword";
import Eventos from "./screens/Events"; // Add this import
import "./global.css";
import NewsScreen from "./screens/NewsScreen";
import PreseleccionScreen from "./screens/InscripcionScreen";

const Stack = createStackNavigator();

export default function App() {
    return (
        // NavigationContainer es el componente principal que envuelve toda la navegación
        //agreguen sus pantallas para poder usar la navegacion
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
                    name="Noticias"
                    component={NewsScreen}
                    options={{ title: 'Noticias' }} // Título en la pantalla de Login
                />
                <Stack.Screen
                    name="Preseleccion"
                    component={PreseleccionScreen}
                    options={{ title: 'Preseleccion' }} // Título en la pantalla de Login
                />
                <Stack.Screen
                    name="ResetPassword"
                    component={ResetPassword}
                    options={{ title: 'Restablecer Contraseña' }} // Título para la pantalla de ResetPassword
                />
                <Stack.Screen
                    name="HomeMenu"
                    component={HomeMenu}
                    options={{ title: 'Menu principal' }} // Título para la pantalla de ResetPassword
                />
                <Stack.Screen
                    name="Eventos"
                    component={Eventos}
                    options={{ title: 'Eventos' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}