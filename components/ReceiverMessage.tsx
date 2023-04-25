import { View, Text } from 'react-native';
import { Avatar } from "@rneui/base";
import React from 'react';
import { Message } from '../types/types';

interface ReceiverMessageProps {
  message: Message;
}

const ReceiverMessage = ({ message }: ReceiverMessageProps) => {
  return (
    <View className="flex-row justify-start">
      <View className="flex-shrink-1 relative bg-primary-400 rounded-lg rounded-tl-none px-4 py-2 my-2 mx-1">
        <Avatar
          containerStyle={{
            position: "absolute",
            bottom: 1,
            left: 1,
            margin: -5,
          }}
          rounded
          size={20}
          source={{uri: message.photoURL}}
        />
        <Text className='text-white'>{message?.message}</Text>
        <Text className='text-white ml-[10px] pr-[10px] font-medium'>{message?.displayName}</Text>
      </View>
    </View>
  )
}

export default ReceiverMessage