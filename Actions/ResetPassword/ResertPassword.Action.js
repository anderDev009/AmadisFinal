import api from '../Api/ApiAmadis';

export const resetPasswordAction = async (username, email) => {
    try {
        const response = await api.post('/reset_password', {
            usuario: username,
            email
        });

        return response.data;
    } catch (error) {
        if (error.response) {

            return {
                success: false,
                message: error.response.data.message || 'Error al restablecer la contraseña',
                data: null,
                error: error.response.data
            };
        } else if (error.request) {
            return {
                success: false,
                message: 'No se pudo conectar con el servidor',
                data: null,
                error: error.request
            };
        } else {
            return {
                success: false,
                message: 'Ocurrió un error inesperado',
                data: null,
                error: error.message
            };
        }
    }
};