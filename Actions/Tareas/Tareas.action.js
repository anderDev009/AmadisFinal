import api from '../Api/ApiAmadis';

export const TareasAction = async () => {
    try {
        const response = await api.get('/tareas');

        return {
            success: true,
            message: 'Tareas obtenidas exitosamente',
            data: response.data,
            error: null
        };
    } catch (error) {
        if (error.response) {
            return {
                success: false,
                message: error.response.data.message || 'Error al obtener tareas',
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
                message: 'Ocurrió un error inesperado al obtener tareas',
                data: null,
                error: error.message
            };
        }
    }
};
