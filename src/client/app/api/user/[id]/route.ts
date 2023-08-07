import {NextRequest,NextResponse} from "next/server"

export const runtime = "edge" //nodejs


export async function GET(req:NextRequest){
	return NextResponse.json({'user':{username:'ivantom',id:1,first_name:'Ivan',last_name:'Tom'}})
}