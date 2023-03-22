import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TablesScreen from "../screens/Tables";
import MenuScreen from "../screens/Menu";
import AboutUsScreen from "../screens/AboutUs";

import { Dimensions } from 'react-native';

const MainTab = createBottomTabNavigator();

const MainTabNavigator = () => {

    const { width, height } = Dimensions.get('window');


    return (

        <MainTab.Navigator 
            initialRouteName="Tables"
            // tabBarPosition='left'
        >
            <MainTab.Screen
                name="Tables"
                component={TablesScreen}
            />
            <MainTab.Screen
                name="Menu"
                component={MenuScreen} 
            />
            <MainTab.Screen 
                name="AboutUs"
                component={AboutUsScreen}
            />
        </MainTab.Navigator>
    );
}

export default MainTabNavigator;