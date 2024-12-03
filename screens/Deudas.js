import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { DeudaAction } from '../Actions/Deuda/Deuda.action';

const DeudasView = () => {
    const [deudas, setDeudas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDeudas = async () => {
            setLoading(true);
            try {
                const result = await DeudaAction();

                if (result.success) {
                    setDeudas(result.data);
                } else {
                    setError(result.message);
                }
            } catch (err) {
                setError('Error al obtener las deudas');
            } finally {
                setLoading(false);
            }
        };

        fetchDeudas();
    }, []);

    const handleMarcarComoPagada = (id) => {
        // Actualiza el estado para reflejar que la deuda está pagada
        setDeudas((prevDeudas) =>
            prevDeudas.map((deuda) =>
                deuda.id === id ? { ...deuda, pagada: true } : deuda
            )
        );
        Alert.alert('Éxito', 'La deuda se marcó como pagada');
    };

    const renderDeudaItem = ({ item }) => (
        <View style={styles.deudaCard}>
            <Text style={styles.deudaText}>
                <Text style={styles.label}>ID:</Text> {item.id}
            </Text>
            <Text style={styles.deudaText}>
                <Text style={styles.label}>Monto:</Text> ${item.monto}
            </Text>
            <Text style={styles.deudaText}>
                <Text style={styles.label}>Estado:</Text>{' '}
                {item.pagada ? 'Pagada' : 'Pendiente'}
            </Text>
            <Text style={styles.deudaText}>
                <Text style={styles.label}>Última actualización:</Text>{' '}
                {new Date(item.fechaActualizacion).toLocaleDateString()}
            </Text>
            {!item.pagada && (
                <TouchableOpacity
                    style={styles.pagarButton}
                    onPress={() => handleMarcarComoPagada(item.id)}
                >
                    <Text style={styles.pagarButtonText}>Marcar como pagada</Text>
                </TouchableOpacity>
            )}
        </View>
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
            <Text style={styles.headerTitle}>Mis Deudas</Text>
            <FlatList
                data={deudas}
                renderItem={renderDeudaItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    deudaCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        elevation: 3,
    },
    deudaText: {
        fontSize: 16,
        marginBottom: 8,
    },
    label: {
        fontWeight: 'bold',
    },
    pagarButton: {
        backgroundColor: '#4caf50',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    pagarButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    },
    listContainer: {
        paddingBottom: 16,
    },
});

export default DeudasView;
