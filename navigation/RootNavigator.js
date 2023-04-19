import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import NotFound from "../screens/NotFound";
// import MainTabView from "./MainTabView";
import MainTabNavigator from "./MainTabNavigator";
import OrdersScreen from "../screens/Orders";
import { Button } from "react-native-elements";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                // screenOptions={{ headerShown: false }}
            >
                <Stack.Screen 
                    name="MainTab"
                    component={MainTabNavigator}
                    options={{headerShown: false}}
                />
                <Stack.Screen 
                    name="NotFound"
                    component={NotFound}
                />
                <Stack.Screen
                    name="Orders"
                    component={OrdersScreen}
                    // options={{
                    //     animation: "fade_from_bottom",
                    //     headerShown: true,
                    //     title: "",
                    //     headerStyle: {
                    //         backgroundColor: "#7855be",
                    //     },
                    //     headerTintColor: "#f31282",
                    //  }}
                    options={({navigation,route}) => ({
                        headerShown:true,
                        title:"Orders",
                        headerStyle:{
                            backgroundColor:"#7855be",
                        },
                        headerTintColor: "#2089dc",
                        headerRight:() => {
                            <Button title="CheckOut" color="#0f0"/>
                        }
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


export default RootNavigator;