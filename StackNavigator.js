import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LandingPage from "./screens/LandingPage";
import Login from "./screens/Logins/index";
import VerifyOTP from "./screens/Logins/VerifyOTP";
import DashBoard from "./screens/DashBoard";
import Notes from "./screens/Notes";
// import PdfViewer from "./screens/PdfViewer";
import Quiz from "./screens/Quiz";
import Summary from "./screens/Summary";
import Modal from "./screens/Modal";
import Profile from "./screens/Profile";
import EditProfile from "./screens/EditProfile";
import Loading from "./screens/Loading";
import Comingsoon from "./screens/Comingsoon";
import Chatbot from "./screens/Chatbot";
import { useLayoutEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PdfViewer from "./screens/PdfViewer";
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const [uid, setUid] = useState(null);
  useLayoutEffect(() => {
    const getUid = async () => {
      const uid = await AsyncStorage.getItem("uid");
      setUid(uid);
    };
    getUid();
  }, [uid]);
  return (
    <Stack.Navigator
      // initialRouteName="DashBoard"
      screenOptions={{
        headerShown: false,


      }
      }
    >
      {uid ? (
        <>
          <Stack.Group>

            <Stack.Screen name="DashBoard" component={DashBoard} />
            <Stack.Screen name="Chatbot" component={Chatbot} />
            <Stack.Screen name="Quiz" component={Quiz} />
            <Stack.Screen name="Notes" component={Notes} />
            <Stack.Screen name="Comingsoon" component={Comingsoon} />

            <Stack.Screen name="Modal" component={Modal} />

            <Stack.Screen name="Summary" component={Summary} />

            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="Profile" component={Profile} />

            <Stack.Screen name="PdfViewer" component={PdfViewer} />
            <Stack.Screen name="Landing" component={LandingPage} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="VerifyOTP" component={VerifyOTP} />

          </Stack.Group>


          <Stack.Group>
            <Stack.Screen name="Loading" component={Loading} />
          </Stack.Group>
        </>
      ) : (
        <>
          <Stack.Group>
            <Stack.Screen name="Landing" component={LandingPage} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
            <Stack.Screen name="DashBoard" component={DashBoard} />

            <Stack.Screen name="Comingsoon" component={Comingsoon} />

            <Stack.Screen name="Modal" component={Modal} />
            <Stack.Screen name="Quiz" component={Quiz} />
            <Stack.Screen name="Summary" component={Summary} />

            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Notes" component={Notes} />
            <Stack.Screen name="PdfViewer" component={PdfViewer} />
          </Stack.Group>
          <Stack.Group>
            <Stack.Screen name="Loading" component={Loading} />
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
