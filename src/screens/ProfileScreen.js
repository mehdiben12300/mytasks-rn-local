import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTasks } from '../context/TaskContext';
import { saveTasksToStorage, initialTasks } from '../storage/asyncStorage';

export const ProfileScreen = () => {
  const { stats, tasks } = useTasks();

  const performReset = async () => {
    await saveTasksToStorage(initialTasks);
    if (Platform.OS === 'web') {
      window.alert('Données réinitialisées. Rafraîchissez la page (F5) pour recharger.');
    } else {
      Alert.alert(
        'Succès',
        'Données réinitialisées. Redémarrez ou rafraîchissez pour recharger.'
      );
    }
  };

  const handleResetData = () => {
    if (Platform.OS === 'web') {
      if (window.confirm('Voulez-vous restaurer les 5 tâches de démonstration initiales ?')) {
        performReset();
      }
    } else {
      Alert.alert(
        'Réinitialiser les données',
        'Voulez-vous restaurer les 5 tâches de démonstration initiales ?',
        [
          { text: 'Annuler', style: 'cancel' },
          {
            text: 'Réinitialiser',
            style: 'destructive',
            onPress: performReset,
          },
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.container}>
        {/* Avatar et Nom */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={44} color="#0284C7" />
          </View>
          <Text style={styles.userName}>Mon Espace</Text>
          <Text style={styles.userRole}>Étudiant / Développeur Mobile</Text>
        </View>

        {/* Carte Mode de stockage */}
        <View style={styles.infoCard}>
          <View style={styles.infoCardHeader}>
            <Ionicons name="hardware-chip-outline" size={22} color="#0284C7" />
            <Text style={styles.infoCardTitle}>Mode de stockage</Text>
          </View>
          <View style={styles.badgeMode}>
            <Text style={styles.badgeModeText}>Projet 1 : 100% Local</Text>
          </View>
          <Text style={styles.infoCardDesc}>
            Toutes les données sont persistées sur le téléphone via{' '}
            <Text style={{ fontWeight: '700' }}>AsyncStorage</Text>. Aucune connexion Internet
            n'est requise.
          </Text>
        </View>

        {/* Statistiques rapides */}
        <View style={styles.statsCard}>
          <Text style={styles.statsCardTitle}>Résumé de vos activités</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.total}</Text>
              <Text style={styles.statLabel}>Créées</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: '#10B981' }]}>{stats.completed}</Text>
              <Text style={styles.statLabel}>Terminées</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: '#F59E0B' }]}>{stats.pending}</Text>
              <Text style={styles.statLabel}>En attente</Text>
            </View>
          </View>
        </View>

        {/* Action réinitialiser */}
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleResetData}
          activeOpacity={0.8}
        >
          <Ionicons name="refresh-outline" size={18} color="#DC2626" />
          <Text style={styles.resetButtonText}>Réinitialiser les données d'exemple</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8FAFC',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  userName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  userRole: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  infoCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  infoCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  badgeMode: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginVertical: 6,
  },
  badgeModeText: {
    color: '#0284C7',
    fontWeight: '700',
    fontSize: 12,
  },
  infoCardDesc: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
    marginTop: 4,
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 24,
  },
  statsCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 14,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FEE2E2',
    paddingVertical: 14,
    borderRadius: 12,
  },
  resetButtonText: {
    color: '#DC2626',
    fontWeight: '700',
    fontSize: 14,
  },
});

export default ProfileScreen;
