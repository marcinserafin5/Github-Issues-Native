import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const UserItem = ({user}: any) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('User', user)}>
      <View style={styles.home}>
        <Image
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            position: 'absolute',
            marginTop: 15,
          }}
          source={{uri: user.avatarUrl}}
        />
        <Text style={{fontSize: 16, fontWeight: '500', color: '#166CD7'}}>
          {user.name}
        </Text>
        <Text style={{fontSize: 16, fontWeight: '500', color: '#6F7781'}}>
          {user.login}
        </Text>
        <View style={{marginTop: 8}}>
          <Text style={{fontSize: 14, fontWeight: '500', color: '#24292F'}}>
            {user.bio}
          </Text>
          <Text style={{fontSize: 12, fontWeight: '500', color: '#6F7781'}}>
            {user.location}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  home: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#C4C4C4',
    margin: 15,
    marginBottom: 0,
    paddingTop: 15,
    paddingHorizontal: 30,
  },
});
export default UserItem;
