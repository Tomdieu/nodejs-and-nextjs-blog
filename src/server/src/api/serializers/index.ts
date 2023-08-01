import { Request } from "express";

interface File {
    id: number;
    url: string;
  }
  
  interface PostMedia {
    id: number;
    postId: number;
    fileId: number;
    fileType: string;
    file: File;
  }
  
  interface Post {
    id: number;
    content: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    postMedia: PostMedia[];
  }

function getHost(req:Request){
    return `${req.protocol}://${req.get('host')}`
}

export function FileSerializer(files:File[]|File,req:Request):File[]|File{
    const updateFileUrl = (file:File):File => ({
        ...file,
        url:file.url ? getHost(req)+file.url:""
    })
    if(Array.isArray(files)){
        return files.map((file)=>(updateFileUrl(file)))
    }else{
        return {...files}
    }
}

export function PostSerializer(posts:Post[]|Post,req:Request):Post[]|Post{
    const updateFileUrl = (file:File):File => ({
        ...file,
        url:file.url ? getHost(req)+file.url:""
    })


    const postMedia = (postMedia:PostMedia[]):PostMedia[] => {
        return postMedia.map((media)=>({...media,file:updateFileUrl(media.file)}))
    }

    if(Array.isArray(posts)){
        return posts.map((post)=>({...post,postMedia:postMedia(post.postMedia)}))
    }
    else{
        return {
            ...posts,
            postMedia:postMedia(posts.postMedia)
        }
    }

}