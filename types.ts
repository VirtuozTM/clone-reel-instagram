export type ListItem = {
  id: string;
  icon: React.ReactNode;
  color?: string;
  title: string;
  subtitle?: string;
  withSeparator?: boolean;
};

export type Comment = {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  text: string;
  timestamp: string;
  likesCount: number;
};

export type Friend = {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
};
