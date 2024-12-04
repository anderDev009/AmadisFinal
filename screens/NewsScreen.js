import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import {GetNoticias} from "../Actions/Noticias/Noticias.action";

const NewsScreen = () => {
    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNoticias();
    }, []);

    const fetchNoticias = async () => {
        try {
            const data = await GetNoticias(); // Assuming this function exists
            console.log(data);
            setNoticias(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching news:', error);
            setLoading(false);
        }
    };

    const handleNewsPress = (url) => {
        Linking.openURL(url);
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-gray-100">
                <Text className="text-lg text-gray-600">Cargando noticias...</Text>
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 bg-gray-100">
            <View className="p-4">
                <Text className="text-2xl font-bold text-gray-800 mb-4">
                    Últimas Noticias UASD
                </Text>

                {noticias.map((noticia) => (
                    <TouchableOpacity
                        key={noticia.id}
                        className="bg-white rounded-lg shadow-md mb-4 overflow-hidden"
                        onPress={() => handleNewsPress(noticia.url)}
                    >
                        <Image
                            source={{ uri: noticia.img }}
                            className="w-full h-48"
                            resizeMode="cover"
                        />
                        <View className="p-4">
                            <Text className="text-lg font-semibold text-gray-800 mb-2">
                                {noticia.title}
                            </Text>
                            <Text className="text-sm text-gray-500">
                                {new Date(noticia.date).toLocaleDateString('es-ES', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

export default NewsScreen;