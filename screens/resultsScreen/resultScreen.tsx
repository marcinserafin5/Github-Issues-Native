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

// import BottomSheet from "reanimated-bottom-sheet";

// import ScrollView from "react-native-gesture-handler"

const resultScreen = () => {
  const count = useSelector(getSearchValue);
  const [data, setData] = useState<any>([
    {id: 1, login: 'test'},
    {id: 2, login: 'test2'},
  ]);
  useEffect(() => {
    let reposArr: any = [];
    let userArr: any = [];
    // axios
    //   .get('https://api.github.com/repositories')
    //   .then((res: any) => reposArr=res)
    //   .catch((err: any) => {
    //     console.log(err);
    //   });
    console.log(count.searchValue)
    axios
      .get('https://api.github.com/search/users', {params: {q: count.searchValue}})
      .then((res: any) => {
        console.log(count.searchValue)
        userArr = res.data;
        console.log(res.status);
        setData(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [count]);

  return (
    <ScrollView style={styles.home}>
      {data ? (
        data?.items?.map((row: any) => (
          <Text key={row.id} onPress={() => console.log(data)}>
            {row.login}
          </Text>
        ))
      ) : (
        <Text>No records</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  home: {
    backgroundColor: 'white',
  },
});
export default resultScreen;
