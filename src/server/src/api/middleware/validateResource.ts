import {Request,Response,NextFunction} from "express"

import {AnyZodObject} from "zod"


const validateResource = (schema:AnyZodObject) => async (req:Request,res:Response,next:NextFunction) =>{
	try{
		await schema.parseAsync({
			body:req.body,
			query:req.query,
			params:req.params
		})
	}catch(err:any){
		return res.status(400).send(err.errors)
	}
}

export default validateResource

