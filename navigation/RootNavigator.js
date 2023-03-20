import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabNavigator from "./MainTabNavigator";
import NotFound from "../screens/NotFound";


const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="MainTab"
                component={MainTabNavigator}
            />
            <Stack.Screen 
                name="NotFound"
                component={NotFound}
            />
        </Stack.Navigator>
    );
}


export default RootNavigator;