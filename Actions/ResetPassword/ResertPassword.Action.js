import api from '../Api/ApiAmadis'; // Adjust the import path as needed

export const resetPasswordAction = async (username, email) => {
    try {
        const response = await api.post('/reset_password', {
            usuario: username,
            email
        });

        return response.data;
    } catch (error) {
        // Handle different types of errors
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            return {
                success: false,
                message: error.response.data.message || 'Error al restablecer la contraseña',
                data: null,
                error: error.response.data
            };
        } else if (error.request) {
            // The request was made but no response was received
            return {
                success: false,
                message: 'No se pudo conectar con el servidor',
                data: null,
                error: error.request
            };
        } else {
            // Something happened in setting up the request that triggered an Error
            return {
                success: false,
                message: 'Ocurrió un error inesperado',
                data: null,
                error: error.message
            };
        }
    }
};