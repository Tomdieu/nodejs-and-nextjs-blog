'use client';

import { Box, Paper,Button, TextField } from "@mui/material";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast"
import {useAuth} from "@/provider/AuthProvider"
import { cn } from "@/lib/utils/cn";
import {useState} from "react"

const LoginPage = () => {
  const { toast } = useToast()
  const {setToken,setUser} = useAuth()

  const [state,setState] = useState({username:'',password:''})


  const handleChange = (e) =>{
    setState({...state,[e.target.name]:e.target.value})
  }


  const handleSubmit = async (e) =>{
    e.preventDefault()
    try{
      const res = await fetch(`api/user/auth`,{
        method:'POST',
        body:JSON.stringify(state),
        headers:{
          'Content-Type':'application/json'
        }
      })

      const data = await res.json()
      if(data.error){
        console.error(data)
        toast({
          title: "Uh oh! Something went wrong.",
          description: data.error,
        })
      }else{
        console.log(data)
        delete data.user.password
        setToken(data.token)
        setUser(data.user)
        toast({
          title:'Success',
          description:'Login Successfully'
        })
      }
    }catch(err){
      toast({
          title: "Uh oh! Something went wrong.",
          description: err.message,
        })
      console.error(err)
    }
  }

  return (
   <Box className={cn("h-full flex flex-col w-full items-center justify-center p-3 bg-blue-500")}>
      <div className="flex-1 w-full h-full flex flex-col items-center justify-center">
        <h1 className={"mb-2 font-sans text-5xl text-white text-center"}>Login</h1>
          <Paper method={'post'} onSubmit={handleSubmit}  component={'form'} className={'flex flex-col gap-4 p-4 max-w-[500px] w-full'}>
            <TextField label={'username'} name={'username'} value={state.username} onChange={handleChange} required fullWidth/>
              <TextField label={'password'} type="password" name='password' value={state.password} onChange={handleChange} required fullWidth/>
              <Button variant="contained" type="submit" className="bg-blue-500 font-sans" size={'large'}>Login</Button>
            <p className="text-gray-600 text-center">Don&apos;t have an account <Link className="no-underline text-blue-400" href={"/register/"}>Register</Link></p>
          </Paper>
 
      </div>
      <p className="text-gray-100">Copyright &copy; {new Date().getYear()+1900} Nv Blog</p>
   </Box>
  );
};

export default LoginPage;
