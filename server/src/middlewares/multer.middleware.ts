import multer from 'multer'
import { Request, Express } from 'express'

const storage = multer.memoryStorage(); // Store files in memory
  
const upload = multer({ storage: storage });

  export default upload;