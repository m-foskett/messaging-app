import { View, ScrollView,} from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Input, Button, ThemeProvider, Text,  } from '@rneui/themed'
import { centralTheme } from '../themes/centralTheme'
import { useNavigation, useRoute } from '@react-navigation/native'
import { db } from '../firebase'
import { doc, updateDoc } from 'firebase/firestore'
import colours from '../config/colours'
import { RootStackScreenProps } from '../types/navigationTypes'

const ChangeChatIcon = ({ }) => {
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // State Variables
  const [imageURL, setImageURL] = useState<string>("");
  const incompleteForm: boolean = !imageURL;
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Navigation Prop
  const navigation = useNavigation();
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Route Params
  const { params: { id } } = useRoute<RootStackScreenProps<'ChangeChatIcon'>['route']>();
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Change Back Buttons Text: (Works on iOS, not Android)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Chat",
      title: 'Change Chat Icon',
    });
  }, [navigation])
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Firestore Action: Update Chat Icon
  const updateChatIcon = () => {
    updateDoc(doc(db, 'chats', id), {
        chatPhotoURL: imageURL,
    }).then(() => {
        navigation.goBack()
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
      <Text h3 className='font-bold text-xl mb-50 text-primary-950'>Choose a new Chat Icon</Text>
      {/* Chat Icon URL Input */}
      <View className='w-[300px] mt-10'>
        <Input
          placeholder='New Chat Icon URL'
          placeholderTextColor={colours.primary[900]}
          value={imageURL}
          onChangeText={(text) => setImageURL(text)}
        />
      </View>
      {/* Update Chat Icon Button */}
      <View className='w-[200px] mt-10 mb-32'>
        <ThemeProvider theme={centralTheme}>
          <Button
            raised
            onPress={updateChatIcon}
            title="Update Chat Icon"
            disabled={incompleteForm}
            color={colours.primary[900]}
          />
        </ThemeProvider>
      </View>
    </ScrollView>
  )
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}

export default ChangeChatIcon