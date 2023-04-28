import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TablesScreen from '../screens/Tables';
import AboutUsScreen from '../screens/AboutUs';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { selectCurrentOrder } from '../redux/slices/ordersSlice';
import { current } from '@reduxjs/toolkit';
import { THEME } from '../gloabls/constants';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const {colors} = THEME;
  const currentOrder = useSelector(selectCurrentOrder);
  return (
    <Tab.Navigator
      initialRouteName="Tables"
      activeColor={colors.bottomTab.active}
      inactiveColor={colors.bottomTab.inactive}
      screenOptions={({route}) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.bottomTab.active,                            //Text color of TarBarItem, Active
          tabBarInactiveTintColor:colors.bottomTab.inactive,                         //Text color of TarBarItem, Inactive
          tabBarLabelStyle: { 
            fontSize: 20 
          },
          tabBarStyle:{
            backgroundColor:colors.bottomTab.background
          },
          tabBarActiveBackgroundColor: colors.bottomTab.background,  //Background color of TarBarItem, selected one
          tabBarInactiveBackgroundColor: colors.bottomTab.inactivebackground,
          tabBarIcon:({focused, size, color}) => {
          let iconName;
          if( route.name === 'Tables') {
              iconName = 'home';
          } else {
              iconName = 'spa'
          }
          color = focused ? colors.bottomTab.active : colors.bottomTab.inactive;
          size = focused ? 28 : 24;
            return <FontAwesome5 name={iconName} size={size} color={color}/>;
          },
      })}
    >
      <Tab.Screen name="Tables" component={TablesScreen} />
      <Tab.Screen name="AboutUs" component={AboutUsScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
