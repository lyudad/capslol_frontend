export interface IChatListProps {
  active?: string | boolean;
  image: string;
  name: string;
  animationDelay?: number;
  isOnline?: string | boolean;
}

export interface IAvatarProps {
  image: string;
  alt: string;
  isOnline?: string | boolean;
}

export interface IChatItemProps {
  image: string;
  user: string;
  msg: string;
  animationDelay?: number;
}
