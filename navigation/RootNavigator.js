import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import NotFound from "../screens/NotFound";
import MainTabNavigator from "./MainTabNavigator";
import OrdersScreen from "../screens/Orders";
import { Button } from "react-native-elements";
import { isReturningDishContext } from "../context/appContext";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { useState } from "react";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    const [isReturningDish, setIsReturningDish] = useState(false);
    const isReturningDishContextValue = {isReturningDish,setIsReturningDish};
    return (
        <isReturningDishContext.Provider value={isReturningDishContextValue}>
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
                                // backgroundColor:"#7855be",
                                backgroundColor:"#f0f0f0"
                            },
                            headerTintColor: "#2089dc",
                            headerRight:() => {
                                <Button title="CheckOut" color="#0f0"/>
                            }
                        })}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </isReturningDishContext.Provider>
    );
}

export default RootNavigator;