import bcrypt from 'bcrypt';
export default async function verifyPassword(password:string,hashedPassword:string){
    const result = await bcrypt.compare(password,hashedPassword)
    return result
}