
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";
import SplashScreen from "react-native-splash-screen";
import React, { useEffect } from "react";


export default function App() {


  useEffect(() => {
    SplashScreen.hide();
  }, []);


  return (

    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>

  );
}
