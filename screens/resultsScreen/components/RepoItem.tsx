import moment from 'moment';
import React from 'react';
import {StyleSheet, View, Text, Image, Button} from 'react-native';

const RepoItem = (props: any) => {
  const calculateDateDiff = () => {
    const diffDate = Math.abs(
      Date.now() - new Date(props.repo.updatedAt).getTime(),
    );
    const diffDays = Math.ceil(diffDate / (1000 * 60 * 60 * 24));

    if (diffDays <= 31) return `Updated ${diffDays} days ago`;
    else
      return `Updated on ${moment(
        new Date(props.repo.updatedAt).getTime(),
      ).format('DD MMM YYYY')}`;
  };

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
      <View
        style={{
          marginTop: 8,
          flexDirection: 'row',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
        <Image
          style={{marginRight: 2}}
          source={require('../../../assets/star.png')}
        />
        <Text
          style={{
            fontSize: 12,
            fontWeight: '500',
            color: '#6F7781',
            marginRight: 5,
          }}>
          {props.repo.stargazerCount}
        </Text>
        <View
          style={{
            width: 12,
            height: 12,
            borderRadius: 10,
            backgroundColor: props.repo.languages.edges[0]?.node?.color,
            marginRight: 5,
          }}
        />
        <Text
          style={{
            fontSize: 12,
            fontWeight: '500',
            color: '#6F7781',
            marginRight: 10,
          }}>
          {props.repo.languages.edges[0]?.node?.name}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '500',
            color: '#6F7781',
            marginRight: 10,
          }}>
          {calculateDateDiff()}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '500',
            color: '#6F7781',
            marginRight: 10,
          }}>
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
