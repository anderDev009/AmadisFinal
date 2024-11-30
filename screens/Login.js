import React from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, Linking } from 'react-native';

const Login = () => {
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
                placeholder="Correo electrónico"
                placeholderTextColor="#333"
                className="bg-white p-4 rounded-lg text-base text-gray-900 mb-4 shadow-sm w-full max-w-md"
            />

            {/* Campo de contraseña */}
            <TextInput
                placeholder="Contraseña"
                placeholderTextColor="#333"
                secureTextEntry
                className="bg-white p-4 rounded-lg text-base text-gray-900 mb-6 shadow-sm w-full max-w-md"
            />

            {/* Botón de inicio de sesión */}
            <TouchableOpacity className="w-full max-w-md bg-purple-800 py-4 rounded-lg shadow-md mb-4">
                <Text className="text-white text-lg font-semibold text-center">Iniciar sesión</Text>
            </TouchableOpacity>

            {/* Enlace para recuperar la contraseña */}
            <TouchableOpacity className="mb-6">
                <Text className="text-gray-800 text-sm underline">¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            {/* Registro */}
            <View className="flex-row items-center mb-4">
                <Text className="text-gray-800 text-sm">¿No tienes cuenta? </Text>
                <TouchableOpacity>
                    <Text className="text-gray-800 text-sm font-semibold underline">Regístrate</Text>
                </TouchableOpacity>
            </View>

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
