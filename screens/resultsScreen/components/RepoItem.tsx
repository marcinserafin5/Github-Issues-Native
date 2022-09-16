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

const RepoItem = (props: any) => {
  
  return (
    <View style={styles.home}>
      <Text>Repo {props.repo.id}</Text>
      <Text>{props.repo.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    backgroundColor: 'white',
    borderColor:'black',
    borderWidth:1
  },
});
export default RepoItem;
