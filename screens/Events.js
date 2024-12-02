import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { EventsAction } from '../Actions/Events/Events.action';

const EventsList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const result = await EventsAction();

                if (result.success) {
                    setEvents(result.data);
                    setError(null);
                } else {
                    setError(result.message);
                }
            } catch (err) {
                setError('Error al cargar los eventos');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handleEventClick = (event) => {
        setSelectedEvent(event);
    };

    const closeEventDetails = () => {
        setSelectedEvent(null);
    };

    const renderEventDetails = () => {
        if (!selectedEvent) return null;

        return (
            <View style={styles.eventDetailsContainer}>
                <View style={styles.eventDetailsHeader}>
                    <Text style={styles.eventDetailsTitle}>{selectedEvent.titulo}</Text>
                </View>

                <View style={styles.eventDetailsContent}>
                    <Text style={styles.detailLabel}>
                        <Text style={styles.detailBold}>Fecha: </Text>
                        {selectedEvent.fecha}
                    </Text>
                    <Text style={styles.detailLabel}>
                        <Text style={styles.detailBold}>Lugar: </Text>
                        {selectedEvent.lugar}
                    </Text>
                    <Text style={styles.detailLabel}>
                        <Text style={styles.detailBold}>Descripción: </Text>
                        {selectedEvent.descripcion}
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={closeEventDetails}
                >
                    <Text style={styles.backButtonText}>Volver</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const renderEventItem = ({ item }) => (
        <TouchableOpacity
            style={styles.eventCard}
            onPress={() => handleEventClick(item)}
        >
            <Text style={styles.eventTitle}>{item.titulo}</Text>
            <Text style={styles.eventDate}>{item.fecha}</Text>
            <Text style={styles.eventDescription} numberOfLines={2}>
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
            <Text style={styles.headerTitle}>Eventos UASD</Text>

            {selectedEvent ? (
                renderEventDetails()
            ) : (
                <FlatList
                    data={events}
                    renderItem={renderEventItem}
                    keyExtractor={(item) => item.id.toString()}
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
    eventCard: {
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
    eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    eventDate: {
        color: '#666',
        marginBottom: 8,
    },
    eventDescription: {
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
    eventDetailsContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    eventDetailsHeader: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 12,
        marginBottom: 12,
    },
    eventDetailsTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    eventDetailsContent: {
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
});

export default EventsList;