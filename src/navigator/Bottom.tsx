import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/HomeScreen";

const Tab = createBottomTabNavigator();

export const Bottom = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen 
            name="Home"
            component={HomeScreen}
            options={{
                headerShown: false,
            }}
        />
    </Tab.Navigator>
  )
}
