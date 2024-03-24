import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import MyStack from './src/navigation/MyStack';
const App: React.FC = () => {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

export default App;
