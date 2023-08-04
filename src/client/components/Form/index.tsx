import React from 'react'
import Post from "@/components/Form"

type Props = {
    title:string;
    post?:Post
}

const PostForm = (props: Props) => {
    const {title,post} = props
  return (
    <div>PostForm</div>
  )
}

export default PostForm