import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAuth} from '../contexts/AuthContext';
import {RootStackParamList} from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

interface ProfileInfo {
  label: string;
  value: string;
}

const ProfileScreen = ({navigation}: Props) => {
  const {user, logout} = useAuth();

  // Dummy profile data
  const profileInfo: ProfileInfo[] = [
    {label: 'Full Name', value: user?.name || 'N/A'},
    {label: 'Email', value: user?.email || 'N/A'},
    {label: 'Phone', value: '+1 (555) 123-4567'},
    {label: 'Location', value: 'New York, USA'},
    {label: 'Member Since', value: 'January 2024'},
    {label: 'Account Status', value: 'Active'},
  ];

  const handleLogout = () => {
    logout();
    // Navigation will automatically switch to AuthStack when isAuthenticated becomes false
  };

  return (
    <ScrollView testID="profile-screen" style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View testID="profile-avatar" style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
        </View>
        <Text testID="profile-name" style={styles.name}>{user?.name}</Text>
        <Text testID="profile-email" style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.section}>
        <Text testID="profile-info-title" style={styles.sectionTitle}>Profile Information</Text>
        {profileInfo.map((info, index) => (
          <View key={index} testID={`profile-info-row-${index}`} style={styles.infoRow}>
            <Text testID={`profile-info-label-${index}`} style={styles.infoLabel}>{info.label}</Text>
            <Text testID={`profile-info-value-${index}`} style={styles.infoValue}>{info.value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text testID="profile-stats-title" style={styles.sectionTitle}>Statistics</Text>
        <View style={styles.statsRow}>
          <View testID="profile-stat-orders" style={styles.statItem}>
            <Text testID="profile-stat-orders-value" style={styles.statValue}>156</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View testID="profile-stat-spent" style={styles.statItem}>
            <Text testID="profile-stat-spent-value" style={styles.statValue}>$12,345</Text>
            <Text style={styles.statLabel}>Spent</Text>
          </View>
          <View testID="profile-stat-rating" style={styles.statItem}>
            <Text testID="profile-stat-rating-value" style={styles.statValue}>4.8</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          testID="profile-back-button"
          style={styles.actionButton}
          onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.actionButtonText}>Back to Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity testID="profile-logout-button" style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 16,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  actionButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;

