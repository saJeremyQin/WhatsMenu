import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import RootNavigator from './navigation/RootNavigator';
import { Provider } from 'react-redux';
import { store } from './redux/store';


export default function App() {

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


// import React,{ useEffect } from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
// import { StyleSheet, View, useWindowDimensions } from 'react-native';
// import * as ScreenOrientation from 'expo-screen-orientation';

// import TablesScreen from "./screens/Tables";
// import MenuScreen from './screens/Menu';

// const Tab = createBottomTabNavigator();

// const LeftTabBarContainer = ({ children, ...rest }) => (
//   <View style={styles.container}>
//     <View style={styles.tabBar}>
//       {children}
//     </View>
//   </View>
// );

// const App = () => {

//   const dimensions = useWindowDimensions();
//   const isLandscape = dimensions.width > dimensions.height;
//   console.log("Horizontally display!, ", isLandscape);

//   useEffect(() => {
//     try {
//       ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
//     } catch (error) {
//       console.log(error);   
//     }

//     return () => {
//       ScreenOrientation.unlockAsync();
//     };
//   },[]);

//   return (  

//     <NavigationContainer theme={DefaultTheme} >
//       <Tab.Navigator 
//         tabBar={(props) => (
//           <LeftTabBarContainer {...props}>
//             <Tab.Screen name="Tables" component={TablesScreen} />
//             <Tab.Screen name="Menu" component={MenuScreen} />
//           </LeftTabBarContainer>
//         )}
//         screenOptions={{
//           tabBarIcon: ({ color, size }) => (
//             <Icon name='Tables' color={color} size={size} />
//           ),
//           tabBarLabel: 'Tables',
//           tabBarActiveBackgroundColor: '#f00',
//         }}
//       >
//         <Tab.Screen 
//           name='Tables1'
//           component={TablesScreen}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <Icon name='Tables' color={color} size={size} />
//             ),
//             tabBarLabel: 'Tables',
//             tabBarActiveBackgroundColor:"#f00"
//           }}
//         />
//         <Tab.Screen
//           name='Menu'
//           component={MenuScreen}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <Icon name='menu' color={color} size={size} />
//             ),
//             tabBarLabel: 'Menu',
//           }}
//         />
//       </Tab.Navigator>
//     </NavigationContainer>

//   );

// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'row',
//   },
//   tabBar: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     alignItems: 'center',
//   },
// });
// export default App;import React, { useState } from 'react';


// import { useState } from 'react';
// import { StyleSheet, View, Text, Dimensions } from 'react-native';
// import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

// const FirstRoute = () => (
//   <View style={[styles.scene, { backgroundColor: '#ff4081' }]} >
//     <Text>First Route</Text>
//   </View>
// );

// const SecondRoute = () => (
//   <View style={[styles.scene, { backgroundColor: '#673ab7' }]}>
//     <Text>Second Route</Text>
//   </View>
// );

// const renderTabBar = (props) => (
//   <TabBar
//     {...props}
//     style={styles.tabBar}
//     tabStyle={styles.tab}
//     indicatorStyle={styles.indicator}
//   />
// );

// const initialLayout = { width: Dimensions.get('window').width };

// const App = () => {
//   const [index, setIndex] = useState(0);
//   const [routes] = useState([
//     { key: 'first', title: 'First' },
//     { key: 'second', title: 'Second' },
//   ]);

//   const renderScene = SceneMap({
//     first: FirstRoute,
//     second: SecondRoute,
//   });

//   return (
//     <View style={styles.container}>
//       <TabView
//         navigationState={{ index, routes }}
//         renderScene={renderScene}
//         onIndexChange={setIndex}
//         initialLayout={initialLayout}
//         renderTabBar={renderTabBar}
//         vertical={true}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   scene: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   tabBar: {
//     backgroundColor: '#F5FCFF',
//     width: 300,
//   },
//   tab: {
//     width: 300,
//     height: 150,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   indicator: {
//     backgroundColor: '#000',
//   },
// });

// export default App;


// import React, { useState } from 'react';
// import { ViewPager } from 'react-native-pager-view';
// import { StyleSheet, Text, View, Dimensions } from 'react-native';
// import { TabViewVertical, SceneMap } from 'react-native-vertical-tab-view';


// const FirstRoute = () => (
//   <View style={[styles.scene, { backgroundColor: '#ff4081' }]}>
//     <Text>First Route</Text>
//   </View>
// );

// const SecondRoute = () => (
//   <View style={[styles.scene, { backgroundColor: '#673ab7' }]}>
//     <Text>Second Route</Text>
//   </View>
// );

// const renderTab = ({ tab, isActive }) => (
//   <View style={[styles.tab, isActive && styles.activeTab]}>
//     <Text style={styles.tabText}>{tab}</Text>
//   </View>
// );

// const initialLayout = { 
//   width: Dimensions.get('window').width,
//   height: Dimensions.get('window').height
// };

// const App = () => {
//   const [index, setIndex] = useState(0);
//   const [routes] = useState([
//     { key: 'first', title: 'First' },
//     { key: 'second', title: 'Second' },
//   ]);

//   const renderScene = SceneMap({
//     first: FirstRoute,
//     second: SecondRoute,
//   });

//   return (
//     <View style={styles.container}>
//       <TabViewVertical
//         initialLayout={initialLayout}
//         renderTabBar={renderTab}
//         style={styles.container}
//         navigationState={{ index, routes }}
//         renderScene={renderScene}
//         onIndexChange={setIndex}

//         renderPager={(props) => <ViewPager {...props} />}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   scene: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   tab: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 120,
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     backgroundColor: '#f9f9f9',
//   },
//   activeTab: {
//     backgroundColor: '#fff',
//   },
//   tabText: {
//     fontWeight: 'bold',
//   },
// });

// export default App;


// import React, { useState } from 'react';
// import { View, Text } from 'react-native';
// // import VerticalTabView from 'react-native-vertical-tab-view';
// import Vertia

// const tabs = [
//   { key: 'tab1', title: 'Tab 1' },
//   { key: 'tab2', title: 'Tab 2' },
//   { key: 'tab3', title: 'Tab 3' },
// ];

// const renderTab = (tab, isActive) => {
//   return (
//     <View
//       style={{
//         backgroundColor: isActive ? '#fff' : '#f0f0f0',
//         paddingVertical: 8,
//         paddingHorizontal: 16,
//         marginVertical: 4,
//         borderRadius: 8,
//         borderWidth: 1,
//         borderColor: isActive ? '#000' : '#f0f0f0',
//       }}>
//       <Text style={{ color: isActive ? '#000' : '#999' }}>{tab.title}</Text>
//     </View>
//   );
// };

// const renderScene = ({ route }) => {
//   switch (route.key) {
//     case 'tab1':
//       return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           <Text>Tab 1 Content</Text>
//         </View>
//       );
//     case 'tab2':
//       return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           <Text>Tab 2 Content</Text>
//         </View>
//       );
//     case 'tab3':
//       return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           <Text>Tab 3 Content</Text>
//         </View>
//       );
//     default:
//       return null;
//   }
// };

// const App = () => {
//   const [index, setIndex] = useState(0);

//   return (
//     <VerticalTabView
//       data={tabs}
//       renderTab={renderTab}
//       renderScene={renderScene}
//       onIndexChange={setIndex}
//       index={index}
//     />
//   );
// };

// export default App;





// import { useEffect } from 'react';
// import { useWindowDimensions } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from "@react-navigation/native";
// import * as ScreenOrientation from 'expo-screen-orientation';

// import TablesScreen from './screens/Tables';
// import MenuScreen from './screens/Menu';
// import TabBar from './components/TarBar';

// const Tab = createBottomTabNavigator();

// export default function App() {
//   const dimensions = useWindowDimensions();
//   const isLandscape = dimensions.width > dimensions.height;
//   console.log("Horizontally display!, ", isLandscape);

//   useEffect(() => {
//     try {
//       ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
//     } catch (error) {
//       console.log(error);   
//     }

//     return () => {
//       ScreenOrientation.unlockAsync();
//     };
//   },[]);

//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         tabBar={(props) => <TabBar {...props} />}
//         screenOptions={{
//           tabBarLabelStyle: {
//             fontSize: 16,
//           },
//         }}
//       >
//         <Tab.Screen
//           name="Tables"
//           component={TablesScreen}
//           options={{
//             tabBarLabel: 'Tables',
//           }}
//         />
//         <Tab.Screen
//           name="Menu"
//           component={MenuScreen}
//           options={{
//             tabBarLabel: 'Menu',
//           }}
//         />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

// import { useEffect } from 'react';
// import { useWindowDimensions, StyleSheet } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from "@react-navigation/native";
// import * as ScreenOrientation from 'expo-screen-orientation';


// import TablesScreen from './screens/Tables';
// import MenuScreen from './screens/Menu';
// import TabBar from './components/TarBar';

// const Tab = createBottomTabNavigator();

// export default function App() {
//   const dimensions = useWindowDimensions();
//   const isLandscape = dimensions.width > dimensions.height;
//   console.log("Horizontally display!, ", isLandscape);

//   useEffect(() => {
//     try {
//       ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
//     } catch (error) {
//       console.log(error);   
//     }

//     return () => {
//       ScreenOrientation.unlockAsync();
//     };
//   },[]);

//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         // tabBar={(props) => <TabBar {...props} />}
//         screenOptions={{
//           tabBarStyle: [
//             styles.tabBar,
//             {
//               flexDirection: "column",
//               width: 150,
//               height: '100%', // set tabBar height to occupy whole screen
//             },
//           ],
//           tabBarItemStyle: {
//             flex: 1,
//             justifyContent: "center",
//             alignItems: "center",
//           },
//           tabBarItemLabelStyle: {
//             fontSize: 16,
//           },
//         }}
//       >
//         <Tab.Screen
//           name="Tables"
//           component={TablesScreen}
//           options={{
//             tabBarLabel: 'Tables',
//           }}
//         />
//         <Tab.Screen
//           name="Menu"
//           component={MenuScreen}
//           options={{
//             tabBarLabel: 'Menu',
//           }}
//         />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

// const styles = StyleSheet.create({
//   tabBar: {
//     backgroundColor: '#333',
//     position: 'absolute', // set tabBar position to absolute
//     top: 0, // align tabBar to top of the screen
//     left: 0, // align tabBar to left of the screen
//   },
// });

