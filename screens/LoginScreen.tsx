import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useAuth} from '../contexts/AuthContext';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {login} = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    const success = await login(email, password);
    setLoading(false);

    if (!success) {
      Alert.alert('Error', 'Invalid credentials. Use: user@example.com / password123');
    }
  };

  return (
    <View testID="login-screen" style={styles.container}>
      <View style={styles.content}>
        <Text testID="login-title" style={styles.title}>Welcome Back</Text>
        <Text testID="login-subtitle" style={styles.subtitle}>Sign in to continue</Text>

        <View style={styles.form}>
          <TextInput
            testID="login-email-input"
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          <TextInput
            testID="login-password-input"
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoComplete="password"
          />

          <TouchableOpacity
            testID="login-button"
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator testID="login-loading" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <View style={styles.credentialsHint}>
            <Text style={styles.hintText}>Demo Credentials:</Text>
            <Text style={styles.hintText}>Email: user@example.com</Text>
            <Text style={styles.hintText}>Password: password123</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  credentialsHint: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#e8f4f8',
    borderRadius: 8,
  },
  hintText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
});

export default LoginScreen;

