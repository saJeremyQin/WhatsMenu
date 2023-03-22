import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import MainTabNavigator from "./MainTabNavigator";
import NotFound from "../screens/NotFound";


const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen 
                    name="MainTab"
                    component={MainTabNavigator}
                />
                <Stack.Screen 
                    name="NotFound"
                    component={NotFound}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


export default RootNavigator;