import { View, Text } from 'react-native';
import { Avatar } from '@rneui/base';
import React from 'react';
import { Message } from '../types/types';

interface SenderMessageProps {
  message: Message;
}

const SenderMessage = ({ message }: SenderMessageProps) => {
  return (
    <View className="flex-row justify-end">
      <View className="flex-shrink-1 bg-primary-800 rounded-lg rounded-tr-none px-4 py-2 my-2 mx-1">
        <Avatar
          containerStyle={{
            position: "absolute",
            bottom: 1,
            right: 1,
            margin: -5,
          }}
          rounded
          size={20}
          source={{uri: message.photoURL}}
        />
        <Text className='text-white'>{message?.message}</Text>
      </View>
    </View>
  )
}

export default SenderMessage