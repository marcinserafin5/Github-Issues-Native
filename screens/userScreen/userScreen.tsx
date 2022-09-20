import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

const UserScreen = (props: any) => {
  const user = props.route.params;

  return (
    <View style={styles.home}>
      <Image
        style={{
          width: 296,
          height: 296,
          borderRadius: 296 / 2,
        }}
        source={{uri: user?.avatarUrl}}
      />
      <Text style={styles.nameText}>{user?.name}</Text>
      <Text style={styles.loginText}>{user?.login}</Text>
      <View style={styles.followContainer}>
        <Text style={styles.followInfo}>
          <Image source={require('../../assets/users-icon.png')} />{' '}
          {user?.followers.totalCount} Followers
        </Text>
        <Text style={styles.followInfo}>
          {user?.following.totalCount} Following
        </Text>
        <Text style={styles.followInfo}>
          <Image source={require('../../assets/star.png')} />
          {user?.starredRepositories.totalCount}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    backgroundColor: 'white',
    paddingTop: 30,
    alignItems: 'center',
    height: '100%',
  },
  followContainer: {
    marginTop: 13,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    alignItems: 'flex-end',
  },
  followInfo: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6F7781',
  },
  loginText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#6F7781',
  },
  nameText: {
    fontSize: 26,
    fontWeight: '500',
    color: '#166CD7',
    marginTop: 16,
  },
});
export default UserScreen;
