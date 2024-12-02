import api from '../Api/ApiAmadis';

export const EventsAction = async () => {
    try {
        const response = await api.get('/eventos');

        return {
            success: true,
            message: 'Eventos obtenidos exitosamente',
            data: response.data,
            error: null
        };
    } catch (error) {
        if (error.response) {

            return {
                success: false,
                message: error.response.data.message || 'Error al obtener eventos',
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
                message: 'Ocurrió un error inesperado al obtener eventos',
                data: null,
                error: error.message
            };
        }
    }
};