import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import NotFound from "../screens/NotFound";
import MainTabView from "./MainTabView";
import OrdersScreen from "../screens/Orders";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen 
                    name="MainTab"
                    component={MainTabView}
                />
                <Stack.Screen 
                    name="NotFound"
                    component={NotFound}
                />
                <Stack.Screen
                    name="Orders"
                    component={OrdersScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


export default RootNavigator;