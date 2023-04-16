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
// import TablesScreen from '../screens/Tables';
// import MenuScreen from '../screens/Menu';
// import AboutUsScreen from '../screens/AboutUs';
import CartView from '../components/CartView';
import Receipt from '../components/ReceiptView';


const OrdersTabView = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Bucket' },
    { key: 'second', title: 'Receipt' },
  ]);

  const handleIndexChange = (index) => setIndex(index);

  const renderTabBar = (props) => {

    const inputRange = props.navigationState.routes.map((x, i) => i);


    return (
      <View style={styles.tabBar}>
        {
          props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });

          {/* console.log(opacity); */}

          return (
            <Pressable
              key={route.key}
              style={[
                styles.tabItem,
                index === i && styles.tabItemSelected,
              ]}
              onPress={() => setIndex(i)}>
              <Animated.Text style={{ opacity }}>{route.title}</Animated.Text>
            </Pressable>
          );
        })}
      </View>
    );
  };

  const renderScene = SceneMap({
    first: CartView,
    second: Receipt,
    // third: AboutUsScreen
  });

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        tabBarPosition="top"
        onIndexChange={handleIndexChange}
        // style={{ flex: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"pink"
  },
  tabBar: {
    flexDirection: "row",
    // paddingTop: StatusBar.currentHeight,
    backgroundColor: "#887",
    height: 80
  },
  // tabItem: {
  //   flex: 1,
  //   justifyContent:"center",
  //   alignItems: 'center',
  //   // padding: 16,
  //   height:80,           
  //   width: "50%",
  //   // backgroundColor:"#7855be",
  //   fontSize:30
  // },
  // tabItemSelected: {
  //   backgroundColor: '#2596be',
  //   borderColor: '#333',
  //   borderBottomWidth: 0,
  // },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: '50%',
    backgroundColor: '#fff',
    borderBottomWidth: 3,
    borderBottomColor: '#aaa',
  },
  tabItemSelected: {
    backgroundColor: '#2596be',
    borderColor: '#333',
    borderBottomWidth: 0,
  },
  tabItemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  
});

export default OrdersTabView;
