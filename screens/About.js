import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const About = () => {
    const developers = [
        {
            name: 'Richard Ortiz',
            matricula: '2022-1915',
            bio: 'Richard es un desarrollador con un enfoque en soluciones innovadoras. Apasionado por el desarrollo de software y siempre en busca de nuevas tecnologías que transformen la experiencia del usuario.',
            photo: require('../assets/Richard.png'), // Foto local
        },
        {
            name: 'Hansel Rodriguez',
            matricula: '2022-0897',
            bio: 'Hansel es un experto en diseño de interfaces móviles. Le apasiona crear aplicaciones intuitivas que ofrezcan una experiencia fluida y agradable para los usuarios, utilizando los principios de diseño centrado en el usuario.',
          ///  photo: require('../assets/Hansel.png'), // Foto local
        },
        {
            name: 'Anthony Espinal',
            matricula: '2022-1960',
            bio: 'Anthony se especializa en el desarrollo de aplicaciones móviles y soluciones backend. Con un enfoque práctico y orientado a resultados, siempre está dispuesto a aprender nuevas herramientas que mejoren la eficiencia del desarrollo.',
            photo: require('../assets/Anthony.png'), // Foto local
        },
        {
            name: 'Ricelys Marte',
            matricula: '2022-1943',
            bio: 'Ricelys tiene una gran pasión por las tecnologías emergentes y el desarrollo de software. Se enfoca en mejorar la experiencia de usuario mediante interfaces limpias y fáciles de usar, siempre buscando cómo hacer que las aplicaciones sean más accesibles.',
            photo: require('../assets/ris.png'),  // Foto local
        },
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Acerca de Nosotros</Text>
            {developers.map((dev, index) => (
                <View key={index} style={styles.card}>
                    {/* Usamos directamente dev.photo como source */}
                    <Image source={dev.photo} style={styles.photo} />
                    <Text style={styles.name}>{dev.name}</Text>
                    <Text style={styles.matricula}>Matrícula: {dev.matricula}</Text>
                    <Text style={styles.bio}>{dev.bio}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    card: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        alignItems: 'center',
    },
    photo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    matricula: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    bio: {
        fontSize: 14,
        textAlign: 'center',
        color: '#555',
    },
});

export default About;
