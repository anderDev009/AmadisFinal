import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { resetPasswordAction } from '../Actions/ResetPassword/ResertPassword.Action';

const ResetPassword = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleResetPassword = async () => {
        // Basic validation
        if (!username || !email) {
            Alert.alert('Error', 'Por favor, ingresa tu nombre de usuario y correo electrónico');
            return;
        }

        setIsLoading(true);

        try {
            const response = await resetPasswordAction(username, email);

            // Show the API response message in an alert
            if (response.success) {
                Alert.alert(
                    'Restablecimiento Exitoso',
                    response.message,
                    [{
                        text: 'Aceptar',
                        onPress: () => navigation.goBack()
                    }]
                );
            } else {
                Alert.alert('Error', response.message || 'No se pudo restablecer la contraseña');
            }
        } catch (error) {
            // Handle any network or unexpected errors
            Alert.alert('Error', 'Ocurrió un problema al intentar restablecer la contraseña');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View className="flex-1 bg-gradient-to-b from-blue-400 to-purple-700 justify-center items-center p-6">
            <Text className="text-gray-800 text-3xl font-bold mb-6">Restablecer Contraseña</Text>

            <Text className="text-gray-800 text-base mb-4 text-center">
                Ingresa tu nombre de usuario y correo electrónico para restablecer tu contraseña
            </Text>

            {/* Username Input */}
            <TextInput
                placeholder="Nombre de usuario"
                placeholderTextColor="#333"
                value={username}
                onChangeText={setUsername}
                className="bg-white p-4 rounded-lg text-base text-gray-900 mb-4 shadow-sm w-full max-w-md"
            />

            {/* Email Input */}
            <TextInput
                placeholder="Correo electrónico"
                placeholderTextColor="#333"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                className="bg-white p-4 rounded-lg text-base text-gray-900 mb-6 shadow-sm w-full max-w-md"
            />

            {/* Reset Password Button */}
            <TouchableOpacity
                onPress={handleResetPassword}
                disabled={isLoading}
                className={`w-full max-w-md py-4 rounded-lg shadow-md mb-4 ${
                    isLoading ? 'bg-purple-400' : 'bg-purple-800'
                }`}
            >
                <Text className="text-white text-lg font-semibold text-center">
                    {isLoading ? 'Procesando...' : 'Restablecer Contraseña'}
                </Text>
            </TouchableOpacity>

            {/* Back to Log in */}
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text className="text-gray-800 text-sm underline">Volver al Inicio de Sesión</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ResetPassword;