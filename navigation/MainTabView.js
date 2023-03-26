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
import AboutUsScreen from '../screens/AboutUs';


const MainTabView = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Tables' },
    { key: 'second', title: 'Menu' },
    { key: 'third', title: 'AboutUs' },
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
    first: TablesScreen,
    second: MenuScreen,
    third: AboutUsScreen
  });

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        tabBarPosition="bottom"
        onIndexChange={handleIndexChange}
        // style={{ flex: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: "row",
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#887",
    height: 120
  },
  tabItem: {
    flex: 1,
    justifyContent:"center",
    alignItems: 'center',
    padding: 16,
    height:120,           // when landscapre, it is the 'width'
    width: "33.3%",
    backgroundColor:"#7855be",
    fontSize:30
  },
  tabItemSelected: {
    backgroundColor: '#2596be',
    borderColor: '#333',
    borderBottomWidth: 0,
  },
});

export default MainTabView;

// import React, { useState } from 'react';
// import {
//   Animated,
//   View,
//   StyleSheet,
//   StatusBar,
//   Pressable,
//   Dimensions,
//   ScrollView
// } from 'react-native';
// import { TabView, SceneMap } from 'react-native-tab-view';
// import TablesScreen from '../screens/Tables';
// import MenuScreen from '../screens/Menu';


// const MainTabView = () => {
//   const [index, setIndex] = useState(0);
//   const [routes] = useState([
//     { key: 'first', title: 'First' },
//     { key: 'second', title: 'Second' },
//   ]);

//   const handleIndexChange = (index) => setIndex(index);

//   const renderTabBar = (props) => {
//     const inputRange = props.navigationState.routes.map((x, i) => i);

//     return (
//       <ScrollView style={styles.tabBar}>
//         {props.navigationState.routes.map((route, i) => {
//           const opacity = props.position.interpolate({
//             inputRange,
//             outputRange: inputRange.map((inputIndex) =>
//               inputIndex === i ? 1 : 0.5
//             ),
//           });

//           return (
//             <Pressable
//               key={route.key}
//               style={[
//                 styles.tabItem,
//                 index === i && styles.tabItemSelected,
//               ]}
//               onPress={() => setIndex(i)}>
//               <Animated.Text style={{ opacity }}>{route.title}</Animated.Text>
//             </Pressable>
//           );
//         })}
//       </ScrollView>
//     );
//   };

//   const renderScene = SceneMap({
//     first: TablesScreen,
//     second: MenuScreen,
//   });

//   return (
//     <View style={styles.container}>
//       <TabView
//         navigationState={{ index, routes }}
//         renderScene={renderScene}
//         renderTabBar={renderTabBar}
//         tabBarPosition="left"
//         onIndexChange={handleIndexChange}
//         style={{ flex: 1 }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'row',
//   },
//   tabBar: {
//     width: 200,
//     backgroundColor: '#fff',
//   },
//   tabItem: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   tabItemSelected: {
//     backgroundColor: '#f0f0f0',
//     borderColor: '#ddd',
//     borderBottomWidth: 0,
//   },
// });

// export default MainTabView;

