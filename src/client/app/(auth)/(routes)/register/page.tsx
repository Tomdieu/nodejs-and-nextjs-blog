'use client';

import {useState} from "react"
import { redirect } from 'next/navigation'
import { Box, Button,Grid, Paper, TextField } from "@mui/material";
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

const RegisterPage = () =>{
  const { toast } = useToast()
  const [state,setState] = useState({username:'',email:'',first_name:'',last_name:'',password:''})

const handleChange = (e) =>{
  setState({...state,[e.target.name]:e.target.value})
}

const handleSubmit = async (e) =>{
  e.preventDefault()
  try{
    const res = await fetch('/api/user',{
    method:'POST',
    body:JSON.stringify(state),
    headers:{
      'Content-Type':'application/json'
    }
  })
  const data = await res.json()
  console.log(data)
  if(data.error){
    console.error(data)
    toast({
          title: "Uh oh! Something went wrong.",
          description: data.error,
        })
  }else{
    // create a toast to tell the user his account has been created
    toast({
          title:'Success',
          description:'Account Created Successfully'
        })
    redirect('/login')
  }
  }catch(err){
    console.log(err.error)
    toast({
          title: "Uh oh! Something went wrong.",
          description: err.error,
        })
  }
  
}

	return (
		<Box className={cn("h-full flex flex-col w-full items-center justify-center p-3 bg-blue-500")}>
      <div className="flex-1 w-full h-full flex flex-col items-center justify-center">
        <h1 className={"mb-4 font-sans text-5xl text-white text-center"}>Register</h1>
          <Paper onSubmit={handleSubmit} method='POST' component={'form'} className={cn('flex flex-col gap-4 p-4 max-w-[500px] w-full')}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField label={'username'} name={'username'} required onChange={handleChange} value={state.username} fullWidth/>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label={'First name'} name="first_name" onChange={handleChange} value={state.first_name} fullWidth/>
              </Grid>
              <Grid item xs={12} md={6}>
            <TextField label={'Last name'} name="last_name" onChange={handleChange} value={state.last_name} fullWidth/>
                
              </Grid>
              <Grid item xs={12}>
            <TextField label={'email'} type={'email'} name="email" required onChange={handleChange} value={state.email} fullWidth/>
              </Grid>
              <Grid item xs={12}>
              <TextField label={'password'} type="password" name="password" required onChange={handleChange} value={state.password} fullWidth/>
                
              </Grid>
              <Grid item xs={12} className={cn("flex items-center justify-end")}>
              <Button variant="contained" type="submit" className={cn("bg-blue-500 font-sans")} size={'large'}>Register</Button>
                
              </Grid>
            </Grid>
            
            
            <p className="text-gray-600 text-center">Already have an account <Link className="no-underline text-blue-400" href={"/login/"}>Login</Link></p>
          </Paper>
 
      </div>
               <p className="text-gray-100">Copyright &copy; {new Date().getYear()+1900} Nv Blog</p>
   </Box>
	)
}


export default RegisterPage