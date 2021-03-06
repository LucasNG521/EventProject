/**
 * Sample React Native App
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
  FlatList,
  Linking,
  AppRegistry
} from 'react-native';

//deeplink trying
import { Navigator } from 'react-native-navigation';
// import { StackNavigator } from 'react-navigation';
import Events from './src/screens/Events';
import Search from './src/screens/Search';
import Profile from './src/screens/Profile';
// const NavigationApp = StackNavigator({
//   Events: { screen: Events ,
//             path: 'events'} ,
//   Search: { screen: Search },         
//   Profile :{ screen: Profile ,
//             path: 'profile'}
// });
const prefix = Platform.OS== 'android' ? 'WEvent://WEvent/' : 'WEvent://';
// const MainApp = () => <NavigationApp uriPrefix={prefix} />;

//^^deep link trying

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {
  navigator: Navigator;
};

console.disableYellowBox = true;
export default class App extends React.Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[{ id: 1, key: 1, name: 'Alex' }, { id: 2, key: 2, name: 'Lucas' }]}
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
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

//trying deeplink
class Home extends React.Component{
  static navigationOptions = { // A
    title: 'Event',
  };
  props: any;
  componentDidMount() { // B
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        this.navigate(url);
      });
    } else {
        Linking.addEventListener('url', this.handleOpenURL);
      }
    }
    
    componentWillUnmount() { // C
      Linking.removeEventListener('url', this.handleOpenURL);
    }
    handleOpenURL = (event) => { // D
      this.navigate(event.url);
    }
    navigate = (url) => { // E
      const { navigate } = this.props.navigation;
      const route = url.replace(/.*?:\/\//g, '');
      const id = route.match(/\/([^\/]+)\/?$/)[1];
      const routeName = route.split('/')[0];
    
      if (routeName === 'event') {
        navigate('Event', { id })
      };
      if (routeName === "SignUp"){
        navigate("SignUp")
      }
    }
    

    render() {
      return <Text></Text>;
    }
}
//^^^trying deeplink
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

//SDK Initialization
// componentWillMount() {
//   OneSignal.init("135b1bdf-66b4-4428-8801-16526ee52e7b");
// }