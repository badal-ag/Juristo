
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
 
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
 
  );
}
