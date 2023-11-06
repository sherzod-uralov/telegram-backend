import { maxHeaderSize } from 'http';
import multer from 'multer'
import {join,  extname} from 'path'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(process.cwd() + '/uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + file.originalname 
    cb(null, uniqueName);
  }
});


export const upload =  multer({ storage});



