/**
 * Sample React Native Profile
 * https://github.com/facebook/react-native
 * @flow
 */

import * as React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { Navigator } from 'react-native-navigation';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {
  navigator: Navigator;
};
export default class Profile extends React.Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>
            img
            </Text>

        </View>





        <FlatList
          data={[{ id: 1, name: '' }]}
          renderItem={(data) => (
            <TouchableOpacity key={data.item.id} onPress={() =>
              this.props.navigator.push({
                screen: 'InfoPushedScreen',
                title: 'This is for ' + data.item.name,
                passProps: {
                  selectedItem: data.item
                }
              })}>
              <Text style={styles.welcome}>
                Name: {data.item.name}
              </Text>
            </TouchableOpacity>
          )}>
        </FlatList>
        <Text style={styles.instructions}>
          To get started, edit Profile.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
