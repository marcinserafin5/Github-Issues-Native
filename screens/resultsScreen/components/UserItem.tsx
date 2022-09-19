import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  View,
  Button,
  Text,
  Image,
} from 'react-native';

// import BottomSheet from "reanimated-bottom-sheet";

// import ScrollView from "react-native-gesture-handler"

const UserItem = (props: any) => {
  return (
    <View style={styles.home}>
      <Image
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          position: 'absolute',
          marginTop: 15,
        }}
        source={{uri: props.user.avatarUrl}}
      />
      <Text style={{fontSize: 16, fontWeight: '500', color: '#166CD7'}}>
        {props.user.name}
      </Text>
      <Text style={{fontSize: 16, fontWeight: '500', color: '#6F7781'}}>
        {props.user.login}
      </Text>
      <View style={{marginTop: 8}}>
        <Text style={{fontSize: 14, fontWeight: '500', color: '#24292F'}}>
          {props.user.bio}
        </Text>
        <Text style={{fontSize: 12, fontWeight: '500', color: '#6F7781'}}>
          {props.user.location}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#C4C4C4',
    margin: 15,
    marginBottom:0,
    paddingTop: 15,
    paddingHorizontal: 30,
  },
});
export default UserItem;
