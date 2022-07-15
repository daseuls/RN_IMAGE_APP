import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Main from './src/screens/Main';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Main />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
  },
});
