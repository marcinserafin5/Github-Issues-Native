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
import {getSearchValue} from '../../redux/selectors';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import UserItem from './components/UserItem';
import RepoItem from './components/RepoItem';
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
        console.log('res search', res.data.items[0] );
        setUserData(res.data.items);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(count.searchValue)
    if (count.searchValue) {
      getSearchRepos();
      getSearchUsers();
    } else {
      getPublicRepos();
      getUsers();
    }
  }, [count]);

  return (
    <ScrollView style={styles.home}>
      {[...reposData, ...userData]
        .sort((a, b) => {
          if (a.id > b.id) {
            return 1;
          }
          if (a.id < b.id) {
            return -1;
          }
          return 0;
        })
        .map((row: any) =>
          row?.name ? <RepoItem repo={row} /> : <UserItem user={row} />,
        )}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems:'center',
          height: 40,
        }}>
        <Text
          style={styles.disabledTextStyle}>
          Previous
        </Text>
        <Text    style={styles.textStyle}>Next</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  home: {
    backgroundColor: 'white',
  },
  disabledTextStyle:{
    width: 55,
    height: 17,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
    color: '#8D959F',
    order: 1,
    flexGrow: 0,
  },
  textStyle:{
    width: 55,
    height: 17,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
    color: '#166CD7',
    order: 1,
    flexGrow: 0,
  }
});
export default ResultScreen;
