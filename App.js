import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import RootNavigator from './navigation/RootNavigator';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { THEME } from './globals/constants';



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
      <StatusBar backgroundColor={colors.darkBG} />
      <View style={styles.container}>    
        <RootNavigator />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection:"row"
  },

});


