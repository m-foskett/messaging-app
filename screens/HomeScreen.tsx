import { View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import { collection, doc, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase';
import CustomListItem from '../components/CustomListItem';
import { Avatar } from '@rneui/base';
import { CameraIcon, PencilIcon, } from "react-native-heroicons/solid";
import { Chat } from '../types/types';
import colours from '../config/colours';

const HomeScreen = () => {
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // State Variables
    const [chats, setChats] = useState<Chat[]>([]);
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Custom Hook: useAuth()
    const { userPhoto, userUID, logout } = useAuth();
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Navigation Prop
    const navigation = useNavigation();
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // When the component renders, navigate to Create Profile Screen if user doesn't exist inside Firestore
    useLayoutEffect(() => onSnapshot(doc(db, 'users', userUID), snapshot => {
            if(!snapshot.exists()){
                navigation.navigate('CreateProfile');
            }
        }),
        []
    );
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Custom Header
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Messaging App",
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: colours.primary[500]},
            headerTitleStyle: { color: colours.primary[950]},
            headerTintColor: colours.black,
            headerLeft: () => (
                <View className='ml-1'>
                    <TouchableOpacity onPress={() => logout()}>
                        <Avatar rounded source={{uri: userPhoto}}/>
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View className='flex-row justify-around w-[80px] mr-[1px]'>
                    <TouchableOpacity >
                        <CameraIcon color={colours.primary[950]} size={28}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('AddChat')}>
                        <PencilIcon color={colours.primary[950]} size={28}/>
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation])
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Firestore Query: Get a list of all the chats
    useEffect(() => {
        let unsub;
        unsub = onSnapshot(
            query(collection(db, 'chats')),
            snapshot => {
                setChats(snapshot.docs.map(doc => ({
                    id: doc.id,
                    chatName: doc.get('chatName'),
                    timestamp: doc.get('timestamp'),
                    chatPhotoURL: doc.get('chatPhotoURL'),
                    } as Chat))
                );
            }
        );
        return unsub;
    }, [])
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Custom Function: enterChat()
    const enterChat = (id, chatName, chatPhotoURL) => {
        navigation.navigate("Chat", {
            id,
            chatName,
            chatPhotoURL
        })
    }
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    return (
        <SafeAreaView className='flex-1 bg-primary-100'>
            {/* List of Chats */}
            <ScrollView className='h-[100%] bg-primary-100'>
                {chats.map(({id, chatName, chatPhotoURL }) => (
                    <CustomListItem key={id} id={id} chatName={chatName} chatPhotoURL={chatPhotoURL} enterChat={enterChat}/>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
};

export default HomeScreen