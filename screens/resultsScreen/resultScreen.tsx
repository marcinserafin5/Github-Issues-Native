import React, {useEffect} from 'react';
import {StyleSheet, ScrollView, View, Text, Image, Button} from 'react-native';
import {getSearchValue} from '../../redux/selectors';
import {useSelector} from 'react-redux';
import UserItem from './components/UserItem';
import RepoItem from './components/RepoItem';
import {useQuery, gql} from '@apollo/client';
import { GET_REPOS, GET_USERS } from '../../consts/graphQL';

const ResultScreen = () => {
  const store = useSelector(getSearchValue);

  useEffect(() => {
    refetch({
      query: store.searchValue,
    });
    repoRefetch({
      query: store.searchValue,
    });
  }, [store]);

 

  const {data: userData, refetch} = useQuery(GET_USERS);
  const {data: repoData, refetch: repoRefetch} = useQuery(GET_REPOS);

  return (
    <ScrollView style={styles.home}>
      <Text style={styles.resultCount}>
        {(repoData?.search.repositoryCount || 0) +
          (userData?.search.userCount || 0)}{' '}
        results
      </Text>
      {repoData?.search.edges &&
        userData?.search.edges &&
        [...repoData?.search.edges, ...userData?.search.edges]
          .sort((a, b) => {
            if (a?.node?.id > b?.node?.id) {
              return 1;
            }
            if (a?.node?.id < b?.node?.id) {
              return -1;
            }
            return 0;
          })
          .map((row: any) =>
            row.node.login ? (
              <UserItem key={row.node.id} user={row.node} />
            ) : (
              <RepoItem key={row.node.id} repo={row.node} />
            ),
          )}

      <View style={styles.paginationContainer}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={{marginTop: 3}}
            source={require('../../assets/chevron-left.png')}
          />
          <Text style={styles.disabledTextStyle}>Previous</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.textStyle}>Next</Text>
          <Image
            style={{marginTop: 3}}
            source={require('../../assets/chevron-right.png')}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  home: {
    backgroundColor: 'white',
  },
  disabledTextStyle: {
    height: 17,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'center',
    color: '#8D959F',
    order: 1,
    flexGrow: 0,
  },
  textStyle: {
    height: 17,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'center',
    color: '#166CD7',
    order: 1,
    flexGrow: 0,
  },
  paginationContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 30,
    height: 40,
  },
  resultCount: {
    fontSize: 21,
    color: 'black',
    marginLeft: 17,
    marginTop: 30,
    marginBottom: 15,
    fontWeight: '500',
  },
});
export default ResultScreen;
