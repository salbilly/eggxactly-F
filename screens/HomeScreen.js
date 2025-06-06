import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';

const eggs = [
  {
    name: 'Soft-Boiled Egg',
    time: 300,
    description: 'A soft and gooey yolk. Perfect on toast 🥚🍞',
    type: 'Soft',
  },
  {
    name: 'Hard-Boiled Egg',
    time: 600,
    description: 'Solid and perfect for salads or snacks! 🥗',
    type: 'Hard',
  },
  {
    name: 'Turbo Hard-Boiled Egg',
    time: 900,
    description: 'Maximum cooked power and dominated. so you can max bench 343 KGS and become space marine 💪',
    type: 'Turbo',
  },
];

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground source={require('../assets/faijpg.jpg')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🥚 F's Egg-Boiling Guide 🍳</Text>
        {eggs.map((egg, index) => (
          <TouchableOpacity
            key={index}
            style={styles.eggButton}
            onPress={() => navigation.navigate('EggDetail', { type: egg.type, time: egg.time })}
          >
            <Text style={styles.eggText}>{egg.name}</Text>
            <Text style={styles.description}>{egg.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  container: { paddingTop: 80, paddingBottom: 40, paddingHorizontal: 20, alignItems: 'center' },
  title: { fontSize: 32, color: '#FFF', fontFamily: 'Quicksand-Bold', marginBottom: 40 },
  eggButton: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
    marginBottom: 20,
    width: '100%',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D32F2F',
  },
  eggText: { fontSize: 20, color: 'white', fontFamily: 'Quicksand-Bold', marginBottom: 5 },
  description: { fontSize: 14, color: '#DDD', fontFamily: 'Quicksand-Regular' },
});




