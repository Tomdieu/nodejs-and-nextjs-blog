"use client"
import {useState,useEffect,createContext,useContext, SetStateAction, Dispatch} from "react"

interface AuthContextTypes{
	token:string;
	setToken: Dispatch<SetStateAction<string>>
	user: null;
	setUser: Dispatch<SetStateAction<null>>;
	logout: () => void;

}

const AuthContext = createContext<AuthContextTypes>()


AuthContext.displayName = "AuthContext"


export const useAuth = () => useContext(AuthContext)

type AuthProviderProps = {
	children:React.ReactNode
}

export default function AuthProvider({children}:AuthProviderProps){
	
	const [token,setToken] = useState('')
	const [user,setUser] = useState(null)

	const logout = () => {
		sessionStorage.clear()
	}

	useEffect(()=>{
		if(user){
			sessionStorage.setItem('user',JSON.stringify(user))
		}
		if(token){
			sessionStorage.setItem('token',token)
		}
	},[user,token])


	useEffect(()=>{
		const userData = sessionStorage.getItem('user')
		const userToken = sessionStorage.getItem('token')

		if(userData){
			setUser(JSON.parse(userData))
		}

		if(userToken){
			setToken(userToken)
		}

	},[])



	return (
		<AuthContext.Provider value={{token,setToken,user,setUser,logout}}>
			{children}
		</AuthContext.Provider>
	)
}