import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = ({ navigation }) => {
    return (
        <LinearGradient
            colors={['#3B82F6', '#8B5CF6']}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingHorizontal: 20,
                        paddingBottom: 30
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Logo */}
                    <View className="items-center mt-8 mb-6">
                        <Image
                            source={{ uri: 'https://www.escueladefilosofia.org/wp-content/uploads/2022/10/uasd_logo-800x994.png' }}
                            className="w-56 h-56"
                            resizeMode="contain"
                        />
                    </View>

                    {/* Section Container */}
                    <View className="bg-white/90 rounded-2xl p-6 mb-6 shadow-lg">
                        {/* Misión */}
                        <Text className="text-3xl font-bold text-center text-gray-900 mb-4">Misión</Text>
                        <Text className="text-lg text-gray-700 text-justify">
                            Su misión es formar críticamente profesionales, investigadores y técnicos en las ciencias,
                            las humanidades y las artes necesarias y eficientes para coadyuvar a las transformaciones que
                            demanda el desarrollo nacional sostenible, así como difundir los ideales de la cultura de paz,
                            progreso, justicia social, equidad de género y respeto a los derechos humanos, a fin de contribuir
                            a la formación de una conciencia colectiva basada en valores.
                        </Text>

                        {/* Visión */}
                        <Text className="text-3xl font-bold text-center text-gray-900 mt-6 mb-4">Visión</Text>
                        <Text className="text-lg text-gray-700 text-justify">
                            La Universidad tiene como Visión ser una institución de excelencia y liderazgo académico,
                            gestionada con eficiencia y acreditada nacional e internacionalmente; con un personal docente,
                            investigador, extensionistas y egresados de alta calificación; creadora de conocimientos científicos
                            y nuevas tecnologías, y reconocida por su contribución al desarrollo humano con equidad y hacia una
                            sociedad democrática y solidaria.
                        </Text>

                        {/* Valores */}
                        <Text className="text-3xl font-bold text-center text-gray-900 mt-6 mb-4">Valores</Text>
                        <Text className="text-lg text-gray-700 text-justify mb-4">
                            La Universidad está orientada hacia el respeto y la defensa de la dignidad humana y se sustenta en los
                            siguientes valores:
                        </Text>
                        <View className="pl-4">
                            {[
                                'Solidaridad', 'Transparencia', 'Verdad', 'Igualdad',
                                'Libertad', 'Equidad', 'Tolerancia', 'Responsabilidad',
                                'Convivencia', 'Paz'
                            ].map((valor, index) => (
                                <Text
                                    key={valor}
                                    className="text-lg text-gray-700 mb-2"
                                >
                                    {`${String.fromCharCode(97 + index)}) ${valor}`}
                                </Text>
                            ))}
                        </View>
                    </View>

                    {/* Login Button */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                        className="bg-purple-700 p-4 rounded-xl mx-auto shadow-xl w-64 mb-6"
                    >
                        <Text className="text-center text-white text-lg font-bold">
                            Acceder
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default Home;