import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const Home = ({ navigation }) => {
    return (
        <View className="flex-1 bg-gradient-to-b from-blue-500 to-purple-600">
            {/* Contenedor principal */}
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                {/* Logo */}
                <Image
                    source={{ uri: 'https://www.escueladefilosofia.org/wp-content/uploads/2022/10/uasd_logo-800x994.png' }}
                    className="w-48 h-48 mx-auto mt-10"
                    resizeMode="contain"
                />

                {/* Misión */}
                <Text className="text-2xl font-bold text-center text-gray-800 mt-6">Misión</Text>
                <Text className="text-lg text-gray-800 text-justify mt-4">
                    Su misión es formar críticamente profesionales, investigadores y técnicos en las ciencias,
                    las humanidades y las artes necesarias y eficientes para coadyuvar a las transformaciones que
                    demanda el desarrollo nacional sostenible, así como difundir los ideales de la cultura de paz,
                    progreso, justicia social, equidad de género y respeto a los derechos humanos, a fin de contribuir
                    a la formación de una conciencia colectiva basada en valores.
                </Text>

                {/* Visión */}
                <Text className="text-2xl font-bold text-center text-gray-800 mt-8">Visión</Text>
                <Text className="text-lg text-gray-800 text-justify mt-4">
                    La Universidad tiene como Visión ser una institución de excelencia y liderazgo académico,
                    gestionada con eficiencia y acreditada nacional e internacionalmente; con un personal docente,
                    investigador, extensionistas y egresados de alta calificación; creadora de conocimientos científicos
                    y nuevas tecnologías, y reconocida por su contribución al desarrollo humano con equidad y hacia una
                    sociedad democrática y solidaria.
                </Text>

                {/* Valores */}
                <Text className="text-2xl font-bold text-center text-gray-800 mt-8">Valores</Text>
                <Text className="text-lg text-gray-800 text-justify mt-4">
                    La Universidad está orientada hacia el respeto y la defensa de la dignidad humana y se sustenta en los
                    siguientes valores:
                </Text>
                <Text className="text-gray-800 mt-4 ml-4">
                    a) Solidaridad{'\n'}
                    b) Transparencia{'\n'}
                    c) Verdad{'\n'}
                    d) Igualdad{'\n'}
                    e) Libertad{'\n'}
                    f) Equidad{'\n'}
                    g) Tolerancia{'\n'}
                    h) Responsabilidad{'\n'}
                    i) Convivencia{'\n'}
                    j) Paz
                </Text>

                {/* Botón de Login */}
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    className="bg-purple-700 p-4 rounded-lg mt-10 mx-auto shadow-lg w-60"
                >
                    <Text className="text-center text-white text-lg font-semibold">Acceder</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default Home;
