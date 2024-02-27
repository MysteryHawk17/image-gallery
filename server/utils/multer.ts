import { RequestHandler, Request, Response, NextFunction } from 'express';
import multer, { Multer } from 'multer';

const storage = multer.diskStorage({});

const uploadMiddleware = multer({
    storage: storage
}).single('image'); 

const uploadHandler: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    uploadMiddleware(req, res, (err: any) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: 'Multer error' });
        } else if (err) {
            return res.status(500).json({ message: 'Unknown error' });
        }
        next();
    });
};

export { uploadHandler };
