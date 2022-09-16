import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  View,
  Button,
  Text,
} from 'react-native';

// import BottomSheet from "reanimated-bottom-sheet";

// import ScrollView from "react-native-gesture-handler"

const UserItem = (props:any) => {
  return (
    <View style={styles.home}>
      <Text>User {props.user.id}</Text>
      <Text>{props.user.login}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    backgroundColor: 'white',
  },
});
export default UserItem;
