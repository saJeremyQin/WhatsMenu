import 'expo-dev-client';

import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import RootNavigator from './navigation/RootNavigator';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { THEME } from './globals/constants';
import { client } from './globals/netRequest';
import { ApolloProvider } from '@apollo/client';

// import { activateKeepAwake } from 'expo-keep-awake';
// import { activateKeepAwake } from 'expo-dev-client';

// if (__DEV__) {
//   activateKeepAwake();
//   activateKeepAwake();
// }


export default function App() {
  const {colors} = THEME;

  // useEffect(() => {
  //   try {
  //     ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  //   } catch (error) {
  //     console.log(error);   
  //   }

  //   return () => {
  //     ScreenOrientation.unlockAsync();
  //   };
  // },[]);

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <StatusBar backgroundColor={colors.darkBG} />
        <View style={styles.container}>    
          <RootNavigator />
        </View>
      </ApolloProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection:"row"
  },

});


