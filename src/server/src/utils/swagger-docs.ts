import expressJsDoc, { Options } from "express-jsdoc-swagger"
import {Express} from "express"

const options:Options = {
    info: {
        version:"1.0.0",
        title:"Blog",
        description:"This is my backend api blog application",
        contact:{
            name:"Tomdieu Ivan",
            url:"http://github.com/tomdieu",
            email:"ivan.tomdieu@gmail.com"
        }
    },
    security:{
        BearedAuth:{
            type:'http',
            scheme:'Beared',
        }
    },
    baseDir: __dirname,
    filesPattern: "../**/*.ts",
    swaggerUIPath:'/docs',
    exposeSwaggerUI:true,
    exposeApiDocs:false
}

export default function setupDocs(app:Express) {
    return expressJsDoc(app)(options)
}