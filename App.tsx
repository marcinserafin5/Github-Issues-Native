/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {type PropsWithChildren} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import resultScreen from './screens/resultsScreen/resultScreen';
import {Image, Button, TextInput} from 'react-native';
import {Provider, useDispatch} from 'react-redux';
import {createStore} from 'redux';
import reducer from './redux/reducers';
import {setSearchValue} from './redux/actions';

const Stack = createNativeStackNavigator();
const store = createStore(reducer);

const Header = () => {
  const dispatch = useDispatch();
  return (
    <TextInput
      onChangeText={text => dispatch(setSearchValue(text))}
      style={{
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        height: '70%',
        width: '75%',
        marginLeft: 'auto',
        color: '#fff',
        padding: 10,
      }}
      placeholder="Search"
      placeholderTextColor={'#fff'}
    />
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="results"
            component={resultScreen}
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
            component={resultScreen}
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
  );
};

export default App;
