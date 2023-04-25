import React, { useEffect, useState } from 'react'
import { Avatar, ListItem } from '@rneui/base'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import { Message } from '../types/types';
import colours from '../config/colours';

interface CustomListItemProps {
  id: string;
  chatName: string;
  chatPhotoURL: string;
  enterChat: (id: string, chatName: string, chatPhotoURL: string) => void;
}

const CustomListItem = ({ id, chatName, chatPhotoURL, enterChat }: CustomListItemProps) => {
  // State Variables ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const [messages, setMessages] = useState<Message[]>([]);
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Firestore Query: Get the Chat Messages
  useEffect(() =>
    onSnapshot(
      query(
          collection(db, 'chats', id, 'messages'),
          orderBy('timestamp', 'desc')
      ),
      snapshot => setMessages(
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
  [db]);
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  return (
    <ListItem onPress={() => enterChat(id, chatName, chatPhotoURL)} key={id} bottomDivider containerStyle={{backgroundColor: colours.primary[50]}}>
      {/* Chat Icon Photo */}
      <Avatar
        rounded
        source={{
            uri: chatPhotoURL,
        }}
      />
      {/* Chat Content */}
      <ListItem.Content>
        {/* Chat Title */}
        <ListItem.Title className='text-xl text-black'>
            {chatName}
        </ListItem.Title>
        {/* Latest Message Preview */}
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
            {messages[0]?.displayName}: {messages[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}

export default CustomListItem