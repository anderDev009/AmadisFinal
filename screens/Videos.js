import React from 'react';
import { View, Text, StyleSheet, FlatList, Button, Linking } from 'react-native';

const Videos = () => {
    // Lista de videos con sus URLs predeterminadas
    const videoData = [
        { id: '1', title: 'Introducción a la Universidad', description: 'Un recorrido por nuestra institución.', videoUrl: 'https://youtu.be/foK1vNrhRgU?si=VRLkvhD3FjdS8vCr' },
        { id: '2', title: 'Eventos y Actividades', description: 'Conoce las actividades que organizamos.', videoUrl: 'https://www.youtube.com/watch?v=LY7CaVpZjAk&list=PLsXnKp0TV6nKhadwczeyzW8VwFJpXaivB' },
        { id: '3', title: 'Graduaciones', description: 'Testimonios de nuestros estudiantes.', videoUrl: 'https://www.youtube.com/watch?v=k2Q-2Q2J7RM&list=PLsXnKp0TV6nJACpSDkx0h4L74Xkc4Hl6B' },
    ];
  
    // Redirigir al usuario al video cuando haga clic en el botón
    const handleVideoPress = (videoUrl) => {
        // Usamos Linking para abrir la URL en el navegador del dispositivo
        Linking.openURL(videoUrl).catch((err) => {
            console.error('Error al intentar abrir el video:', err);
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sección de Videos</Text>
            <Text style={styles.description}>
                Aquí podrás encontrar videos educativos y promocionales relacionados con la Universidad y sus actividades.
            </Text>
            <FlatList
                data={videoData}
                renderItem={({ item }) => (
                    <View style={styles.videoCard}>
                        <Text style={styles.videoTitle}>{item.title}</Text>
                        <Text style={styles.videoDescription}>{item.description}</Text>
                        
                        {/* Botón para redirigir al video */}
                        <Button
                            title="Ver Video"
                            onPress={() => handleVideoPress(item.videoUrl)} // Abre el video al hacer clic
                        />
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    videoCard: {
        backgroundColor: '#f8f9fa',
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
        width: '100%',
    },
    videoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    videoDescription: {
        fontSize: 14,
        color: '#666',
    },
});

export default Videos;