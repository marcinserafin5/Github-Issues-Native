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
import {getSearchValue} from '../../redux/selectors';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import UserItem from './components/UserItem';
import RepoItem from './components/RepoItem';
import {useQuery, gql} from '@apollo/client';
// import BottomSheet from "reanimated-bottom-sheet";

// import ScrollView from "react-native-gesture-handler"

const ResultScreen = () => {
  const count = useSelector(getSearchValue);
  const [reposData, setReposData] = useState<any>([
    {id: 1, login: 'test'},
    {id: 2, login: 'test2'},
  ]);
  const [userData, setUserData] = useState<any>([
    {id: 1, login: 'test'},
    {id: 2, login: 'test2'},
  ]);

  const getPublicRepos = () => {
    axios
      .get('https://api.github.com/repositories')
      .then((res: any) => {
        setReposData(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  const getUsers = () => {
    axios
      .get('https://api.github.com/users', {params: {per_page: 5}})
      .then((res: any) => {
        setUserData(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const getSearchRepos = () => {
    axios
      .get('https://api.github.com/search/repositories', {
        params: {per_page: 5, q: count.searchValue},
      })
      .then((res: any) => {
        setReposData(res.data.items);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  const getSearchUsers = () => {
    axios
      .get('https://api.github.com/search/users', {
        params: {per_page: 5, q: count.searchValue},
      })
      .then((res: any) => {
        console.log('res search', res.data.items[0]);
        setUserData(res.data.items);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // console.log(count.searchValue)
    // if (count.searchValue) {
    //   getSearchRepos();
    //   getSearchUsers();
    // } else {
    //   getPublicRepos();
    //   getUsers();
    // }
    // graphqlTest();
    console.log(count.searchValue);
    refetch({
      query: count.searchValue,
    });
    repoRefetch({
      query: count.searchValue,
    });
  }, [count]);

  const graphqlTest = () => {};

  const GET_USERS = gql`
    query ($query: String = "") {
      search(query: $query, type: USER, first: 5) {
        edges {
          node {
            ... on User {
              id
              login
              name
              avatarUrl
              location
              bio
            }
          }
        }
      }
    }
  `;

  const GET_REPOS = gql`
    query ($query: String = "") {
      search(query: $query, type: REPOSITORY, first: 5) {
        edges {
          node {
            ... on Repository {
              id
              description
              name
              updatedAt
              stargazerCount
              languages(first: 1) {
                edges {
                  node {
                    id
                    name
                    color
                  }
                }
              }
              licenseInfo {
                name
              }
            }
          }
        }
      }
    }
  `;

  const {loading, error, data, refetch} = useQuery(GET_USERS);
  const {
    loading: repoLoading,
    error: repoError,
    data: repoData,
    refetch: repoRefetch,
  } = useQuery(GET_REPOS);

  return (
    <ScrollView style={styles.home}>
      {repoData?.search.edges &&
        data?.search.edges &&
        [...repoData?.search.edges, ...data?.search.edges]
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
            row.node.description ? (
              <RepoItem repo={row.node} />
            ) : (
              <UserItem user={row.node} />
            ),
          )}

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginTop: 30,
          height: 40,
        }}>
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
    fontFamily: 'Roboto',
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
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'center',
    color: '#166CD7',
    order: 1,
    flexGrow: 0,
  },
});
export default ResultScreen;
