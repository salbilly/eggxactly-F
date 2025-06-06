import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, Button } from 'react-native';
import { Audio } from 'expo-av';
import { useFocusEffect } from '@react-navigation/native';

export default function TimerScreen({ route, navigation }) {
  const { time } = route.params;
  const [remainingTime, setRemainingTime] = useState(time);
  const [isComplete, setIsComplete] = useState(false);
  const soundRef = useRef(null);
  const intervalRef = useRef(null);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  async function playLoopingMusic() {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/pattern.mp3'),
      { shouldPlay: true, isLooping: true }
    );
    soundRef.current = sound;
    await sound.playAsync();
  }

  async function playSuccessSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/success-.mp3'),
      { shouldPlay: true }
    );
    await sound.playAsync();
  }

  useEffect(() => {
    playLoopingMusic();

    intervalRef.current = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current);
          setIsComplete(true);
          playSuccessSound();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
      if (soundRef.current) {
        soundRef.current.stopAsync();
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        clearInterval(intervalRef.current);
        if (soundRef.current) {
          soundRef.current.stopAsync();
          soundRef.current.unloadAsync();
        }
      };
    }, [])
  );

  return (
    <ImageBackground source={require('../assets/faijpg.jpg')} style={styles.background}>
      <View style={styles.container}>
        {!isComplete ? (
          <>
            <Image source={require('../assets/luffy-waiting.gif')} style={styles.gif} />
            <Text style={styles.timerText}>{formatTime(remainingTime)} remaining</Text>
          </>
        ) : (
          <>
            <Image source={require('../assets/luffy-ready.gif')} style={styles.gif} />
            <Text style={styles.timerText}>Now you can eat! 🍳</Text>
          </>
        )}
        <View style={styles.backContainer}>
          <Button title="⬅ Back to Home" color="#D32F2F" onPress={() => navigation.navigate('Home')} />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  timerText: { fontSize: 24, marginVertical: 20, color: '#FFFFFF', fontFamily: 'Quicksand-Bold' },
  gif: { width: 200, height: 200 },
  backContainer: { marginTop: 30 },
});




