/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import 'react-native-gesture-handler';
 import React from 'react';
 import type {Node} from 'react';
 import Router from './src/navigation/Router';

 const database = require('./src/components/Handlers/database.js');
 
 const App: () => Node = () => {
  try {
    database.createContactTable();
  } catch (error) {
    console.log('Failed to create contact table ' + error);
  }
   return <Router />;
 };
 
 export default App;
 