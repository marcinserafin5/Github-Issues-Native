import React, {type PropsWithChildren} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ResultScreen from './screens/resultsScreen/ResultScreen';

import {Image, Button, TextInput} from 'react-native';
import {Provider, useDispatch} from 'react-redux';
import {createStore} from 'redux';
import reducer from './redux/reducers';
import {setSearchValue} from './redux/actions';
import {ApolloClient, InMemoryCache, ApolloProvider, gql} from '@apollo/client';

const Stack = createNativeStackNavigator();
const store = createStore(reducer);



const Header = () => {
  const dispatch = useDispatch();
  return (
    <TextInput
      onChangeText={text => dispatch(setSearchValue(text))}
      style={{
        borderColor: '#D0D7DE',
        borderWidth: 1,
        borderRadius: 5,
        width: 242,
        height: 37,
        marginLeft: 'auto',
        color: '#fff',
        padding: 10,
      }}
      placeholder="Search"
      placeholderTextColor={'#D0D7DE'}
    />
  );
};

const App = () => {
  const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache(),
    headers:{Authorization:'bearer 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'}
  });
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="results"
              component={ResultScreen}
              options={{
                headerTitle: props => (
                  <Image
                    source={require('./assets/GitHub-Mark/PNG/GitHub-Mark-Light-32px.png')}
                  />
                ),
                headerStyle: {
                  backgroundColor: '#000',
                },
                headerRight: props => <Header />,
              }}
            />
            <Stack.Screen
              name="Profile"
              component={ResultScreen}
              options={{
                headerTitle: props => (
                  <Image
                    source={require('./assets/GitHub-Mark/PNG/GitHub-Mark-Light-32px.png')}
                  />
                ),
                headerStyle: {
                  backgroundColor: '#000',
                },
                headerRight: props => <Header />,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
