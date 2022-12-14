import React from 'react';
import ContactsScreen from '../screens/Contacts';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FamilyContactsScreen from '../screens/FamilyContacts';
import FriendsContactsScreen from '../screens/FriendContacts';


const Tab = createBottomTabNavigator();

const TabNavigator = props => {

  return (
    <Tab.Navigator
        screenOptions={{
            tabBarActiveTintColor: 'blue',
            tabBarLabelStyle: {
                flex: 1,
                fontSize: 15,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 12,
            },
            tabBarStyle: {display: 'flex'},
            tabBarIconStyle: {display: 'none'},
        }}
    >
        <Tab.Screen name={'All'} component={ContactsScreen}/>
        <Tab.Screen name={'Family'} component={FamilyContactsScreen}/>
        <Tab.Screen name={'Friends'} component={FriendsContactsScreen}/>
    </Tab.Navigator>
  );
};

export default TabNavigator;