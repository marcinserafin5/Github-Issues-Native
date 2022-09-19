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

const RepoItem = (props: any) => {
  return (
    <View style={styles.home}>
      <Image
        style={{
          position: 'absolute',
          marginTop: 15,
        }}
        source={require('../../../assets/book.png')}
      />
      <Text style={{fontSize: 16, fontWeight: '500', color: '#166CD7'}}>
        {props.repo.name}
      </Text>
      <Text style={{fontSize: 16, fontWeight: '500', color: '#6F7781'}}>
        {props.repo.description}
      </Text>
      <View style={{marginTop: 8, flexDirection: 'row', alignItems: 'center'}}>
      <Image
       style={{marginRight:2}}
        source={require('../../../assets/star.png')}
      />
        <Text style={{fontSize: 12, fontWeight: '500', color: '#6F7781',marginRight:5}}>
          {props.repo.stargazerCount}
        </Text>
        <View
          style={{
            width: 12,
            height: 12,
            borderRadius: 10,
            backgroundColor: props.repo.languages.edges[0]?.node?.color,marginRight:5
          }}
        />
        <Text style={{fontSize: 12, fontWeight: '500', color: '#6F7781',marginRight:10}}>
          {props.repo.languages.edges[0]?.node?.name}
        </Text>
        <Text style={{fontSize: 12, fontWeight: '500', color: '#6F7781',marginRight:10}}>
          {props.repo.updatedAt}
        </Text>
        <Text style={{fontSize: 12, fontWeight: '500', color: '#6F7781',marginRight:10}}>
        {props.repo.licenseInfo?.name}

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
    marginBottom: 0,
    paddingTop: 13,
    paddingHorizontal: 30,
  },
});
export default RepoItem;
