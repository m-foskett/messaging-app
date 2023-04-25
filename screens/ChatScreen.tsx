import { View, Text, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, TextInput, Keyboard, TouchableWithoutFeedback, FlatList } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Avatar } from '@rneui/base';
import { ArrowLeftIcon, ArrowUpCircleIcon, PhoneIcon, VideoCameraIcon } from 'react-native-heroicons/solid';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import useAuth from '../hooks/useAuth';
import SenderMessage from '../components/SenderMessage';
import ReceiverMessage from '../components/ReceiverMessage';
import { RootStackScreenProps } from '../types/navigationTypes';
import { Message } from '../types/types';
import colours from '../config/colours';

const ChatScreen = () => {
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // State Variables
    const [input, setInput] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Route Params
    const { params: { id, chatName, chatPhotoURL } } = useRoute<RootStackScreenProps<'Chat'>['route']>();
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Navigation Prop
    const navigation = useNavigation();
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Custom Hook: useAuth()
    const { userName, userPhoto, userUID, } = useAuth();
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Custom Header
    useLayoutEffect(() => {
      navigation.setOptions({
        title: chatName,
        headerBackVisible: false,
        headerBackTitleVisible: false,
        headerTitleAlign: "left",
        headerTitle: () => (
            <View className='flex-row items-center'>
                <TouchableOpacity onPress={() => changeIcon( id, chatPhotoURL )}>
                    <Avatar rounded source={{uri: chatPhotoURL}}/>
                </TouchableOpacity>
                <Text className='text-primary-950 ml-[10px] text-xl font-medium'>{chatName}</Text>
            </View>
        ),
        headerLeft: () => (
            <TouchableOpacity onPress={navigation.goBack} className='ml-[5px] mr-[20px]'>
                <ArrowLeftIcon color={colours.primary[950]} size={24}/>
            </TouchableOpacity>
        ),
        headerRight: () => (
            <View className='flex-row items-center justify-around w-[70px]'>
                <TouchableOpacity>
                    <VideoCameraIcon color={colours.primary[950]} size={24}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <PhoneIcon color={colours.primary[950]} size={24}/>
                </TouchableOpacity>
            </View>
        ),
      })
    }, [navigation, messages])
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Firestore Query: Get Chat Message Data
    useEffect(() =>
        onSnapshot(
            query(
                collection(db, 'chats', id, 'messages'),
                orderBy('timestamp', 'desc')
            ),
            snapshot =>
                setMessages(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        timestamp: doc.get('timestamp'),
                        userId: doc.get('userId'),
                        displayName: doc.get('displayName'),
                        photoURL: doc.get('photoURL'),
                        message: doc.get('message'),
                    } as Message))
                )
        ),
        [db]
    );
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Custom Function: sendMessage()
    // - Sends user input as a message to Firestore
    const sendMessage = () => {
        addDoc(collection(db, 'chats',id, 'messages'), {
            timestamp: serverTimestamp(),
            userId: userUID,
            displayName: userName,
            photoURL: userPhoto,
            message: input,
        });
        // Reset the keyboard input to empty
        setInput("");
        Keyboard.dismiss();
    }
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Custom Function: enterChat()
    const changeIcon = (id, chatPhotoURL) => {
        navigation.navigate("ChangeChatIcon", {
            id
        })
    }
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    return (
        <SafeAreaView className='flex-1 bg-primary-100'>
            <KeyboardAvoidingView
                className='flex-1'
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={10}
            >
                {/* Keyboard Dismiss */}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {/* Chat */}
                    <FlatList
                        data={messages}
                        inverted={true}
                        className='pl-4 mb-[20px]'
                        keyExtractor={item => item.id}
                        renderItem={({item: message}) =>
                            message?.userId === userUID ? (
                                <SenderMessage key={message?.id} message={message} />
                            ) : (
                                <ReceiverMessage key={message.id} message={message} />
                            )
                        }
                    />
                </TouchableWithoutFeedback>
                {/* Typing Bar */}
                <View className='flex-row items-center w-[100%] px-[15px] pb-[15px]' >
                    <TextInput
                        className='h-[40px] flex-1 mr-[15px] border-transparent bg-primary-50 border-[1px] p-[10px] text-primary-900 rounded-[30px]'
                        placeholder='Send a message'
                        placeholderTextColor={colours.primary[900]}
                        value={input}
                        onChangeText={(text) => setInput(text)}
                        onSubmitEditing={sendMessage}
                    />
                    {/* Send Message Button */}
                    <TouchableOpacity onPress={sendMessage}>
                        <ArrowUpCircleIcon color={colours.primary[950]} size={34}/>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}

export default ChatScreen