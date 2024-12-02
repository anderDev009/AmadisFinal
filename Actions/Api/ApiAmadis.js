import axios from 'axios';

// Crea la instancia configurable con soporte para login
const createAxiosInstance = (baseURL) => {
    let token = null;

    const instance = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    instance.interceptors.request.use(
        (config) => {
            if (token) {
                config.headers.Authorization = `${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    instance.login = async (credentials) => {
        try {
            const response = await instance.post('/login', credentials);
            token = response.data.data.authToken;
            console.log('Token obtenido:', token);
        } catch (error) {
            console.error('Error al loguearse:', error);
            throw error;
        }
    };

    return instance;
};


const api = createAxiosInstance('https://uasdapi.ia3x.com');
export default api;

