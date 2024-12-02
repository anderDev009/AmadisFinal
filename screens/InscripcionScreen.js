import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { GetMaterias, AddrMateriaPreseleccion, GetPreseleccion, CancelMateria } from '../Actions/Preseleccion/Preseleccion.action';

const PreseleccionScreen = () => {
    const [materiasDisponibles, setMateriasDisponibles] = useState([]);
    const [materiasPreseleccionadas, setMateriasPreseleccionadas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [disponibles, preseleccionadas] = await Promise.all([
                GetMaterias(),
                GetPreseleccion()
            ]);
            setMateriasDisponibles(disponibles);
            setMateriasPreseleccionadas(preseleccionadas);
            console.log(disponibles);
        } catch (error) {
            Alert.alert('Error', 'No se pudieron cargar las materias');
        } finally {
            setLoading(false);
        }
    };

    const handlePreseleccionar = async (codigo) => {
        try {
            const success = await AddrMateriaPreseleccion(codigo);
            if (success) {
                Alert.alert('Éxito', 'Materia preseleccionada correctamente');
                loadData(); // Recargar datos
            } else {
                Alert.alert('Error', 'No se pudo preseleccionar la materia');
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al preseleccionar la materia');
        }
    };

    const handleCancelar = async (codigo) => {
        try {
            const success = await CancelMateria(codigo);
            if (success) {
                Alert.alert('Éxito', 'Materia cancelada correctamente');
                loadData(); // Recargar datos
            } else {
                Alert.alert('Error', 'No se pudo cancelar la materia');
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al cancelar la materia');
        }
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-gray-100">
                <ActivityIndicator size="large" color="#0284c7" />
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 bg-gray-100">
            <View className="p-4">
                {/* Sección de Materias Preseleccionadas */}
                <View className="mb-6">
                    <Text className="text-xl font-bold text-gray-800 mb-4">
                        Materias Preseleccionadas
                    </Text>
                    {materiasPreseleccionadas.length === 0 ? (
                        <Text className="text-gray-500 italic">
                            No hay materias preseleccionadas
                        </Text>
                    ) : (
                        materiasPreseleccionadas.map((materia) => (
                            <View
                                key={materia.codigo}
                                className="bg-white rounded-lg shadow-sm p-4 mb-2 flex-row justify-between items-center"
                            >
                                <View className="flex-1">
                                    <Text className="font-semibold text-gray-800">
                                        {materia.nombre}
                                    </Text>
                                    <Text className="text-gray-600 text-sm">
                                        Código: {materia.codigo}
                                    </Text>
                                    <Text className="text-gray-600 text-sm">
                                        Créditos: {materia.creditos}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => handleCancelar(materia.codigo)}
                                    className="bg-red-500 px-4 py-2 rounded-lg"
                                >
                                    <Text className="text-white font-medium">Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    )}
                </View>

                {/* Sección de Materias Disponibles */}
                <View>
                    <Text className="text-xl font-bold text-gray-800 mb-4">
                        Materias Disponibles
                    </Text>
                    {materiasDisponibles.map((materia) => (
                        <View
                            key={materia.codigo}
                            className="bg-white rounded-lg shadow-sm p-4 mb-2 flex-row justify-between items-center"
                        >
                            <View className="flex-1">
                                <Text className="font-semibold text-gray-800">
                                    {materia.nombre}
                                </Text>
                                <Text className="text-gray-600 text-sm">
                                    Código: {materia.codigo}
                                </Text>
                                <Text className="text-gray-600 text-sm">
                                    Créditos: {materia.creditos}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => handlePreseleccionar(materia.codigo)}
                                className="bg-blue-500 px-4 py-2 rounded-lg"
                                disabled={materiasPreseleccionadas.some(m => m.codigo === materia.codigo)}
                            >
                                <Text className="text-white font-medium">
                                    Preseleccionar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

export default PreseleccionScreen;