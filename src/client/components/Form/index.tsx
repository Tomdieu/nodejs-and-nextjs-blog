'use client'
import React, { useState } from "react";
import { Post } from "@/lib/types";
import ClassEditor from "@ckeditor/ckeditor5-build-classic"
import ckeditor from "@ckeditor/ckeditor5-react" 
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { Grid ,TextField} from "@mui/material";

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

type Props = {
  title: string;
  post?: Post;
};

const PostForm = (props: Props) => {
  const { title, post } = props;
  const [formState, setFormState] = useState<Post>({
    title: post?.title || "",
    content: post?.content || "",
    published: post?.published || false,
  });
  return <Grid container className={'flex flex-col max-w-[800px] space-y-2 p-5'}>
    <Grid item className='flex items-center justify-between'>
      <p>{title} Post</p>
      <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
    </Grid>
    <Grid item>
      <TextField placeholder={'Title'} fullWidth/>
    </Grid>
    <Grid item>
      <TextField placeholder={'Content'} fullWidth/>
      <CkEditor
        editor={ClassEditor}
        onInit={editor=>{

        }}
        onChange={(e)=>{
          
        }}
      />
    </Grid>
  </Grid>;
};

export default PostForm;
