import {NextResponse,NextRequest} from "next/server"

export const runtime = "edge" //nodejs

export async function POST(req:NextRequest){
	const data = await req.json()
	try{
		const res = await fetch(`${process.env.BACKEND_API_URL}/user`,{
			method:'POST',
			body:JSON.stringify(data),
			headers:{
				'Content-Type':'application/json'
			}
		})
		const createdUser = await res.json() 
		return NextResponse.json(createdUser,{status:201})
	}catch(err){
		console.log(err)
		return NextResponse.json(err,{status:500})

	}
	
}

export async function GET(req:NextRequest){
	
	return NextResponse.json({
		message:"hello world"
	})
}