import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

if (__DEV__) {
  loadDevMessages();
  loadErrorMessages();
}
import 'expo-dev-client';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RootNavigator from './navigation/RootNavigator';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { THEME } from './globals/constants';

export default function App() {
  const {colors} = THEME;

  return (
    <Provider store={store}>
      {/* <ApolloProvider client={client}> */}
        <StatusBar backgroundColor={colors.darkBG} />
        <View style={styles.container}>    
          <RootNavigator />
        </View>
      {/* </ApolloProvider> */}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


