import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, TextInput, Alert } from 'react-native';
import { SolicitudesAction } from '../Actions/Solicitudes/Solicitudes.action';
import {Picker} from '@react-native-picker/picker';

const SolicitudesView = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSolicitud, setSelectedSolicitud] = useState(null);
    const [tipoSolicitud, setTipoSolicitud] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tiposSolicitudes, setTiposSolicitudes] = useState([]);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setLoading(true);
                const [solicitudesResult, tiposResult] = await Promise.all([
                    SolicitudesAction.getSolicitudes(),
                    SolicitudesAction.getSolicitudesTypes(),
                ]);

                if (solicitudesResult.success) {
                    setSolicitudes(solicitudesResult.data.data);
                } else {
                    setError(solicitudesResult.message);
                }

                if (tiposResult.success) {
                    setTiposSolicitudes(tiposResult.data.data);
                } else {
                    setError(tiposResult.message);
                }
            } catch (err) {
                setError('Error al cargar las solicitudes');
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    const handleCreateSolicitud = async () => {
        if (!tipoSolicitud || !descripcion) {
            Alert.alert('Error', 'Todos los campos son obligatorios.');
            return;
        }

        try {
            const result = await SolicitudesAction.createSolicitudes({
                tipo: tipoSolicitud,
                descripcion,
            });

            if (result.success) {
                Alert.alert('Éxito', 'Solicitud creada exitosamente');
                setSolicitudes((prev) => [...prev, result.data]);
                setTipoSolicitud('');
                setDescripcion('');
            } else {
                Alert.alert('Error', result.message);
            }
        } catch (err) {
            Alert.alert('Error', 'No se pudo crear la solicitud');
        }
    };

    const handleSolicitudClick = (solicitud) => {
        setSelectedSolicitud(solicitud);
    };

    const closeSolicitudDetails = () => {
        setSelectedSolicitud(null);
    };

    const handleCancelSolicitud = async () => {
        try {
            const result = await SolicitudesAction.cancelSolicitudes(selectedSolicitud.id);

            if (result.success) {
                Alert.alert('Éxito', 'Solicitud cancelada exitosamente');
                setSolicitudes((prev) =>
                    prev.filter((solicitud) => solicitud.id !== selectedSolicitud.id)
                );
                closeSolicitudDetails();
            } else {
                Alert.alert('Error', result.message);
            }
        } catch (err) {
            Alert.alert('Error', 'No se pudo cancelar la solicitud');
        }
    };

    const renderSolicitudDetails = () => {
        if (!selectedSolicitud) return null;

        return (
            <View style={styles.solicitudDetailsContainer}>
                <View style={styles.solicitudDetailsHeader}>
                    <Text style={styles.solicitudDetailsTitle}>Detalle de Solicitud</Text>
                    <Text>{selectedSolicitud.id}</Text>
                </View>

                <View style={styles.solicitudDetailsContent}>
                    <Text style={styles.detailLabel}>
                        <Text style={styles.detailBold}>Tipo: </Text>
                        {selectedSolicitud.tipo}
                    </Text>
                    <Text style={styles.detailLabel}>
                        <Text style={styles.detailBold}>Descripción: </Text>
                        {selectedSolicitud.descripcion}
                    </Text>
                    <Text style={styles.detailLabel}>
                        <Text style={styles.detailBold}>Estado: </Text>
                        {selectedSolicitud.estado}
                    </Text>
                    <Text style={styles.detailLabel}>
                        <Text style={styles.detailBold}>Fecha de Solicitud: </Text>
                        {new Date(selectedSolicitud.fechaSolicitud).toLocaleDateString()}
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={handleCancelSolicitud}
                >
                    <Text style={styles.cancelButtonText}>Cancelar Solicitud</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={closeSolicitudDetails}
                >
                    <Text style={styles.backButtonText}>Volver</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const renderSolicitudItem = ({ item }) => (
        <TouchableOpacity
            style={styles.solicitudCard}
            onPress={() => handleSolicitudClick(item)}
        >
            <Text style={styles.solicitudTitle}>{item.tipo}</Text>
            <Text style={styles.solicitudDate}>
                {new Date(item.fechaSolicitud).toLocaleDateString()}
            </Text>
            <Text style={styles.solicitudDescription} numberOfLines={2}>
                {item.descripcion}
            </Text>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Mis Solicitudes</Text>
            <View style={styles.formContainer}>
                <Picker
                    selectedValue={tipoSolicitud}
                    onValueChange={(itemValue) => setTipoSolicitud(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Selecciona un tipo" value="" />
                    {tiposSolicitudes.map((tipo) => (
                        <Picker.Item
                            key={tipo.codigo}
                            label={tipo.descripcion}
                            value={tipo.codigo}
                        />
                    ))}
                </Picker>
                <TextInput
                    style={styles.input}
                    placeholder="Descripción"
                    value={descripcion}
                    onChangeText={setDescripcion}
                />
                <TouchableOpacity style={styles.submitButton} onPress={handleCreateSolicitud}>
                    <Text style={styles.submitButtonText}>Guardar Solicitud</Text>
                </TouchableOpacity>
            </View>
            {selectedSolicitud ? (
                renderSolicitudDetails()
            ) : (
                <FlatList
                    data={solicitudes}
                    renderItem={renderSolicitudItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContainer: {
        paddingBottom: 16,
    },
    solicitudCard: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    solicitudTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    solicitudDate: {
        color: '#666',
        marginBottom: 8,
    },
    solicitudDescription: {
        color: '#333',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
    },
    solicitudDetailsContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    solicitudDetailsHeader: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 12,
        marginBottom: 12,
    },
    solicitudDetailsTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    solicitudDetailsContent: {
        marginBottom: 16,
    },
    detailLabel: {
        marginBottom: 8,
        fontSize: 16,
    },
    detailBold: {
        fontWeight: 'bold',
    },
    backButton: {
        backgroundColor: '#f0f0f0',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    backButtonText: {
        fontWeight: 'bold',
        color: '#333',
    },
    formContainer: {
        marginBottom: 16,
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
    },
    picker: {
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        marginBottom: 8,
    },
    submitButton: {
        backgroundColor: '#007BFF',
        padding: 12,
        borderRadius: 4,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: 'red',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
    },
    cancelButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default SolicitudesView;
