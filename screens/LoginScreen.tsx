import { StatusBar } from 'expo-status-bar'
import { View, Image, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { Button, ThemeProvider } from '@rneui/themed';
import { centralTheme } from '../themes/centralTheme';
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import colours from '../config/colours';

const LoginScreen = () => {
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Navigation Prop
  const navigation = useNavigation();
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Custom Header
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Login',
      headerTitleAlign: 'center',
    })
  }, [navigation])
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Custom Auth Hook: useAuth()
  const { signInWithGoogle, } = useAuth();
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  return (
    <ScrollView contentContainerStyle={{alignItems: "center", justifyContent: "center"}} className='flex-1 p-10 bg-white'>
      <StatusBar style="light" />
      <View >
          <Image
            className='h-[200px] w-[200px] rounded-lg'
            source={{
              uri: "https://i.pinimg.com/originals/ae/ee/14/aeee14b858acee89c50b5bcd7fb85a61.jpg",
            }}
          />
      </View>
      <View className='w-[200px] mt-10 mb-32'>
        <ThemeProvider theme={centralTheme}>
          <Button title="Sign in with Google" onPress={signInWithGoogle} color={colours.primary[900]}/>
        </ThemeProvider>
      </View>
    </ScrollView>
  )
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}

export default LoginScreen