import { View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Button, Input } from '@rneui/base';
import { ChatBubbleLeftRightIcon } from 'react-native-heroicons/solid';
import { db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import colours from '../config/colours';
import useAuth from '../hooks/useAuth';

const AddChatScreen = () => {
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // State Variables
  const [input, setInput] = useState<string>("");
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Custom Hook: useAuth()
  const { userPhoto } = useAuth();
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Navigation Prop
  const navigation = useNavigation();
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Custom Header
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add a new chat',
      headerBackTitle: "Chats", //iOS only
    })
  }, [navigation])
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Custom Function: createChat()
  // - Creates a new chat to add to Firestore
  // Reference: https://firebase.google.com/docs/firestore/manage-data/add-data
  const createChat = async () => {
    await addDoc(collection(db, 'chats'), {
      chatName: input,
      timestamp: serverTimestamp(),
      chatPhotoURL: userPhoto,
    })
    .then(() => {
      navigation.goBack()
    }).catch((error) => alert(error));
  };
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  return (
    <View className='bg-primary-100 p-[30px] h-[100%]'>
      {/* Chat Name Input */}
      <Input
        placeholderTextColor={colours.primary[900]}
        placeholder='Enter a chat name'
        value={input}
        onChangeText={(text) => setInput(text)}
        leftIcon={
          <ChatBubbleLeftRightIcon color={colours.primary[950]} size={28} />
        }
      />
      {/* Create Chat Button */}
      <Button onPress={createChat} title='Create new Chat' color={colours.primary[900]}/>
    </View>
  )
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}

export default AddChatScreen