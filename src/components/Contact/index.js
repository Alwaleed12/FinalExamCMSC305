import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const Contact = props => {


    const post = props.post;
    const navigation = useNavigation();

    const onPress = () => {
        console.log(post.fullname);
    }

  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.touchable} onPress={onPress}>
        <View style={{flex: 2}}>
        <Text style={styles.fullname} numberOfLines={1}>{post.fullname}</Text>
        <Text style={styles.email} numberOfLines={1}>{post.email}</Text>
        </View>
        <View style={{flex: 1}}>
        <Text style={styles.phone}>{post.phone}</Text>
        <Text style={styles.groupname}>{post.groupname}</Text>
        </View>
    </TouchableOpacity>
    </View>
  );
};

export default Contact;