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

type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

interface DashboardStat {
  id: string;
  title: string;
  value: string;
  change: string;
  color: string;
}

interface RecentActivity {
  id: string;
  title: string;
  description: string;
  time: string;
}

const DashboardScreen = ({navigation}: Props) => {
  const {user} = useAuth();

  // Dummy dashboard data
  const stats: DashboardStat[] = [
    {id: '1', title: 'Total Users', value: '1,234', change: '+12%', color: '#007AFF'},
    {id: '2', title: 'Revenue', value: '$45,678', change: '+8%', color: '#34C759'},
    {id: '3', title: 'Orders', value: '567', change: '+23%', color: '#FF9500'},
    {id: '4', title: 'Growth', value: '18%', change: '+5%', color: '#AF52DE'},
  ];

  const recentActivities: RecentActivity[] = [
    {
      id: '1',
      title: 'New Order Received',
      description: 'Order #12345 has been placed',
      time: '2 hours ago',
    },
    {
      id: '2',
      title: 'User Registration',
      description: '5 new users registered today',
      time: '4 hours ago',
    },
    {
      id: '3',
      title: 'Payment Processed',
      description: 'Payment of $1,234 completed',
      time: '6 hours ago',
    },
    {
      id: '4',
      title: 'System Update',
      description: 'Application updated to v2.0',
      time: '1 day ago',
    },
  ];

  return (
    <ScrollView testID="dashboard-screen" style={styles.container}>
      <View style={styles.header}>
        <Text testID="dashboard-greeting" style={styles.greeting}>Hello, {user?.name}!</Text>
        <Text testID="dashboard-subtitle" style={styles.subtitle}>Here's what's happening today</Text>
      </View>

      <View style={styles.statsContainer}>
        {stats.map(stat => (
          <View key={stat.id} testID={`dashboard-stat-${stat.id}`} style={styles.statCard}>
            <Text testID={`dashboard-stat-title-${stat.id}`} style={styles.statTitle}>{stat.title}</Text>
            <Text testID={`dashboard-stat-value-${stat.id}`} style={[styles.statValue, {color: stat.color}]}>
              {stat.value}
            </Text>
            <Text testID={`dashboard-stat-change-${stat.id}`} style={styles.statChange}>{stat.change}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text testID="dashboard-activity-title" style={styles.sectionTitle}>Recent Activity</Text>
        {recentActivities.map(activity => (
          <View key={activity.id} testID={`dashboard-activity-${activity.id}`} style={styles.activityCard}>
            <View style={styles.activityContent}>
              <Text testID={`dashboard-activity-title-${activity.id}`} style={styles.activityTitle}>{activity.title}</Text>
              <Text testID={`dashboard-activity-description-${activity.id}`} style={styles.activityDescription}>
                {activity.description}
              </Text>
              <Text testID={`dashboard-activity-time-${activity.id}`} style={styles.activityTime}>{activity.time}</Text>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity
        testID="dashboard-profile-button"
        style={styles.profileButton}
        onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.profileButtonText}>View Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statChange: {
    fontSize: 12,
    color: '#34C759',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  activityCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  activityTime: {
    fontSize: 12,
    color: '#999',
  },
  profileButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    margin: 20,
    alignItems: 'center',
  },
  profileButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DashboardScreen;

