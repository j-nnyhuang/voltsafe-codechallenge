import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// Screens
import ScheduleScreen from "./src/screens/ScheduleScreen"

export default function App() {
  return (
    <View style={styles.container}>
      <ScheduleScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
