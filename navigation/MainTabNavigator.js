import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TablesScreen from '../screens/Tables';
import MenuScreen from '../screens/Menu';
import AboutUsScreen from '../screens/AboutUs';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Tables" component={TablesScreen} />
      <Tab.Screen name="Menu" component={MenuScreen} />
      <Tab.Screen name="AboutUs" component={AboutUsScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
