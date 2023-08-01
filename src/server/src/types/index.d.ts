import {Request as _Request} from "express"
export interface Request extends _Request {
    user_id?:number;
}

export interface User {
  id: number;
  username: string;
  first_name?: string | null;
  last_name?: string | null;
  email: string;
  password: string;
  is_superuser: boolean;
  joined_on: Date;
  token?: Token | null;
  posts: Post[];
  likes: Like[];
  loginHistories: LoginHistory[];
}

export interface LoginHistory {
  id: number;
  userAgent?: string | null;
  browser?: string | null;
  os?: string | null;
  isMobile?: boolean | null;
  ipAddress: string;
  userId: number;
  user: User;
}

export interface Token {
  id: number;
  token: string;
  userId: number;
  user: User;
}

export interface Post {
  id: number;
  content: string;
  userId: number;
  user: User;
  postMedia: PostMedia[];
  likes: Like[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PostMedia {
  id: number;
  postId: number;
  post: Post;
  likes: Like[];
  fileId: number;
  fileType: string;
  file: File;
}

export interface File {
  id: number;
  url: string;
  postMedia: PostMedia[];
}

export interface Like {
  id: number;
  userId: number;
  user: User;
  postId?: number | null;
  post?: Post | null;
  mediaId?: number | null;
  media?: PostMedia | null;
}
