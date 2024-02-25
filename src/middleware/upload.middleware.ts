import multer from 'multer';
import { Request } from 'express'; 

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),  
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname), 
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
    if (file.mimetype.startsWith('application/pdf')) {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files allowed!'), false); 
    }
};

const upload = multer({ storage, fileFilter });

export default upload;
