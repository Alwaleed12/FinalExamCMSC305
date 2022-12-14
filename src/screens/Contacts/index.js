import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Contact from '../../components/Contact';
import styles from './styles';

import { openDatabase } from "react-native-sqlite-storage";

// use hook to create database
const myContactsDB = openDatabase({name: 'MyContacts.db'});
const contactsTableName = 'contacts';

const ContactsScreen = props => {
  const navigation = useNavigation();

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
     // declare an empty array that will store the results of the 
     // SELECT
     let results = [];
     // declare a transation the will execute the SELECT
     myContactsDB.transaction(txn => {
       // execute SELECT
       txn.executeSql(
         `SELECT * FROM ${contactsTableName}`,
         [],
         // callback function to handle the results from the 
         // SELECT
         (_, res) => {
           // get number of rows of data selected
           let len = res.rows.length;
           console.log('Length of contact ' + len);
           // if more than one row was returned
           if (len > 0){
             // loop through thr rows
             for (let i = 0; i < len; i++){
               // push a row of data at a time onto the
               // results array
               let item = res.rows.item(i);
               results.push({
                 id: item.id,
                 fullname: item.fullname,
                 phone: item.phone,
                 email: item.email,
                 groupname: item.groupname,
               });
             }
             // assign results array to contact state variable
             setContacts(results);
           } else {
             // if no rows of data were returned,
             // set contact state variable to an empty array
             setContacts([]);
           }
         },
         error => {
           console.log('Error getting contact ' + error.message);
         }
       )
     });
    });
    return listener;
 });

  return (
    <View style={styles.container}>
      <View>
        <FlatList 
          data={contacts}
          renderItem={({item}) => <Contact post={item} />}
          keyExtractor={item => item.id}
        />
        </View>
        <View style={styles.bottom}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Add Contact')}
                >
                <Text style={styles.buttonText}>Add Contact</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default ContactsScreen;