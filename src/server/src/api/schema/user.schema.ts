import {TypeOf, boolean, number, object,string} from 'zod'

export const createUserSchema = object({
	body:object({
		username:string({
			required_error:'Username is required'
		}),
		first_name:string({}).optional(),
		last_name:string({}).optional(),
		email:string({
			required_error:'Email is required'
		}).email('Not a valid email'),
		password:string({
			required_error:'Password is required'
		}).min(6,"Password to short - should required 6 chars minimun"),
		is_superuser:boolean({}).optional()
	}),
	params:object({
		id:number({required_error:'user id required'})
	})
})

export type CreateUserInput = TypeOf<typeof createUserSchema>


export const loginSchema = object({
	body:object({
		username:string({
			required_error:'Username required'
		}),
		password:string({
			required_error:"Password required"
		})
	})
})

export type LoginInput = TypeOf<typeof loginSchema>


export type RequestParamsDictionnay = {
	id:number
}


export const updateUserSchema = object({
	body:object({
		username:string().optional(),
		first_name:string({}).optional(),
		last_name:string({}).optional(),
		email:string().email('Not a valid email').optional(),
		is_superuser:boolean({}).optional()
	}),
	params:object({
		id:number({required_error:'user id required'})
	})
})

export type UpdateUserInput = TypeOf<typeof updateUserSchema>
