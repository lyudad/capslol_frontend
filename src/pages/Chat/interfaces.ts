export interface IChatListProps {
  active?: string | boolean;
  image?: string;
  name?: string;
  animationDelay?: number;
  isOnline?: string | boolean;
  onChangeChat: (value: any) => void;
  user?: any;
  index: any;
}

export interface IAvatarProps {
  image: string;
  alt: string;
  isOnline?: string | boolean;
}

export interface IChatItemProps {
  animationDelay?: number;
  item?: any;
}

export interface IChatContent {
  currentChat: any;
}
