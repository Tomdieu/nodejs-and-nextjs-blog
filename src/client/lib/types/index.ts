export interface User {
    id: number;
    username: string;
    first_name?: string | null;
    last_name?: string | null;
    email: string;
    is_superuser: boolean;
    joined_on: Date;
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
  

export interface Post {
    title:string;
    content:string;
    published:boolean;
}

export interface UserPost {
    id: number;
  title:string;
  content: string;
  userId: number;
  published:boolean;
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
    fileId: number;
    fileType: string;
    file: File;
  }
  
  export interface File {
    id: number;
    url: string;
  }
  
  export interface Like {
    id: number;
    userId: number;
    user: User;
    postId?: number | null;
    post?: Post | null;
  }
  