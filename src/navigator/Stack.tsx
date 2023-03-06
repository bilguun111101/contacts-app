import { createStackNavigator } from "@react-navigation/stack";
import { Bottom } from "./Bottom";

const Stack_ = createStackNavigator();

export const Stack = () => {
  return (
    <Stack_.Navigator>
        <Stack_.Screen name="Bottom_container" component={Bottom} options={{ headerShown: false }} />
    </Stack_.Navigator>
  )
}
