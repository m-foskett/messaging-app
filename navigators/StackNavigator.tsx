import React from 'react'
import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack'
import useAuth from '../hooks/useAuth';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import CreateProfileScreen from '../screens/CreateProfileScreen';
import AddChatScreen from '../screens/AddChatScreen';
import ChatScreen from '../screens/ChatScreen';
import colours from '../config/colours';
import ChangeChatIconScreen from '../screens/ChangeChatIconScreen';
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Initialise the Root Stack Navigator
const Stack = createNativeStackNavigator();
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Global Screen Options
const globalScreenOptions: NativeStackNavigationOptions = {
  headerStyle: { backgroundColor: colours.primary[500]},
  headerTitleStyle: { color: colours.primary[950]},
  headerTintColor: colours.primary[950],
  headerTitleAlign: 'center',
};
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   Create Stack Navigator Wrapper
const StackNavigator = () => {
  const { userName } = useAuth();
  return (
    <Stack.Navigator screenOptions={globalScreenOptions}>
        {userName ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="CreateProfile" component={CreateProfileScreen}/>
              <Stack.Screen name="AddChat" component={AddChatScreen}/>
              <Stack.Screen name="Chat" component={ChatScreen}/>
              <Stack.Screen name="ChangeChatIcon" component={ChangeChatIconScreen}/>
            </>
        ): (
            // Else default to LoginScreen
            <Stack.Screen name="Login" component={LoginScreen}/>
        )}
    </Stack.Navigator>
  );
};
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export default StackNavigator