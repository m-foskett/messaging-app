// See the RN Navigation Docs for implementation details
// https://reactnavigation.org/docs/typescript/#specifying-default-types-for-usenavigation-link-ref-etc

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Home: undefined;
    CreateProfile: undefined;
    AddChat: undefined;
    Chat: {
        id: string;
        chatName: string;
        chatPhotoURL: string;
    };
    ChangeChatIcon: {
        id: string;
    }
    Login: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}