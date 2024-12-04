import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    ScrollView,
    Image,
    StyleSheet,
} from 'react-native';
import { GetHorario } from "../Actions/Horarios/Horarios.action";

const HorariosList = () => {
    const [horarios, setHorarios] = useState([]);
    const [selectedHorario, setSelectedHorario] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHorarios = async () => {
            setLoading(true);
            try {
                const response = await GetHorario();
                setHorarios(response);
            } catch (error) {
                console.log(error);
                setError('Ocurrió un error al cargar los horarios');
            } finally {
                setLoading(false);
            }
        };

        fetchHorarios();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-DO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getColorForMateria = (materia) => {
        const prefix = materia.substring(0, 3).toLowerCase();
        switch (prefix) {
            case 'inf':
                return {
                    backgroundColor: '#EFF6FF',
                    borderColor: '#BFDBFE'
                };
            case 'med':
                return {
                    backgroundColor: '#ECFDF5',
                    borderColor: '#A7F3D0'
                };
            default:
                return {
                    backgroundColor: '#F9FAFB',
                    borderColor: '#E5E7EB'
                };
        }
    };

    const BackIcon = () => (
        <Text style={styles.backIcon}>←</Text>
    );

    const ClockIcon = () => (
        <Text style={styles.icon}>🕒</Text>
    );

    const BuildingIcon = () => (
        <Text style={styles.icon}>🏛️</Text>
    );

    const LocationIcon = () => (
        <Text style={styles.icon}>📍</Text>
    );

    const BookIcon = () => (
        <Text style={styles.icon}>📚</Text>
    );

    const renderHorarioDetails = () => {
        if (!selectedHorario) return null;

        const colorStyle = getColorForMateria(selectedHorario.materia);

        return (
            <ScrollView style={styles.container}>
                <View style={styles.detailsCard}>
                    <View style={styles.headerRow}>
                        <TouchableOpacity
                            onPress={() => setSelectedHorario(null)}
                            style={styles.backButton}
                        >
                            <BackIcon />
                        </TouchableOpacity>
                        <Text style={styles.detailsTitle}>Detalles del Horario</Text>
                        <View style={styles.spacer} />
                    </View>

                    <View style={[styles.detailsContent, { backgroundColor: colorStyle.backgroundColor, borderColor: colorStyle.borderColor }]}>
                        <View style={styles.materiaHeader}>
                            <BookIcon />
                            <Text style={styles.materiaTitle}>{selectedHorario.materia.toUpperCase()}</Text>
                        </View>

                        <View style={styles.detailsRow}>
                            <ClockIcon />
                            <Text style={styles.detailText}>{formatDate(selectedHorario.fechaHora)}</Text>
                        </View>

                        <View style={styles.detailsRow}>
                            <BuildingIcon />
                            <Text style={styles.detailText}>Aula {selectedHorario.aula.toUpperCase()}</Text>
                        </View>

                        <View style={styles.detailsRow}>
                            <LocationIcon />
                            <Text style={styles.detailText}>{selectedHorario.ubicacion}</Text>
                        </View>

                        <Image
                            source={{ uri: 'https://via.placeholder.com/600x300' }}
                            style={styles.mapImage}
                            resizeMode="cover"
                        />
                    </View>
                </View>
            </ScrollView>
        );
    };

    const renderHorarioItem = ({ item }) => {
        const colorStyle = getColorForMateria(item.materia);

        return (
            <TouchableOpacity
                onPress={() => setSelectedHorario(item)}
                style={[styles.horarioCard, { backgroundColor: colorStyle.backgroundColor, borderColor: colorStyle.borderColor }]}
            >
                <View style={styles.horarioHeader}>
                    <View style={styles.materiaRow}>
                        <BookIcon />
                        <Text style={styles.materiaText}>{item.materia.toUpperCase()}</Text>
                    </View>
                    <View style={styles.aulaContainer}>
                        <Text style={styles.aulaText}>Aula {item.aula.toUpperCase()}</Text>
                    </View>
                </View>

                <View style={styles.dateRow}>
                    <ClockIcon />
                    <Text style={styles.dateText}>{formatDate(item.fechaHora)}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#3B82F6" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorTitle}>Error</Text>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    if (selectedHorario) {
        return renderHorarioDetails();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.mainTitle}>Horarios UASD</Text>
            <FlatList
                data={horarios}
                renderItem={renderHorarioItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        padding: 16,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    listContainer: {
        paddingBottom: 16,
    },
    horarioCard: {
        borderWidth: 2,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    horarioHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    materiaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    materiaText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    aulaContainer: {
        backgroundColor: 'white',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
    aulaText: {
        fontSize: 12,
        fontWeight: '500',
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
        gap: 8,
    },
    dateText: {
        fontSize: 14,
        color: '#4B5563',
    },
    detailsCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    backButton: {
        padding: 8,
    },
    backIcon: {
        fontSize: 24,
    },
    detailsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    spacer: {
        width: 40,
    },
    detailsContent: {
        borderWidth: 2,
        borderRadius: 12,
        padding: 16,
    },
    materiaHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 8,
    },
    materiaTitle: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    detailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 8,
    },
    detailText: {
        fontSize: 16,
    },
    mapImage: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        marginTop: 16,
    },
    icon: {
        fontSize: 20,
    },
    errorTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#EF4444',
        marginBottom: 8,
    },
    errorText: {
        color: '#EF4444',
    },
});

export default HorariosList;