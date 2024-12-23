import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, Linking, Alert } from 'react-native';
import api from '../Actions/Api/ApiAmadis'; // Adjust the import path as needed

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        // Validate input
        if (!email || !password) {
            Alert.alert('Error', 'Por favor, ingresa tu correo y contraseña');
            return;
        }

        try {
            // Attempt to log in using the api instance
            await api.login({
                username: email,
                password
            });

            // Redirigir a la pantalla de Inicio después de un login exitoso
            navigation.navigate('HomeMenu');  // Asegúrate de que 'Home' coincida con el nombre de la pantalla en tu navegación
        } catch (error) {
            // Manejo de errores como estaba antes
            if (error.response) {
                Alert.alert('Error', error.response.data.message || 'Error al iniciar sesión');
            } else if (error.request) {
                Alert.alert('Error', 'No se pudo conectar con el servidor');
            } else {
                Alert.alert('Error', 'Ocurrió un error inesperado');
            }
        }
    };

    return (
        <View className="flex-1 bg-gradient-to-b from-blue-400 to-purple-700 justify-center items-center p-6">
            {/* Logo */}
            <Image
                source={{ uri: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiPuRdd7_cBxOZk62HoCa226D3d3thkHwBv1pRV1dKRYsY6WUxZhaaROL9kvVJxX--9MtplcLh7WoP5UjE8-PimBAyAfCV_TGTThjWwpkWupOqVMg72Hs6PPsBgkyQhHv6r5HfriD4E2FmntYH345hYXCKtb4RDP-FT7Vim4itCRuWUsZ5o_X0Nsctx/s3380/FullLogoUASD.png' }}
                className="w-[27rem] h-32 mb-6"
            />

            {/* Título */}
            <Text className="text-gray-800 text-3xl font-bold mb-4">Bienvenido</Text>

            {/* Descripción */}
            <Text className="text-gray-800 text-base mb-8 text-center px-4 leading-relaxed">
                Inicia sesión para continuar y explorar todas las características de nuestra plataforma.
            </Text>

            {/* Campo de correo */}
            <TextInput
                placeholder="Matricula"
                placeholderTextColor="#333"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                className="bg-white p-4 rounded-lg text-base text-gray-900 mb-4 shadow-sm w-full max-w-md"
            />

            {/* Campo de contraseña */}
            <TextInput
                placeholder="Contraseña"
                placeholderTextColor="#333"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                className="bg-white p-4 rounded-lg text-base text-gray-900 mb-6 shadow-sm w-full max-w-md"
            />

            {/* Botón de inicio de sesión */}
            <TouchableOpacity
                onPress={handleLogin}
                className="w-full max-w-md bg-purple-800 py-4 rounded-lg shadow-md mb-4"
            >
                <Text className="text-white text-lg font-semibold text-center">Iniciar sesión</Text>
            </TouchableOpacity>

            {/* Enlace para recuperar la contraseña */}
            <TouchableOpacity className="mb-6"
                onPress={() => navigation.navigate('ResetPassword')}>
                <Text className="text-gray-800 text-sm underline">¿Olvidaste tu contraseña?</Text>

            </TouchableOpacity>

            {/* Enlace para inscripción */}
            <TouchableOpacity
                onPress={() => Linking.openURL('https://uasd.edu.do/admisiones/')}
                className="flex-row items-center"
            >
                <Text className="text-gray-800 text-sm">¿Te gustaría estudiar con nosotros? </Text>
                <Text className="text-gray-800 text-sm font-semibold underline">Haz clic aquí</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Login;
