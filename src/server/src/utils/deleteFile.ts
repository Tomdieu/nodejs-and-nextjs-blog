import fs from "fs"

export default (filePath:string)=>{
    fs.unlink(filePath,(err)=>{
        if(err){
            console.log('Error deleting the file : ',err)
        }else{
            console.log("File successfully deleted")
        }
    })
}