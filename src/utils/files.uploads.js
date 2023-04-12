import multer from "multer";
import {v4 as uuidv4} from 'uuid';
import {AppError} from '../utils/response.error.js'
export const fileUpload = (fieldName , folderName) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `uploads/${folderName}`);
    },
    filename: (req, file, cb) => {
        console.log(file)
      cb(null,uuidv4()+"-"+file.originalname);
    }
  });
  function fileFilter(req , file , cb){
    if(file.mimetype.startsWith('image')){
      cb(null , true)
    }else{
      cb(new AppError('image Only' , 400) , false)
    }
  }
  const upload = multer({ storage , fileFilter});
  return upload.single(fieldName)
};

