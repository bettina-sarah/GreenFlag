/*
------------------------------------------------------------------------------------
====================================================================================
Filename    : interfaces.ts
Created By  : Vincent Fournier et Bettina-Sarah Janesch (REFACTORED: Vincent)
About       : Ce fichier contient des interfaces TypeScript définissant les types 
              pour divers composants et fonctionnalités d'une application React, 
              notamment pour la gestion des profils, des chatrooms, des messages, de
              l'authentification, des notifications, des menus, et des composants de
              cartes de profil.
====================================================================================
------------------------------------------------------------------------------------
*/


import { Control } from "react-hook-form";

export interface IPhotoData {
    path: string;
    key: string;
}

export interface IProfileData {
    suggestion_id: string;
    user_infos: {
        profile_info: ProfileProps;
        photo_keys: string[];
    };
}

export interface ProfileProps {
    basic_info: {
        first_name: string;
        age: number;
        city: string;
        location: number;
    };
    relationship: string;
    wants_kids: boolean;
    hobby_array: string[];
    bio: string | null;
}

export interface IProfileProps {
    swipeLeft: (arg1: string, arg2: boolean) => void;
    swipeRight: (arg1: string, arg2: boolean) => void;
    suggestion_id: string;
    profile_info: ProfileProps;
    photos: string[];
    isLastCard: boolean; // New prop to mark the last card
    onLastCardLeftScreen?: () => void; // Callback for end-of-list detection
}

export interface IProfileCardProps {
    suggestion_id?: string;
    profile_info: ProfileProps;
    photos: string[];
}

export interface SingleProfileData {
    profile_info: ProfileProps;
    photo_keys: string[];
}

export interface IProfileRoomData {
    name: string;
    subject: {
      id:number;
      firstname:string;
      profile_photo: any; // string | IPhotoData | null;
    };
    last_message: {
      sender_id: number;
      sender_first_name: string;
      content: string;
      date_sent: string;
    };
}

export interface IconProps {
    icon: string;
}

export interface IconButtonProps {
    icon: string;
    page?: string | null; // button can naviagate or execute custom function!
    onClick?: () => void;
    disabled?: boolean;
    toggleState?: boolean; // optional turn on off !
    suggestion_id?: string;
    className?: string;
}

export interface ImageInputProps {
    name: string;
    control: Control<any>;
}

export interface LastMessageProps {
    last_message: {
      sender_id: number;
      sender_first_name: string;
      content: string;
      date_sent: string;
    };
    subject_first_name: string;
}

export interface SuggestionData {
    suggestion_id: string;
    choice: string;
}

export interface IUseFetch {
    url: string;
    data: any;
}

export interface NotificationUpdateData {
    notification_id: string;
    user_id: string;
}

// CHATROOMS
export interface ChatroomProps {
    name: string;
    subject: {
        id: number;
        firstname: string;
        profile_photo: any;
    };
    last_message: {
        sender_id: number;
        sender_first_name: string;
        content: string;
        date_sent: string;
    };
}

// CHAT
export interface IMessage {
    sender_id: number;
    message_content: string;
}
      
export interface IOldMessage {
    sender_id:number; 
    sender_first_name:string;
    message_content:string;
    date_sent:string;
}

// AUTH

export interface AuthGuardProps {
    children: React.ReactNode;
}
  
export interface TokenData {
    valid: boolean;
    token?: string;
}

// PROFILE CARD COMPONENTS

export interface RelationshipProps {
    relationship: string;
    wants_kids: boolean;
}

export interface CarouselProps {
    images: string[] | null;
}

export interface HobbiesProps {
    hobbies: string[];
}

export interface BioProps {
    bio: string | null;
}

export interface BasicInfoProps {
    basic_info: {
      first_name: string;
      age: number;
      city: string;
    };
    suggestion_id?: string;
}

export interface LocationData {
    location: string;
}

// NOTIFICATION

export interface NotificationData {
    notification: string;
    chatroom: string;
}

export interface NotificationContextType {
    notifications: NotificationData | null;
    setNotifications: (notifications: NotificationData | null) => void;
}

export interface NotificationProviderProps {
    children: React.ReactNode;
}


// MENU

export interface NotificationDropDownProps {
    notifications: { chatroom: string; notification: string }[] | null;
}

export interface MenuProps {
    classname?: string;
}

// PrivateChat COMPONENTS
export interface MessageProps {
    content: string;
    sender_id: number;
}

export interface SubjectInfos{
    subject_id: number;
    subject_firstname: string;
    subject_avatar: string | null;
}

export interface FlagProps {
    subject_id: number | undefined;
    isOpen: boolean;
    onClose: () => void;
}