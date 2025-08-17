import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Constants from 'expo-constants';

const animals = ['Cat', 'Dog', 'Rabbit', 'Elephant', 'Lion', 'Tiger', 'Bear', 'Giraffe'];

export default function App() {
  const [animalPair, setAnimalPair] = useState([null, null]);
  const [attribute, setAttribute] = useState('cuteness');
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    generateRandomPair();
  }, []);

  const generateRandomPair = () => {
    const first = animals[Math.floor(Math.random() * animals.length)];
    let second;
    do {
      second = animals[Math.floor(Math.random() * animals.length)];
    } while (second === first);
    setAnimalPair([first, second]);
  };

  const submitVote = (selected) => {
    const vote = {
      first: animalPair[0],
      second: animalPair[1],
      selected,
      attribute,
    };
    setVotes([...votes, vote]);
    generateRandomPair();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Which has more {attribute}?</Text>
      <View style={styles.pair}>
        <Button title={animalPair[0] || ''} onPress={() => submitVote(animalPair[0])} />
        <Text style={styles.vs}>vs</Text>
        <Button title={animalPair[1] || ''} onPress={() => submitVote(animalPair[1])} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  pair: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vs: {
    marginHorizontal: 10,
    fontSize: 18,
  },
});
