import { View, ScrollView,} from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Input, Button, ThemeProvider, Text,  } from '@rneui/themed'
import { centralTheme } from '../themes/centralTheme'
import { useNavigation } from '@react-navigation/native'
import { db } from '../firebase'
import useAuth from '../hooks/useAuth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import colours from '../config/colours'

const CreateProfileScreen = ({ }) => {
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // State Variables
  const [imageURL, setImageURL] = useState<string>("");
  const incompleteForm: boolean = !imageURL;
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Navigation Prop
  const navigation = useNavigation();
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Custom Auth Hook: useAuth()
  const { userName, userUID, } = useAuth();
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Change Back Buttons Text: (Works on iOS, not Android)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login",
      title: 'Create Profile',
    });
  }, [navigation])
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Firestore Action: Add New User
  const updateUserProfile = () => {
    setDoc(doc(db, 'users', userUID), {
        id: userUID,
        displayName: userName,
        photoURL: imageURL,
        timestamp: serverTimestamp()
    }).then(() => {
        navigation.navigate("Home")
    }).catch(error => {
        alert(error.message);
    });
  };
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  return (
    <ScrollView
      contentContainerStyle={{alignItems: "center", justifyContent: "center"}}
      className='flex-1 p-10 bg-primary-100'
    >
      <StatusBar style='light' />
      {/* Title */}
      <Text h3 className='font-bold text-xl mb-50 text-primary-950'>Create a Messaging App Account</Text>
      {/* Profile Photo Input */}
      <View className='w-[300px] mt-10'>
        <Input
          placeholder='Profile Picture URL'
          placeholderTextColor={colours.primary[900]}
          value={imageURL}
          onChangeText={(text) => setImageURL(text)}
        />
      </View>
      {/* Update Profile Button */}
      <View className='w-[200px] mt-10 mb-32'>
        <ThemeProvider theme={centralTheme}>
          <Button
            raised
            onPress={updateUserProfile}
            title="Update Profile"
            disabled={incompleteForm}
            color={colours.primary[900]}
          />
        </ThemeProvider>
      </View>
    </ScrollView>
  )
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}

export default CreateProfileScreen