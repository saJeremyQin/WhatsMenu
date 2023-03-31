import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TablesScreen from '../screens/Tables';
import MenuScreen from '../screens/Menu';
import AboutUsScreen from '../screens/AboutUs';
import { FontAwesome5 } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Tables"
      activeColor='#f0f'
      inactiveColor='#555'
      barStyle={{
          backgroundColor:'#909'
      }}
      screenOptions={({route}) => ({
          headerShown: false,
          tabBarActiveTintColor:"#320952",          //Text color of TarBarItem, Active
          tabBarInactiveTintColor:"white",          //Text color of TarBarItem, Inactive
          tabBarLabelStyle: { 
            fontSize: 20 
          },
          tabBarStyle:{
            backgroundColor:"#7855be",              //Background color of TarBarItem
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
          color = focused ? '#f0f' : '#555';
          size = focused ? 28 : 24;
            return <FontAwesome5 name={iconName} size={size} color={color}/>;
          },
      })}
    >
      <Tab.Screen name="Tables" component={TablesScreen} />
      <Tab.Screen name="Menu" component={MenuScreen} />
      <Tab.Screen name="AboutUs" component={AboutUsScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
