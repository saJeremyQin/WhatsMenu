import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import NotFound from "../screens/NotFound";
import MainTabNavigator from "./MainTabNavigator";
import OrdersScreen from "../screens/Orders";
import { Button } from "react-native-elements";
import { ReturningDishContext } from "../context/appContext";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { useState } from "react";
import { THEME } from "../globals/constants";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    const {colors} = THEME;
    const [isReturningDish, setIsReturningDish] = useState(false);
    const isReturningDishContextValue = {isReturningDish,setIsReturningDish};
    return (
        <ReturningDishContext.Provider value={isReturningDishContextValue}>
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
              
                        options={({navigation,route}) => ({
                            headerShown:true,
                            title:"Orders",
                            headerStyle:{
                                backgroundColor: colors.darkBG
                            },
                            headerTintColor: colors.text,
                            headerRight:() => {
                                <Button title="CheckOut" color="#0f0"/>
                            }
                        })}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </ReturningDishContext.Provider>
    );
}

export default RootNavigator;