import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { TareasAction } from '../Actions/Tareas/Tareas.action';

const TareasList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setLoading(true);
                const result = await TareasAction();

                if (result.success) {
                    setTasks(result.data);
                    setError(null);
                    checkUpcomingDeadlines(result.data);
                } else {
                    setError(result.message);
                }
            } catch (err) {
                setError('Error al cargar las tareas');
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const checkUpcomingDeadlines = (tasks) => {
        const now = new Date();
        tasks.forEach((task) => {
            const deadline = new Date(task.fechaVencimiento);
            const diffInDays = (deadline - now) / (1000 * 60 * 60 * 24);
            if (diffInDays > 0 && diffInDays <= 3) {
                Alert.alert('Recordatorio', `La tarea "${task.titulo}" vence pronto (${deadline.toLocaleDateString()}).`);
            }
        });
    };

    const handleTaskClick = (task) => {
        setSelectedTask(task);
    };

    const closeTaskDetails = () => {
        setSelectedTask(null);
    };

    const renderTaskDetails = () => {
        if (!selectedTask) return null;

        return (
            <View style={styles.taskDetailsContainer}>
                <View style={styles.taskDetailsHeader}>
                    <Text style={styles.taskDetailsTitle}>{selectedTask.titulo}</Text>
                </View>

                <View style={styles.taskDetailsContent}>
                    <Text style={styles.detailLabel}>
                        <Text style={styles.detailBold}>Fecha de Vencimiento: </Text>
                        {new Date(selectedTask.fechaVencimiento).toLocaleString()}
                    </Text>
                    <Text style={styles.detailLabel}>
                        <Text style={styles.detailBold}>Descripción: </Text>
                        {selectedTask.descripcion}
                    </Text>
                    <Text style={styles.detailLabel}>
                        <Text style={styles.detailBold}>Completada: </Text>
                        {selectedTask.completada ? 'Sí' : 'No'}
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={closeTaskDetails}
                >
                    <Text style={styles.backButtonText}>Volver</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const renderTaskItem = ({ item }) => (
        <TouchableOpacity
            style={styles.taskCard}
            onPress={() => handleTaskClick(item)}
        >
            <Text style={styles.taskTitle}>{item.titulo}</Text>
            <Text style={styles.taskDeadline}>
                {new Date(item.fechaVencimiento).toLocaleDateString()}
            </Text>
            <Text style={styles.taskDescription} numberOfLines={2}>
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
            <Text style={styles.headerTitle}>Tareas Pendientes</Text>
            <Text>{tasks.message}</Text>
            {selectedTask ? (
                renderTaskDetails()
            ) : (
                <FlatList
                    data={tasks}
                    renderItem={renderTaskItem}
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
    taskCard: {
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
    taskTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    taskDeadline: {
        color: '#666',
        marginBottom: 8,
    },
    taskDescription: {
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
    taskDetailsContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    taskDetailsHeader: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 12,
        marginBottom: 12,
    },
    taskDetailsTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    taskDetailsContent: {
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

export default TareasList;
