// import openDatabase hook
import { openDatabase } from "react-native-sqlite-storage";

// use hook to create database
const myContactsDB = openDatabase({name: 'MyContacts.db'});
const contactsTableName = 'contacts';

module.exports = {
    createContactTable: async function () {
        // declare a transaction that will execute a SQL statement
        (await myContactsDB).transaction(txn => {
            // execute the SQL
            txn.executeSql(
                `CREATE TABLE IF NOT EXISTS ${contactsTableName}(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    fullname TEXT,
                    phone TEXT,
                    email TEXT,
                    groupname TEXT
                );`,
                [],
                () => {
                    console.log('Contact table created sucessfully');
                },
                error => {
                    console.log('Error creating Contact table ' + error.message);
                },
            );
        });
    },
    addContact: async function (fullname, phone, email, groupname) {
        // declare a transaction that will execute an SQL statement
        (await myContactsDB).transaction(txn => {
            // execute the SQL
            txn.executeSql(
                `INSERT INTO ${contactsTableName} (fullname, phone, email, groupname) VALUES ("${fullname}", "${phone}", "${email}", "${groupname}")`,
                [],
                // callback function to handle results of SQL query
                () => {
                    console.log(fullname + " added sucessfully");
                },
                error => {
                    console.log('Error adding contact ' + error.message);
                },
            );
        });
    },
};