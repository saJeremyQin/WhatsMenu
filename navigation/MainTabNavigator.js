import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TablesScreen from '../screens/Tables';
import MenuScreen from '../screens/Menu';
import AboutUsScreen from '../screens/AboutUs';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { selectCurrentOrder } from '../redux/slices/ordersSlice';
import { current } from '@reduxjs/toolkit';


const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const currentOrder = useSelector(selectCurrentOrder);
  console.log("currentOrder in main is", currentOrder);
  return (
    <Tab.Navigator
      initialRouteName="Tables"
      activeColor='#f0f'
      inactiveColor='#555'
      // barStyle={{
      //     backgroundColor:"#5e0acc"
      // }}
      screenOptions={({route}) => ({
          headerShown: false,
          tabBarActiveTintColor:"#320952",          //Text color of TarBarItem, Active
          tabBarInactiveTintColor:"white",          //Text color of TarBarItem, Inactive
          tabBarLabelStyle: { 
            fontSize: 20 
          },
          tabBarStyle:{
            // backgroundColor:"#7855be",              //Background color of TarBarItem
            backgroundColor:"#5e0acc"
          },
          tabBarActiveBackgroundColor:"#2596be",    //Background color of TarBarItem, selected one
          tabBarIcon:({focused, size, color}) => {
          let iconName;
          if( route.name === 'Tables') {
              iconName = 'home';
          } else if (route.name === 'Menu') { 
              iconName = 'bed';
          } else {
              iconName = 'spa'
          }
          color = focused ? "#f31282" : "#555";
          size = focused ? 28 : 24;
            return <FontAwesome5 name={iconName} size={size} color={color}/>;
          },
      })}
    >
      <Tab.Screen name="Tables" component={TablesScreen} />
      <Tab.Screen 
        name="Menu" 
        component={MenuScreen}
        disabled={!currentOrder}
      />
      <Tab.Screen name="AboutUs" component={AboutUsScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
