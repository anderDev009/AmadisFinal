import api from '../Api/ApiAmadis';

export const SolicitudesAction = {
    // Get all requests
    getSolicitudes: async () => {
        try {
            const response = await api.get('/mis_solicitudes');

            return {
                success: true,
                message: 'Solicitudes obtenidas exitosamente',
                data: response.data,
                error: null
            };
        } catch (error) {
            if (error.response) {
                return {
                    success: false,
                    message: error.response.data.message || 'Error al obtener solicitudes',
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
                    message: 'Ocurrió un error inesperado al obtener solicitudes',
                    data: null,
                    error: error.message
                };
            }
        }
    },

    // Create new request
    createSolicitudes: async (requestData) => {
        try {
            const response = await api.post('/crear_solicitud', requestData);

            return {
                success: true,
                message: 'Solicitud creada exitosamente',
                data: response.data,
                error: null
            };
        } catch (error) {
            if (error.response) {
                return {
                    success: false,
                    message: error.response.data.message || 'Error al crear solicitud',
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
                    message: 'Ocurrió un error inesperado al crear solicitud',
                    data: null,
                    error: error.message
                };
            }
        }
    },

    // Cancel request
    cancelSolicitudes: async (requestId) => {
        try {
            const response = await api.post(`/cancelar_solicitud`,  requestId );

            return {
                success: true,
                message: 'Solicitud cancelada exitosamente',
                data: response.data,
                error: null
            };
        } catch (error) {
            if (error.response) {
                return {
                    success: false,
                    message: error.response.data.message || 'Error al cancelar solicitud',
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
                    message: 'Ocurrió un error inesperado al cancelar solicitud',
                    data: null,
                    error: error.message
                };
            }
        }
    },

    // Get request types
    getSolicitudesTypes: async () => {
        try {
            const response = await api.get('/tipos_solicitudes');

            return {
                success: true,
                message: 'Tipos de solicitudes obtenidos exitosamente',
                data: response.data,
                error: null
            };
        } catch (error) {
            if (error.response) {
                return {
                    success: false,
                    message: error.response.data.message || 'Error al obtener tipos de solicitudes',
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
                    message: 'Ocurrió un error inesperado al obtener tipos de solicitudes',
                    data: null,
                    error: error.message
                };
            }
        }
    }
};