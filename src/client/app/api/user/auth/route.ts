import {NextRequest,NextResponse} from "next/server"

export const runtime = "edge" //nodejs

export async function POST(req:NextRequest){
	const data = await req.json()
	try{
		
		const res = await fetch(`${process.env.BACKEND_API_URL}/user/login/`,{
			method:'POST',
			body:JSON.stringify(data),
			headers:{
				'Content-Type':'application/json'
			}
		})
		const userData = await res.json()
		console.log({userData})
		return NextResponse.json(userData,{status:201})
	}catch(err){
		console.log(err)
		return NextResponse.json({'error':'Something went wrong'},{status:401})
	}
}