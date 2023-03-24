
import React, { useState } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  StatusBar,
  Pressable,
  Dimensions
} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import TablesScreen from '../screens/Tables';
import MenuScreen from '../screens/Menu';


// const FirstRoute = () => (
//   <View style={[styles.container, { backgroundColor: '#ff4081' }]} />
// );

// const SecondRoute = () => (
//   <View style={[styles.container, { backgroundColor: '#673ab7' }]} />
// );

const MainTabView = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);

  console.log("the app window width is",Dimensions.get('window').width);
  console.log("the app window height is",Dimensions.get('window').height);

  console.log(StatusBar.currentHeight);

  const handleIndexChange = (index) => setIndex(index);

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });

          return (
            <Pressable
              key={route.key}
              style={styles.tabItem}
              onPress={() => setIndex(i)}>
              <Animated.Text style={{ opacity }}>{route.title}</Animated.Text>
            </Pressable>
          );
        })}
      </View>
    );
  };

  const renderScene = SceneMap({
    first: TablesScreen,
    second: MenuScreen,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={handleIndexChange}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: "row-reverse",
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#887",
    height: 120
  },
  tabItem: {
    flex: 1,
    justifyContent:"center",
    alignItems: 'center',
    transform:[{rotate:"90deg"}],
    padding: 16,
    height:120,           // when landscapre, it is the 'width'
    width: "35%",
    backgroundColor:"#7855be"
  },
});

export default MainTabView;
