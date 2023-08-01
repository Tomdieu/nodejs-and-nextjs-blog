import multer from "multer";
import path from "path";
import config from "config";
import getFileDestination from './getFileDestination';


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const ROOT_DIR = config.get<string>("BASE_DIR")
  
    cb(null, ROOT_DIR+getFileDestination(file));
  },
  filename: (req, file, cb) => {
    const fileName = path.basename(
      file.originalname.replace(/\s/g,'_'),
      path.extname(file.originalname)
    );
    cb(null,fileName+path.extname(file.originalname));
  },

})

export default storage
