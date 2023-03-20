import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TablesScreen from "../screens/Tables";
import MenuScreen from "../screens/Menu";
import OrdersScreen from "../screens/Orders";

const MainTab = createBottomTabNavigator();

const MainTabNavigator = () => {
    return (
        <MainTab.Navigator initialRouteName="Tables">
            <MainTab.Screen
                name="Tables"
                component={TablesScreen}
            />
            <MainTab.Screen
                name="Menu"
                component={MenuScreen} 
            />
            <MainTab.Screen 
                name="Orders"
                component={OrdersScreen}
            />
        </MainTab.Navigator>
    );
}

export default MainTabNavigator;