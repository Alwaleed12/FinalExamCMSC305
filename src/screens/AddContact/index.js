import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import styles from './styles';
import SelectDropdown from 'react-native-select-dropdown';

const database = require('../../components/Handlers/database.js');

const AddContact = props => {

    const groups = [
        'Family',
        'Friends',
    ];

    const [fullname, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [groupname, setGroupName] = useState('');

    const onContactAdd = () => {
        if (!fullname){
            alert('Please enter a contact fullname.');
            return;
        }
        if (!phone){
            alert('Please enter a contact phone in format NPA-NXX-XXXX.');
            return;
        }
        if (!email){
            alert('Please enter a contact email.');
            return;
        }
        if (!groupname){
            alert('Please select a group.');
            return;
        }
        
        try {
            database.addContact(fullname, phone, email, groupname);
        } catch (error) {
            console.log('Error adding group ' + error);
        }

        alert(fullname + ' Added!');
    }

  return (
    <View style={styles.container}>
        <View style={styles.topContainer}>
            <TextInput 
                value={fullname}
                onChangeText={value => setFullName(value)}
                style={styles.fullname}
                clearButtonMode={'while-editing'}
                placeholder={'Enter Contact Fullname'}
                placeholderTextColor={'grey'}
            />
            <TextInput 
                value={phone}
                onChangeText={value => setPhone(value)}
                style={styles.phone}
                clearButtonMode={'while-editing'}
                placeholder={'Enter Contact Phone in format NPA-NXX-XXXX'}
                placeholderTextColor={'grey'}
            />
            <TextInput 
                value={email}
                onChangeText={value => setEmail(value)}
                style={styles.email}
                clearButtonMode={'while-editing'}
                placeholder={'Enter Contact Email'}
                placeholderTextColor={'grey'}
            />
            <SelectDropdown
            data={groups}
            defaultButtonText={'Select Group'}
            onSelect={(selectedItem, index) => {    
                setGroupName(selectedItem);         
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
                return item;
            }}
            buttonStyle={styles.dropdownBtnStyle}
            buttonTextStyle={styles.dropdownBtnTxtStyle}
            dropdownStyle={styles.dropdownDropdownStyle}
            rowStyle={styles.dropdownRowStyle}
            rowTextStyle={styles.dropdownRowTxtStyle}
          />
        </View>
        <View style={styles.bottomContainer}>
            <Pressable style={styles.button} onPress={onContactAdd}>
                <Text style={styles.buttonText}>Add</Text>
            </Pressable>
        </View>
    </View>
  );
};

export default AddContact;