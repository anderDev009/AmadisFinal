import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    Linking,
    Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
    const menuItems = [
        {
            name: 'Noticias',
            icon: <Ionicons name="newspaper-outline" color="#4A90E2" size={30} />,
            onPress: () => navigation.navigate('Noticias')
        },
        {
            name: 'Horarios',
            icon: <Ionicons name="calendar-outline" color="#2ECC71" size={30} />,
            onPress: () => navigation.navigate('Horarios')
        },
        {
            name: 'Preselección',
            icon: <Ionicons name="book-outline" color="#9B59B6" size={30} />,
            onPress: () => {
                Alert.alert(
                    'Preselección',
                    '¿Deseas realizar tu preselección de materias?',
                    [
                        { text: 'Cancelar', style: 'cancel' },
                        { text: 'Continuar', onPress: () => navigation.navigate('Preseleccion') }
                    ]
                );
            }
        },
        {
            name: 'Deuda',
            icon: <Ionicons name="card-outline" color="#E74C3C" size={30} />,
            onPress: () => navigation.navigate('Deuda')
        },
        {
            name: 'Solicitudes',
            icon: <Ionicons name="document-text-outline" color="#F39C12" size={30} />,
            onPress: () => navigation.navigate('Solicitudes')
        },
        {
            name: 'Mis Tareas',
            icon: <Ionicons name="checkbox-outline" color="#3498DB" size={30} />,
            onPress: () => navigation.navigate('Tareas')
        },
        {
            name: 'Eventos',
            icon: <Ionicons name="calendar-sharp" color="#1ABC9C" size={30} />,
            onPress: () => navigation.navigate('Eventos')
        },
        {
            name: 'Videos',
            icon: <Ionicons name="videocam-outline" color="#8E44AD" size={30} />,
            onPress: () => navigation.navigate('Videos')
        },
        {
            name: 'Acerca de',
            icon: <Ionicons name="information-circle-outline" color="#34495E" size={30} />,
            onPress: () => navigation.navigate('AcercaDe')
        },
        {
            name: 'Salir',
            icon: <Ionicons name="exit-outline" color="#E74C3C" size={30} />,
            onPress: () => {
                Alert.alert(
                    'Cerrar Sesión',
                    '¿Estás seguro de que deseas salir?',
                    [
                        { text: 'Cancelar', style: 'cancel' },
                        {
                            text: 'Salir',
                            style: 'destructive',
                            onPress: () => {
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Login' }]
                                });
                            }
                        }
                    ]
                );
            }
        }
    ];

    const renderMenuItem = (item) => (
        <TouchableOpacity
            key={item.name}
            onPress={item.onPress}
            className="bg-white rounded-lg shadow-md p-4 m-2 items-center justify-center"
            style={{ width: '44%', height: 120 }}
        >
            {item.icon}
            <Text className="text-gray-800 text-center mt-2 font-semibold">
                {item.name}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View className="flex-1 bg-gray-100">
            {/* Encabezado */}
            <View className="bg-purple-800 p-6 items-center">
                <Image
                    source={{ uri: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiPuRdd7_cBxOZk62HoCa226D3d3thkHwBv1pRV1dKRYsY6WUxZhaaROL9kvVJxX--9MtplcLh7WoP5UjE8-PimBAyAfCV_TGTThjWwpkWupOqVMg72Hs6PPsBgkyQhHv6r5HfriD4E2FmntYH345hYXCKtb4RDP-FT7Vim4itCRuWUsZ5o_X0Nsctx/s3380/FullLogoUASD.png' }}
                    className="w-48 h-16"
                    resizeMode="contain"
                />
                <Text className="text-white text-xl font-bold mt-2">
                    Menú Principal
                </Text>
            </View>

            {/* Menú en cuadrícula */}
            <ScrollView
                contentContainerStyle={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    padding: 10
                }}
            >
                {menuItems.map(renderMenuItem)}
            </ScrollView>
        </View>
    );
};

export default HomeScreen;