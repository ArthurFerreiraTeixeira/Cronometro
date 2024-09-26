import React, { useState, useEffect, useRef } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import TimerDisplay from './TimerDisplay';

const App = () => {
  const [time, setTime] = useState(0); 
  const [isRunning, setIsRunning] = useState(false); 
  const intervalRef = useRef(null); 

  
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!isRunning && time !== 0) {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current); 
  }, [isRunning]);

  
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };


  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
  };

  return (
    <View style={styles.container}>
      <TimerDisplay time={time} />
      <View style={styles.buttonContainer}>
        <Button title={isRunning ? 'Pausar' : 'Iniciar'} onPress={toggleTimer} />
        <Button title="Reiniciar" onPress={resetTimer} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '60%',
  },
});

export default App;

