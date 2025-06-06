import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView, ImageBackground } from 'react-native';

export default function EggDetailScreen({ route, navigation }) {
  const { type, time } = route.params;

  const eggSteps = {
    Soft: [
      '🥚 Let egg reach room temperature',
      '🔥 Bring water to boil',
      '🧺 Gently place egg in water',
      '⏱️ Boil for 6 minutes',
      '❄️ Cool in ice water for 1 minute',
      '🍳 Crack & enjoy!',
    ],
    Hard: [
      '🥚 Room temp for even cooking',
      '🔥 Boil water fully',
      '🧺 Place egg in gently',
      '⏱️ Boil 10–12 minutes',
      '❄️ Ice water for 5 minutes',
      '🥗 Peel & eat or use in salad!',
    ],
    Turbo: [
      '🥚 Use room-temp egg for consistent results',
      '🔥 Bring a lot of water to a strong boil',
      '🧺 Lower egg carefully',
      '⏱️ Boil for a full 15 minutes',
      '❄️ Chill in ice water for 5+ minutes',
      '💪 Peel & enjoy — extremely cooked!',
    ],
  };

  const steps = eggSteps[type];

  return (
    <ImageBackground source={require('../assets/faijpg.jpg')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{type} Boiled Egg</Text>
        <Text style={styles.subtitle}>Perfect time: {time / 60} minutes</Text>

        <Text style={styles.sectionTitle}>Instructions:</Text>
        {steps.map((step, index) => (
          <Text key={index} style={styles.stepText}>
            {index + 1}. {step}
          </Text>
        ))}

        <View style={styles.buttonContainer}>
          <Button
            title="Start Timer"
            color="#D32F2F"
            onPress={() => navigation.navigate('Timer', { time })}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  container: { padding: 20, flexGrow: 1 },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', color: '#FFFFFF', fontFamily: 'Quicksand-Bold' },
  subtitle: { fontSize: 18, textAlign: 'center', marginBottom: 20, color: '#FFFFFF', fontFamily: 'Quicksand-Bold' },
  sectionTitle: { fontSize: 22, fontWeight: '600', marginBottom: 10, color: '#D32F2F', fontFamily: 'Quicksand-Bold' },
  stepText: { fontSize: 16, marginBottom: 12, color: '#FFFFFF', fontFamily: 'Quicksand-Bold' },
  buttonContainer: { marginTop: 30, alignItems: 'center' },
});



