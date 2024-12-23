import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "./screens/Login";
import Home from "./screens/Home";
import HomeMenu from "./screens/HomeMenu";
import ResetPassword from "./screens/ResetPassword";
import Eventos from "./screens/Events";
import About from "./screens/About";
import "./global.css";
import NewsScreen from "./screens/NewsScreen";
import PreseleccionScreen from "./screens/InscripcionScreen";
import Solicitudes from "./screens/Solicitudes";
import Deudas from "./screens/Deudas";
import Tareas from "./screens/Tareas";
import Horario from "./screens/Horario";
import Video from "./screens/Video"
const Stack = createStackNavigator();

export default function App() {
    return (
        // NavigationContainer es el componente principal que envuelve toda la navegación
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
                    options={{ title: 'Noticias' }}
                />
                <Stack.Screen
                    name="Preseleccion"
                    component={PreseleccionScreen}
                    options={{ title: 'Preseleccion' }}
                />
                <Stack.Screen
                    name="Horarios"
                    component={Horario}
                    options={{ title: 'Horario' }}
                />
                <Stack.Screen
                    name="ResetPassword"
                    component={ResetPassword}
                    options={{ title: 'Restablecer Contraseña' }}
                />
                <Stack.Screen
                    name="HomeMenu"
                    component={HomeMenu}
                    options={{ title: 'Menu principal' }}
                />
                <Stack.Screen
                    name="Eventos"
                    component={Eventos}
                    options={{ title: 'Eventos' }}
                />
                <Stack.Screen
                    name="Solicitudes"
                    component={Solicitudes}
                    options={{ title: 'Solicitudes' }}
                />
                <Stack.Screen
                    name="Deuda"
                    component={Deudas}
                    options={{ title: 'Deudas' }}
                />
                <Stack.Screen
                    name="Videos"
                    component={Video}
                    options={{ title: 'Deudas' }}
                />
                <Stack.Screen
                    name="Tareas"
                    component={Tareas}
                    options={{ title: 'Mis Tareas' }}
                />
                <Stack.Screen
                    name="About"
                    component={About}
                    options={{ title: 'Sobre nosotros' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}